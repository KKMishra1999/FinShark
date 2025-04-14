import React, { JSX } from "react";
import "./Spinner.css";
import { ClipLoader } from "react-spinners";

type Props = {
  isLoading?: boolean;
};

const Spinner: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div id="loading-spinner">
      <ClipLoader
        color="#36d7b7"
        loading={props.isLoading}
        size={35}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;