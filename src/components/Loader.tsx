import loader from "../common/loader.png";

type UnknownProps = {
  [key: string]: any;
};

export const Loader = (props: UnknownProps) => (
  <img src={loader} alt="Loading..." {...props} />
);
