import { JSX, SyntheticEvent } from 'react';
import './Card.css'
import { CompanySearch } from '../../company';
import AddPortfolio from '../Portfolio/AddPortfolio/AddPortfolio';
import { Link } from 'react-router-dom';

interface Props {
    id: string;
    company: CompanySearch;
    onPortfolioCreate: (e: SyntheticEvent) => void;
};

const Card : React.FC<Props> = (props: Props) : JSX.Element => {
  return (
    <div
      className="flex flex-col items-center justify-between w-full p-6 bg-slate-100 rounded-lg md:flex-row"
      key={props.id}
      id={props.id}
    >
        <Link to={`/company/${props.company.symbol}/company-profile`} className="font-bold text-center text-black md:text-left">
          {props.company.name} ({props.company.symbol})
        </Link>
        <p className="text-black">{props.company.currency}</p>
        <p className="font-bold text-black">
          {props.company.exchangeFullName} - {props.company.exchange}
        </p>
        <AddPortfolio
          onPortfolioCreate={props.onPortfolioCreate}
          symbol={props.company.symbol}
        />
    </div>
  )
}

export default Card