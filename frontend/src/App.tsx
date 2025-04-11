import { useState } from 'react';
import { searchCompanies } from './api';
import './App.css'
import CardList from './Components/CardList/CardList'
import Search from './Components/Search/Search'
import { CompanySearch } from './company';

function App() {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       setSearch(e.target.value);       
  }    

  const handleSearchClick = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
     const result = await searchCompanies(search);
    
     if(typeof result === "string"){
        setServerError(result);
     }else if(Array.isArray(result.data)){
        setSearchResult(result.data);
     }     
  }


  return (
    <>
      <div>
        <Search search={search} handleOnChange={handleOnChange} handleSearchClick={handleSearchClick}/>
        <CardList companyData={searchResult}/>
       </div>
    </>
  )
}

export default App
