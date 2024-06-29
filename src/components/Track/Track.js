import React, { useState } from "react";

function Track(props) {


    return (
        <div>
            <h3>{props.track.name}</h3>
            <h3>{props.track.artist}</h3>
            <h3>{props.track.album}</h3>
            <button>Add</button>
        </div>
    )
}

export default Track;