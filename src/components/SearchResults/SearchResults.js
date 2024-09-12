import React from "react";
import Tracklist from "../Tracklist/Tracklist";

const SearchResults = (props) => {

    return (
        <div className="w-64">
            <h1 className="text-center text-4xl my-10">SearchResults</h1>
            <Tracklist 
                tracklistData={props.searchResult}
                addTrack={props.addTrack}
                tracksToBeAdded={props.tracksToBeAdded}
                tracksToBeRemoved={props.tracksToBeRemoved}
            />
        </div>
    );
};

export default SearchResults;