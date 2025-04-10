import React, { JSX, useState } from 'react'

type Props = {}

const Search: React.FC<Props> = (props: Props) : JSX.Element => {
    const [search, setSearch] = useState<string>("");

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         setSearch(e.target.value);
    }    

    const handleSearchClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(e);
    }

  return (
    <div>
        <input value={search} 
               name="search" 
               type="text" 
               onChange={(e) => handleOnChange(e)} 
        />
        <button onClick={(e) => handleSearchClick(e)}>Search</button>
    </div>
  )
}

export default Search