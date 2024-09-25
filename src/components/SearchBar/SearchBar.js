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
            <div className="w-52 h-full flex flex-col items-center justify-items-center justify-around self-center">
                <h1 className="text-2xl font-bold text-slate-200 flex items-center justify-center">Search</h1>
                <input 
                    type="text"
                    className="block h-9 shadow-md bg-indigo-600 text-slate-200 rounded-md border-0 py-0.5 px-4 ring-transparent placeholder:text-slate-50/80 "
                    id="search"
                    placeholder="Enter song name here"
                    onChange={({target}) => setQuery(target.value)}
                    onKeyDown={handleKeyPress}
                    value={query}
                    required
                />
                <button type="button" onClick={handleSearchWrapper} className='bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-orange-500 rounded-full shadow-md items-center justify-center py-1 px-3 text-center text-base font-medium text-white hover:border-[#1B44C8] active:bg-[#1B44C8] active:border-[#1B44C8]'>Search</button>
            </div>
        </>
    )
}

export default SearchBar;