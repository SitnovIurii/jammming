import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import "./Playlist.css";

function Playlist(props) {

    //takes name from input within component and pass it to App handler

    const handlePlaylistSaveWrapper = () => {
        if(!props.playlistID){
            const playlistName = document.querySelector('#playlistName');
            props.onPlaylistSave(playlistName.value);
        } else {
            console.log(props.playlistID)
            props.handleAddAndRemove()
        }
    }

    return (
    <div id="Playlist" className="w-64 flex flex-col justify-center items-center">
        <form onSubmit={handlePlaylistSaveWrapper} className="flex flex-col items-center w-52">
            <input 
                id="playlistName"
                className="block w-full rounded-md border-0 py-0.5 pl-6 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="text" 
                placeholder="New Playlist"
                onChange={({target}) => props.playlistNameInput(target.value)}
                value={props.playlistName}
                required
            >
            </input>
            <button type="submit" className='bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-orange-500 border-primary border rounded-full items-center justify-center py-1 px-3 mb-4 text-center text-base font-medium text-white hover:border-[#1B44C8] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 active:bg-[#1B44C8] active:border-[#1B44C8]'>Save</button>
        </form>
        <Tracklist 
            tracklistData={props.playlist} 
            isRemoval={true}
            removeTrack={props.removeTrack}
        />
    </div>
    )
}

export default Playlist;