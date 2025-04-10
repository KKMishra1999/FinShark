import { JSX } from 'react'
import Card from '../Card/Card'

interface Props {}

const CardList : React.FC<Props> = (props: Props) : JSX.Element => {
  return (
    <div>
        <Card companyName='Apple' ticker='APPL' price={110}/>
        <Card companyName='Microsoft' price={200}/>
        <Card companyName='Google' ticker='GLE' price={250}/>
    </div>
  )
}

export default CardList