import React, { JSX, useEffect, useState } from "react";
import { CompanyTenK } from "../../company";
import { getTenK } from "../../api";
import TenKFinderItem from "./TenKFinderItem/TenKFinderItem";
import Spinner from "../Spinner/Spinner";
import { v4 as uuidv4 } from "uuid";

interface Props {
  ticker: string;
};

const TenKFinder: React.FC<Props> = (props: Props): JSX.Element => {
  const [companyData, setCompanyData] = useState<CompanyTenK[]>();
  useEffect(() => {
    const getTenKData = async () => {
      const value = await getTenK(props.ticker);
      if(typeof value === 'string'){}
      else{
        setCompanyData(value?.data);
      }
    };
    getTenKData();
  }, [props.ticker]);
  return (
    <div className="inline-flex rounded-md shadow-sm m-4" role="group">
      {companyData ? (
        companyData?.slice(0, 5).map((tenK) => {
          return <TenKFinderItem tenK={tenK} key={uuidv4()} />;
        })
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default TenKFinder;