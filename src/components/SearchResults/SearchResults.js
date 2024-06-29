import React from "react";
import Tracklist from "../Tracklist/Tracklist";

const SearchResults = (props) => {
    return (
        <div>
            <h2>SearchResults</h2>
            <Tracklist 
                tracklistData={props.searchResult}
            />
        </div>
    );
};

export default SearchResults;