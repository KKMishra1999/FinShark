import axios from "axios"
import { CompanyIncomeStatement, CompanyKeyMetrics, CompanyProfile, CompanySearch } from "./company";

interface SearchResponse{
    data: CompanySearch[];
};

//In Vite project use import.meta.env to access the env variables
//In .env file declare env variables prefixing with VITE

export const searchCompanies = async(query: string) => {
    try {
        const data = await axios.get<SearchResponse>(
            `https://financialmodelingprep.com/stable/search-name?query=${query}&apikey=${import.meta.env.VITE_API_KEY}`
        );
        return data;
    } catch (error) {
       if(axios.isAxiosError(error)){
        console.log("Error message: ", error.message);
        return error.message;
       }
       else{
        console.log("Unexpected error: ", error);
        return "An unexpected error occured";
       }
    }
}

export const getCompanyProfile = async(query: string) => {
    try{
        const data = await axios.get<CompanyProfile[]>(
            `https://financialmodelingprep.com/api/v3/profile/${query}?apikey=${import.meta.env.VITE_API_KEY}`
        );
        return data;
    }catch (error) {
        if(axios.isAxiosError(error)){
         console.log("Error message: ", error.message);
         return error.message;
        }
        else{
         console.log("Unexpected error: ", error);
         return "An unexpected error occured";
        }
    }
}

export const getKeyMetrics = async(query: string) => {
    try{
        const data = await axios.get<CompanyKeyMetrics[]>(
            `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${query}?apikey=${import.meta.env.VITE_API_KEY}`
        );                
        return data;
    }catch (error) {
        if(axios.isAxiosError(error)){
         console.log("Error message: ", error.message);
         return error.message;
        }
        else{
         console.log("Unexpected error: ", error);
         return "An unexpected error occured";
        }
    }
}

export const getIncomeStatement = async(query: string) => {
    try{
        const data = await axios.get<CompanyIncomeStatement[]>(
            `https://financialmodelingprep.com/api/v3/income-statement/${query}?apikey=${import.meta.env.VITE_API_KEY}`
        );                
        return data;
    }catch (error) {
        if(axios.isAxiosError(error)){
         console.log("Error message: ", error.message);
         return error.message;
        }
        else{
         console.log("Unexpected error: ", error);
         return "An unexpected error occured";
        }
    }
}

