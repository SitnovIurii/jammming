import React from "react";

function SearchBar(props){
    // When the search button is clicked, we need to:
    // 1) Ask Spotify API for results
    // 2) Render the results
    // Under the hood, this means:
    // 1)  

    return (
        <div>
            <form>
                <input />
                <button onClick={props.handleSearch}>Search</button>
            </form>
        </div>
    )
}

export default SearchBar;