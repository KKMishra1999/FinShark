import React, { JSX, useEffect, useState } from 'react'
import { CompanyCompData } from '../../company';
import { getCompData } from '../../api';
import CompFinderItem from './CompFinderItem/CompFinderItem';

interface Props {
    ticker: string;
}

const CompFinder: React.FC<Props> = (props: Props): JSX.Element => {
    const [companyData, setCompanyData] = useState<CompanyCompData>();

    useEffect(() => {
        const getComps = async() => {
            const value = await getCompData(props.ticker);
            if(typeof(value) === 'string'){ /* empty */ }
            else if(Array.isArray(value.data)){
                setCompanyData(value?.data[0]);
            }
        }
        getComps();
    }, [props.ticker]);

  return (
    <div className='inline-flex rounded-md shadow-sm m-4'>
        {
            companyData?.peerList.map((ticker) => {
                return <CompFinderItem ticker={ticker} />
            })
        }
    </div>
  )
}

export default CompFinder