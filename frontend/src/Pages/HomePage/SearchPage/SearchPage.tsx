import React, { JSX, SyntheticEvent, useState } from 'react'
import { CompanySearch } from '../../company';
import { searchCompanies } from '../../api';
import Navbar from '../../Components/Navbar/Navbar';
import Search from '../../Components/Search/Search';
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import CardList from '../../Components/CardList/CardList';

interface Props {}

const SearchPage: React.FC<Props> = (props: Props): JSX.Element => {
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
      <div>
        <Search search={search} onSearchChange={onSearchChange} onSearchSubmit={onSearchSubmit}/>
        {serverError ?? <h1>Failed to connect with API</h1>}
        <ListPortfolio portfolioList={portfolioValues} onPortfolioDelete={onPortfolioDelete}/>
        <CardList companyData={searchResult} onPortfolioCreate={onPortfolioCreate} />
       </div>
    </>
  )
}

export default SearchPage