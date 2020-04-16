import React from "react";
import loader from "../common/loader.png";
import loaderSmall from "../common/loader-small.png";

type UnknownProps = {
  [key: string]: any;
};

export const LoaderSmall: React.FC<UnknownProps> = (props) => (
  <img src={loaderSmall} alt="Loading..." {...props} />
);
const Loader: React.FC<UnknownProps> = (props) => (
  <img src={loader} alt="Loading..." {...props} />
);

export default Loader;
