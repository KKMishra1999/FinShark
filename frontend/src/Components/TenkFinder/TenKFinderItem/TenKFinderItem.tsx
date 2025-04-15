import React, { JSX } from "react";
import { Link } from "react-router-dom";
import { CompanyTenK } from "../../../company";

interface Props {
  tenK: CompanyTenK;
};

const TenKFinderItem: React.FC<Props> = (props: Props): JSX.Element => {
  const fillingDate = new Date(props.tenK.fillingDate).getFullYear();
  return (
    <Link
      reloadDocument
      to={props.tenK.finalLink}
      type="button"
      className="inline-flex items-center mr-1 px-4 py-2 text-sm font-medium text-white bg-green-400 hover:opacity-50 rounded-b-lg"
    >
      10K - {props.tenK.symbol} - {fillingDate}
    </Link>
  );
};

export default TenKFinderItem;