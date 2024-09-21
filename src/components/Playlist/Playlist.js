import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import PlaylistList from "../PlaylistList/PlaylistList";

function Playlist(props) {
    const playlistName = document.querySelector('#playlistName');

    let warningTimeout;
    const warningBox = document.createElement("div");

    function displayWarning(msg) {
        warningBox.innerText = msg;

        if (document.body.contains(warningBox)) {
            clearTimeout(warningTimeout);
        } else {
            // Insert warningBox after Playlist Name input
            playlistName.parentNode.insertBefore(warningBox, playlistName.nextSibling);
        }

        warningTimeout = setTimeout(() => {
            warningBox.parentNode.removeChild(warningBox);
            warningTimeout = -1;
        }, 3000);
    }


    // Takes name from input within component and pass it to App handler

    const handlePlaylistSaveWrapper = () => {
        if(!props.playlistID){
            if(playlistName.value.length > 0){
                props.onPlaylistSave(playlistName.value);
                warningBox.className = "text-sm text-center mb-2 rounded rounded-lg px-[10px] py-4 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.08)] opacity-1 bg-emerald-400 font-bold text-teal-700";
                displayWarning("Playlist is saved, reload to choose it from menu");
            } else {
                warningBox.className = "text-sm text-center mb-2 rounded rounded-lg px-[10px] py-4 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.08)] opacity-1 bg-rose-400 font-bold text-red-700";
                displayWarning("Enter a playlist name please");
            }
        } else {
            props.handleAddAndRemove()
            warningBox.className = "text-sm text-center mb-2 rounded rounded-lg px-[10px] py-4 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.08)] opacity-1 bg-emerald-400 font-bold text-teal-700";
            displayWarning("Playlist saved")
        }
    }

    return (
        <div id="Playlist" className="w-64 flex flex-col justify-center items-center">
            <div>
                <PlaylistList 
                    onPlaylistSelect={props.onPlaylistSelect}
                />
                <form onSubmit={handlePlaylistSaveWrapper} 
                    className="flex flex-col items-center w-52"
                    >
                    <input 
                        id="playlistName"
                        className={"w-full rounded-md border-0 py-0.5 pl-6 pr-6 mb-2 text-gray-900 bg-gray-300 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:bg-gray-100 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 " +(props.playlistID ? "hidden" : "block")}
                        type="text" 
                        placeholder="New Playlist"
                        >
                    </input>
                    <button type="submit" 
                        className={"bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-orange-500 border-primary border rounded-full items-center justify-center py-1 px-3 mb-4 text-center text-base font-medium text-white hover:border-[#1B44C8] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 active:bg-[#1B44C8] active:border-[#1B44C8]"}
                        >
                        Save
                    </button>
                </form>
            </div>
            <Tracklist 
                tracklistData={props.playlist} 
                isRemoval={true}
                removeTrack={props.removeTrack}
            />
        </div>
    )
}

export default Playlist;