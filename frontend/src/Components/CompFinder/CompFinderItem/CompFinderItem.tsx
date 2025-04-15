import React, { JSX } from 'react'
import { Link } from 'react-router-dom';

interface Props {
  ticker: string;
}

const CompFinderItem: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <Link
      reloadDocument
      to={`/company/${props.ticker}/company-profile`}
      type='button'
      className='inline-flex items-center p-4 rounded-l-lg' 
    >
      {props.ticker}
    </Link>
  )
}

export default CompFinderItem