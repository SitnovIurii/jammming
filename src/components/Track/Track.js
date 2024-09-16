import React from "react";

function Track(props) {

    // Handling an addition and removing
    // props from App and Tracklist

    const handleAddTrack = () => {
        props.addTrack(props.track)
    }

    const handleRemoveTrack = () => {
        props.removeTrack(props.track)
    }

    // Button render logic, if user wants to add to or delete song from
    // playlist

    const buttonRender = () => {
        if (props.isRemoval){
            return (
                <button onClick={handleRemoveTrack}>
                    Remove
                </button>
            );
        }
        return (
            <button onClick={handleAddTrack}>
                Add
            </button>
        );
    }

    return (
        <div className="flex my-5 shadow-inner mb-2 justify-between">
            <div className="mr-2">
                <p className="text-xs">
                    {props.track.artist} | {props.track.album}
                </p>
                <h4>{props.track.name}</h4>
            </div>
            {buttonRender()}
        </div>
    )
}

export default Track;