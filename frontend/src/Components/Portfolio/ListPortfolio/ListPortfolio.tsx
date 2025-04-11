import React, { JSX, SyntheticEvent } from 'react'
import CardPortfolio from '../CardPortfolio/CardPortfolio';

interface Props {
    portfolioList: string[];
    onPortfolioDelete: (e: SyntheticEvent) => void;
}

const ListPortfolio: React.FC<Props> = (props: Props): JSX.Element => {
  return (
   <>
        <h3>My Portfolio</h3>
        <ul>
            {
                props.portfolioList && 
                    props.portfolioList.map((item) => {
                        return <CardPortfolio portfolioValue={item} onPortfolioDelete={props.onPortfolioDelete}/>
                    })
            }
        </ul>
   </>
  )
}

export default ListPortfolio