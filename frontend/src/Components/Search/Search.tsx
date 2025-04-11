import React, { JSX } from 'react'

interface Props {
  search: string | undefined;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.SyntheticEvent) => void;
}

const Search: React.FC<Props> = (props: Props) : JSX.Element => {

  return (
    <>
        <form onSubmit={props.onSearchSubmit}>
          <input value={props.search} 
                name="search" 
                type="text" 
                onChange={(e) => props.onSearchChange(e)} 
          />
        </form>
    
    </>
  )
}

export default Search