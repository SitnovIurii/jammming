import React from "react";
import Tracklist from "../Tracklist/Tracklist";

const SearchResults = (props) => {

    return (
        <div className="w-64">
            <h1 className="text-center text-4xl h-32 py-10 align-middle">SearchResults</h1>
            <Tracklist 
                tracklistData={props.searchResult}
                addTrack={props.addTrack}
            />
        </div>
    );
};

export default SearchResults;