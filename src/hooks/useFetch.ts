import { useEffect, useState } from "react";

const useFetch = <ResponseType>(url: string): [ResponseType, boolean, null] => {
  const [response, setResponse] = useState<ResponseType>({} as ResponseType);
  const [ready, setReady] = useState<boolean>(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const jsonRes = await fetch(url);
        const response = await jsonRes.json();
        setResponse(response);
        setReady(true);
      } catch (error) {
        setError(error);
      }
    })();
  }, [url]);

  return [response, ready, error];
};

export default useFetch;
