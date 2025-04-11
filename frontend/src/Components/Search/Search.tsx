import React, { JSX } from 'react'

interface Props {
  search: string | undefined;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchClick: (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Search: React.FC<Props> = (props: Props) : JSX.Element => {

  return (
    <div>
        <input value={props.search} 
               name="search" 
               type="text" 
               onChange={(e) => props.handleOnChange(e)} 
        />
        <button onClick={(e) => props.handleSearchClick(e)}>Search</button>
    </div>
  )
}

export default Search