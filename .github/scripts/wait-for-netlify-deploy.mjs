#!/usr/bin/env node
/* eslint-disable no-await-in-loop -- polling: each iteration must complete before the next sleep */
// Polls the Netlify API for the deploy matching $COMMIT_SHA on $NETLIFY_SITE_ID.
// First waits for a deploy to be created, then for it to reach a ready state.
// Optional $CONTEXT (e.g. "deploy-preview", "production") disambiguates when
// multiple deploys share a commit ref. Writes deploy_id and url to $GITHUB_OUTPUT.

import { appendFile } from "node:fs/promises";

const {
  NETLIFY_AUTH_TOKEN,
  NETLIFY_SITE_ID,
  COMMIT_SHA,
  CONTEXT,
  GITHUB_OUTPUT,
} = process.env;
if (!NETLIFY_AUTH_TOKEN || !NETLIFY_SITE_ID || !COMMIT_SHA) {
  console.error("missing NETLIFY_AUTH_TOKEN, NETLIFY_SITE_ID, or COMMIT_SHA");
  process.exit(1);
}

const auth = { Authorization: `Bearer ${NETLIFY_AUTH_TOKEN}` };
const READY = new Set(["ready", "current"]);
const FAILED = new Set(["error", "failed", "cancelled", "skipped"]);
const CREATE_TIMEOUT_MS = 5 * 60 * 1000;
const READY_TIMEOUT_MS = 15 * 60 * 1000;
const INTERVAL_MS = 15 * 1000;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJson(url) {
  const res = await fetch(url, { headers: auth });
  if (!res.ok) throw new Error(`${url} → ${res.status} ${res.statusText}`);
  return res.json();
}

console.log(
  `waiting for commit ${COMMIT_SHA}${CONTEXT ? ` (context: ${CONTEXT})` : ""} on site ${NETLIFY_SITE_ID}`,
);

let deploy;
const createDeadline = Date.now() + CREATE_TIMEOUT_MS;
while (Date.now() < createDeadline) {
  const deploys = await getJson(
    `https://api.netlify.com/api/v1/sites/${NETLIFY_SITE_ID}/deploys`,
  );
  deploy = deploys.find(
    (d) => d.commit_ref === COMMIT_SHA && (!CONTEXT || d.context === CONTEXT),
  );
  if (deploy) break;
  console.log(`deploy not created yet, retrying in ${INTERVAL_MS / 1000}s`);
  await sleep(INTERVAL_MS);
}
if (!deploy) {
  console.error(`timed out waiting for deploy of ${COMMIT_SHA} to be created`);
  process.exit(1);
}
console.log(`found deploy ${deploy.id}, waiting for it to be ready`);

const readyDeadline = Date.now() + READY_TIMEOUT_MS;
while (Date.now() < readyDeadline) {
  if (READY.has(deploy.state)) {
    const url = `https://${deploy.id}--${deploy.name}.netlify.app`;
    console.log(`deploy ready at ${url}`);
    if (GITHUB_OUTPUT) {
      await appendFile(GITHUB_OUTPUT, `deploy_id=${deploy.id}\nurl=${url}\n`);
    }
    process.exit(0);
  }
  if (FAILED.has(deploy.state)) {
    console.error(`deploy ${deploy.id} ended in state: ${deploy.state}`);
    process.exit(1);
  }
  console.log(
    `deploy state: ${deploy.state}, retrying in ${INTERVAL_MS / 1000}s`,
  );
  await sleep(INTERVAL_MS);
  deploy = await getJson(
    `https://api.netlify.com/api/v1/sites/${NETLIFY_SITE_ID}/deploys/${deploy.id}`,
  );
}
console.error(
  `timed out waiting for deploy ${deploy.id} to be ready (last state: ${deploy.state})`,
);
process.exit(1);
