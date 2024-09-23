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
                warningBox.className = "flex justify-center items-center text-sm text-center rounded rounded-lg px-[2px] py-[2px] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.08)] opacity-1 bg-emerald-400 font-bold text-teal-700";
                displayWarning("Playlist saved, reload page to choose it from menu");
            } else {
                warningBox.className = "flex justify-center items-center text-sm text-center rounded rounded-lg px-[2px] py-3 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.08)] opacity-1 bg-rose-400 font-bold text-red-700";
                displayWarning("Enter a playlist name please");
            }
        } else {
            props.handleAddAndRemove()
            warningBox.className = "flex justify-center items-center text-sm text-center rounded rounded-lg px-[2px] py-3 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.08)] opacity-1 bg-emerald-400 font-bold text-teal-700";
            displayWarning("Playlist saved")
        }
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter') {
            handlePlaylistSaveWrapper();
        }
    }

    return (
        <div className="w-[400px] flex flex-col shrink-0 border-transparent rounded-md bg-indigo-800 p-5">
            <div className="h-40 flex flex-col items-center">
                <form 
                    className="flex flex-col items-center w-52 h-full justify-evenly content-evenly"
                    >
                    <h1 className="font-bold text-2xl w-100% text-slate-200">Your Playlist</h1>
                    <PlaylistList 
                        onPlaylistSelect={props.onPlaylistSelect}
                        />
                    <input 
                        id="playlistName"
                        className={"w-full rounded-md border-0 py-0.5 pl-6 pr-6 text-gray-900 bg-gray-300 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:bg-gray-100 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:opacity-85 sm:text-sm sm:leading-6 " +(props.playlistID ? "hidden" : "block opacity-60")}
                        type="text" 
                        placeholder="New Playlist"
                        onKeyDown={handleKeyPress}
                        >
                    </input>
                    <button type="button" 
                        onClick={handlePlaylistSaveWrapper}
                        className={"bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-orange-500 border-primary border rounded-full items-center justify-center py-1 px-3 text-center text-base font-medium text-white hover:border-[#1B44C8] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 active:bg-[#1B44C8] active:border-[#1B44C8]"}
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