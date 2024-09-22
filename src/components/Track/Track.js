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
        if(props.isRemoval) {
            return (
                <button onClick={handleRemoveTrack} className="text-slate-200 text-center w-6 h-6 border rounded-full flex shrink-0 justify-center items-center self-center">
                    -
                </button>
            );
        }
        return (
            <button onClick={handleAddTrack} className="text-slate-200 text-center w-6 h-6 border rounded-full flex shrink-0 justify-center items-center self-center">
                +
            </button>
        );
    }

    return (
        <div className="flex w-[330px] px-3 py-2 shadow-2xl my-2 rounded-md justify-between bg-indigo-700">
            <div>
                <p className="text-xs text-slate-200">
                    {props.track.artist} | {props.track.album}
                </p>
                <h4 className="text-slate-200">{props.track.name}</h4>
            </div>
            {buttonRender()}
        </div>
    )
}

export default Track;