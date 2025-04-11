import { JSX, SyntheticEvent } from 'react'
import Card from '../Card/Card'
import { CompanySearch } from '../../company'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  companyData: CompanySearch[];
  onPortfolioCreate: (e: SyntheticEvent) => void;
}

const CardList : React.FC<Props> = (props: Props) : JSX.Element => {
  return (
    <div>
        {
            props.companyData &&  props.companyData.length ? 
            props.companyData.map((company) => (
              <Card id={company?.symbol} key={uuidv4()} company={company} onPortfolioCreate={props.onPortfolioCreate}/>
            ))
            : (
              <p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
                  No results!
              </p>
            )
        }

    </div>
  )
}

export default CardList