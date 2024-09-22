import React from "react";
import Track from "../Track/Track.js";

const Tracklist = (props) => {
    // All the tracks are passed from upstream through props.tracklistData
    return (
        <div className="overflow-scroll h-96 w-full flex flex-col items-center">
            {props.tracklistData.map((track) => (
                <Track
                    key={track.id}
                    track={track}
                    addTrack={props.addTrack}
                    isRemoval={props.isRemoval}
                    removeTrack={props.removeTrack}
                /> 
            ))}
            
        </div>
    )
}

export default Tracklist;