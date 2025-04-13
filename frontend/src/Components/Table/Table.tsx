import React from 'react'
import { testIncomeStatementData } from './TestData'

const data = testIncomeStatementData;

type Company = (typeof data)[0];

const configs = [
    {
        label: 'Year',
        render: (company: Company) => company.acceptedDate
    },
    {
        label: 'Cost of Revenue',
        render: (company: Company) => company.costOfRevenue
    }
]

type Props = {}

const Table = (props: Props) => {
  const renderRows = data.map((company) => {
    return (
        <tr key={company.cik}>
            {
                configs.map((val: any) => {
                    return (
                        <td className='p-4 whitespace-nowrap text-sm font-normal text-gray-900'>
                            {val.render(company)}
                        </td>
                    );
                })
            }
        </tr>
    );
  })

  const renderHeaders = configs.map((val: any) => {
    return (
        <th key={val.label} className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
            {val.label}
        </th>
    )
  })

  return (
    <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8'>
        <table>
            <thead className='min-w-full divide-y divide-gray-200 m-5'>
                {renderHeaders}
            </thead>
            <tbody>
                {renderRows}
            </tbody>
        </table>
    </div>
  )
}

export default Table