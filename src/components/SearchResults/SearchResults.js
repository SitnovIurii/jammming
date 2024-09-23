import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import SearchBar from '../SearchBar/SearchBar';

const SearchResults = (props) => {

    return (
        <div className="w-[400px] flex flex-col items-center shrink-0 mr-6 border-transparent rounded-md bg-indigo-800 p-5">
            <div className="h-40">
                <SearchBar 
                    handleSearch={props.handleSearch}
                    />
            </div>
            <Tracklist 
                tracklistData={props.searchResult}
                addTrack={props.addTrack}
                />
        </div>
    );
};

export default SearchResults;