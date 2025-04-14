import React, { JSX } from 'react'
import { Outlet } from 'react-router'

interface Props {
    children: React.ReactNode;
    ticker: string;
}

const CompanyDashboard: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div className="relative md:ml-64 bg-blue-100 w-full">
        <div className="relative pt-20 pb-32 bg-blue-100">
            <div className="px-4 md:px-6 mx-auto w-full">
                <div>
                    <div className="flex flex-wrap">
                        {props.children}
                    </div>
                    <div className="flex flex-wrap">
                        <Outlet context={props.ticker}/>
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}

export default CompanyDashboard