import React, { useState, useEffect } from "react";
import "./SearchBar.css";

function SearchBar(props){

    // State of query for handling memorizing input
    const [ query, setQuery ] = useState(window.sessionStorage.getItem("query"));
    // Logic to connect recieving input value and store it and clearing
    // if its' null
    useEffect(() => {
        if (query !== null) {
            window.sessionStorage.setItem("query", query);
        } else {
            window.sessionStorage.clear();
        }
    }, [query])

    // Takes state and calling an App handler to fetch request
    const handleSearchWrapper = () => {
        props.handleSearch(query);
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter') {
            handleSearchWrapper();
        }
    }

    return (
        <>
            <form className="w-52 h-full flex flex-col items-center justify-items-center justify-around self-center">
                <h1 className="text-2xl font-bold text-slate-200 flex items-center justify-center">Search</h1>
                <input 
                    type="text"
                    className="block rounded-md border-0 py-0.5 px-4 text-gray-900 bg-gray-300 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:bg-gray-100 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    id="search"
                    placeholder="Enter song name here"
                    onChange={({target}) => setQuery(target.value)}
                    onKeyDown={handleKeyPress}
                    value={query}
                    required
                />
                <button type="button" onClick={handleSearchWrapper} className='bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-orange-500 border-primary border rounded-full items-center justify-center py-1 px-3 text-center text-base font-medium text-white hover:border-[#1B44C8] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 active:bg-[#1B44C8] active:border-[#1B44C8]'>Search</button>
            </form>
        </>
    )
}

export default SearchBar;