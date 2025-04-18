import React, { JSX, useEffect, useState } from 'react'
import { getCompanyProfile } from '../../api';
import { CompanyProfile } from '../../company';
import Sidebar from '../../Components/Sidebar/Sidebar';
import CompanyDashboard from '../../Components/CompanyDashboard/CompanyDashboard';
import Tile from '../../Components/Tile/Tile';
import CompFinder from '../../Components/CompFinder/CompFinder';
import TenKFinder from '../../Components/TenkFinder/TenKFinder';
import { formatLargeMonetaryNumber } from '../../Helpers/NumberFormatting';
import { useParams } from 'react-router';

interface Props { }

const CompanyPage: React.FC<Props> = (props: Props): JSX.Element => {
  const { ticker } = useParams();
  const [company, setCompany] = useState<CompanyProfile>();
  const [warning, setWarning] = useState<string>('');

  useEffect(() => {
    const getProfileInit = async () => {
      const result = await getCompanyProfile(ticker!);
      if (typeof result === 'string') {
        setWarning(result);
      }
      else {
        setCompany(result?.data[0]);
      }
    }
    getProfileInit();
  }, [ticker])


  return (
    <>
      {warning ?? <h1 className='text text-red-500'>warning</h1>}
      <div>
        {
          company ?
            (
              <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
                <Sidebar />
                <CompanyDashboard ticker={ticker!}>
                  <Tile title='Company Name' subTitle={company.companyName}/>
                  <Tile title='Price' subTitle={`$${company.price.toString()}`}/>
                  <Tile title='Sector' subTitle={company.sector}/>
                  <Tile title='Market Cap' subTitle={formatLargeMonetaryNumber(company.mktCap).toString()}/>
                  <CompFinder ticker={company.symbol} />
                  <TenKFinder ticker={company.symbol} />
                  <p className='bg-white shadow rounded text-medium text-gray-900 p-3 mt-1 m-4'>
                    {company.description}
                  </p>
                </CompanyDashboard>
              </div>
            )
            : <h1>Company not found!</h1>
        }
      </div>
    </>

  )
}

export default CompanyPage