import { JSX } from 'react'
import Card from '../Card/Card'
import { CompanySearch } from '../../company'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  companyData: CompanySearch[];
}

const CardList : React.FC<Props> = (props: Props) : JSX.Element => {
  return (
    <div>
        {
            props.companyData &&  props.companyData.length ? 
            props.companyData.map((company) => (
              <Card id={company?.symbol} key={uuidv4()} company={company}/>
            ))
            : <h1>No data found!!</h1>
        }

    </div>
  )
}

export default CardList