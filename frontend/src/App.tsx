import { SyntheticEvent, useState } from 'react';
import { searchCompanies } from './api';
import './App.css'
import CardList from './Components/CardList/CardList'
import Search from './Components/Search/Search'
import { CompanySearch } from './company';
import ListPortfolio from './Components/Portfolio/ListPortfolio/ListPortfolio';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Hero/Hero';

function App() {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
  const [serverError, setServerError] = useState<string>("");

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       setSearch(e.target.value);       
  }    

  const onSearchSubmit = async(e: SyntheticEvent) => {
     e.preventDefault();
     const result = await searchCompanies(search);
    
     if(typeof result === "string"){
        setServerError(result);
     }else if(Array.isArray(result.data)){
        setSearchResult(result.data);
     }     
  }

  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    const exists = portfolioValues.find((value) => value === e.target[0].value);
    if(exists) return;
    const updatedPortfolio = [...portfolioValues, e.target[0].value];
    setPortfolioValues(updatedPortfolio);
  }

  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    const removed = portfolioValues.filter((value) => value !== e.target[0].value);
    setPortfolioValues(removed);
  }

  return (
    <>
      <Navbar />
      {/* <Hero /> */}
      <div>
        <Search search={search} onSearchChange={onSearchChange} onSearchSubmit={onSearchSubmit}/>
        {serverError ?? <h1>Failed to connect with API</h1>}
        <ListPortfolio portfolioList={portfolioValues} onPortfolioDelete={onPortfolioDelete}/>
        <CardList companyData={searchResult} onPortfolioCreate={onPortfolioCreate} />
       </div>
    </>
  )
}

export default App
