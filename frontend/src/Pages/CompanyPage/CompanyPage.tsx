import React, { JSX, useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router'
import { getCompanyProfile } from '../../api';
import { CompanyProfile } from '../../company';
import Sidebar from '../../Components/Sidebar/Sidebar';
import CompanyDashboard from '../../Components/CompanyDashboard/CompanyDashboard';
import Tile from '../../Components/Tile/Tile';

interface Props { }

const CompanyPage: React.FC<Props> = (props: Props): JSX.Element => {
  let { ticker } = useParams();
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
                <CompanyDashboard>
                  <Tile title='Company Name' subTitle={company.companyName}/>
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