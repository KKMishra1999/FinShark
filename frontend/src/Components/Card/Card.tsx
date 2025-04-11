import { JSX } from 'react';
import './Card.css'
import { CompanySearch } from '../../company';

interface Props {
    id: string;
    company: CompanySearch;
};

const Card : React.FC<Props> = (props: Props) : JSX.Element => {
  return (
    <div className='card'>
        <img src="https://plus.unsplash.com/premium_photo-1681711647066-ef84575c0d95?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Company Logo" />
        <div className='details'>
            <h2>{props.company.name} ({props.company.symbol})</h2>
            <p>{props.company.currency}</p>
        </div>
        <p className='info'>
          {props.company.exchangeFullName} - {props.company.exchange}
        </p>
    </div>
  )
}

export default Card