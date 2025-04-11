import React, { JSX, SyntheticEvent } from 'react'

interface Props {
    onPortfolioDelete: (e: SyntheticEvent) => void;
    portfolioValue: string;
}

const DeletePortfolio: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <form onSubmit={props.onPortfolioDelete}>
        <input readOnly={true} hidden={true} value={props.portfolioValue}/>
        <button type='submit'>X</button>
    </form>
  )
}

export default DeletePortfolio