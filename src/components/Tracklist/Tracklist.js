import React, { useState } from "react";
import Track from "../Track/Track.js"

const Tracklist = (props) => {
    // All the tracks are passed from upstream through props.tracklistData
    return (
        <div>
            {props.tracklistData.map((track) => (
                <Track
                key={track.id}
                track={track}
                />
            ))}
        </div>
    )

}

export default Tracklist;
