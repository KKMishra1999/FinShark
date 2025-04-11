import React, { JSX, SyntheticEvent } from 'react'

interface Props {
    onPortfolioCreate: (e: SyntheticEvent) => void;
    symbol: string;
}

const AddPortfolio: React.FC<Props> = (props: Props): JSX.Element=> {
  return (
    <form onSubmit={props.onPortfolioCreate}>
        <input readOnly={true} hidden={true} value={props.symbol} />
        <button type='submit'>Add</button>
    </form>
  )
}

export default AddPortfolio