import React, { JSX } from 'react'

interface Props {
    config: any;
    data: any;
}

const Table: React.FC<Props> = (props: Props): JSX.Element => {
  const renderRows = props.data.map((company: any) => {
    return (
        <tr key={company.cik} className='odd:bg-gray-200 even:bg-gray-400'>
            {
                props.config.map((val: any) => {
                    return (
                        <td className='p-3 whitespace-nowrap text-sm font-normal text-gray-900'>
                            {val.render(company)}
                        </td>
                    );
                })
            }
        </tr>
    );
  })

  const renderHeaders = props.config.map((val: any) => {
    return (
        <th key={val.label} className='p-4 text-left text-xs font-medium text-gray-500 bg-blue-200 uppercase tracking-wider'>
            {val.label}
        </th>
    )
  })

  return (
    <div className='bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8'>
        <table>
            <thead className='min-w-full divide-y divide-gray-400 m-5'>
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