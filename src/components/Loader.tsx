import React from "react";
import loader from "../common/loader.png";

type UnknownProps = {
  [key: string]: any;
};

export const Loader: React.FC<UnknownProps> = (props) => (
  <img src={loader} alt="Loading..." {...props} />
);
