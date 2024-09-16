import './App.css';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import React, { useState, useEffect } from 'react';
import Spotify from '../../util/Spotify';
import Playlist from '../Playlist/Playlist';
import PlaylistList from '../PlaylistList/PlaylistList';


function App() {


  // useState for results, etc
  const [ searchResult, setSearchResult ] = useState([]);

  const handleSearch = (query) => {
    Spotify.search(query).then(setSearchResult);
  }

  // Playlist control to 
  const [ playlistShownInUI, setPlaylistShownInUI ] = useState([]);

  // State which adds tracks everytime we adding tracks to selected(already exist) playlist
  const [ tracksToAdd, setTracksToAdd ] = useState([]);

  // State which adds tracks which we want to remove from selected playlist
  const [ tracksToRemove, setTracksToRemove ] = useState([]);
  // Playlist ID used to decide do we work with existed playlist or not

  const [ playlistID, setPlaylistID ] = useState("");

  function handleSelectPlaylist(id){
    if(id) {
      setPlaylistID(id);
      Spotify.getPlaylist(id).then(setPlaylistShownInUI);
    } else {
      setPlaylistID("")
      setPlaylistShownInUI([])
    }
  }

  /*
    Add or remove, depending on the state.
    If we add a track with same key React causes a alert
    to prevent a problems with removing a tracks from playlist
    we add a filter on our existing playlist thus prevent 
    addition same key tracks
  */ 
  function addTrack(trackToAdd) {
    const isTrackAlreadyWithinUI = playlistShownInUI.some(
      (existingTrack) => trackToAdd.id === existingTrack.id
    ); // true or false

    if (isTrackAlreadyWithinUI) {
      // Track already exists in the playlist OR is going to be added; ignore
    } else {
      // Add track to the UI
      setPlaylistShownInUI((prev) => [...prev, trackToAdd]);
      // Add track to the hidden state that will be used by Spotify utils
      setTracksToAdd((prev) => [...prev, trackToAdd]);
    }
  } 

  function removeTrack(trackToRemove) {
    // This will be true for:
    // 1. All tracks in the new playlist
    // 2. To-be-added tracks in the existing playlist
    const isTrackAlreadyInTracksToAdd = tracksToAdd.some(
      (existingTrack) => trackToRemove.id === existingTrack.id
    ); 

    setPlaylistShownInUI(playlistShownInUI.filter((track) => 
      trackToRemove.id !== track.id))

    if (isTrackAlreadyInTracksToAdd) {
      // This is a new track that does NOT exist in the playlist yet
      // But is already present in the tracksToAdd

      setTracksToAdd(tracksToAdd.filter((track) => 
        trackToRemove.id !== track.id))
    } else {
      // This is a track that is already IN the playlist
      // 2. Add to tracksToRemove

      setTracksToRemove((prev) => [...prev, trackToRemove]);
    }
  }

  function handlePlaylistSave(playlistName) {
    Spotify.createNewPlaylist(playlistName, tracksToAdd);
  }
  
  function handleAddAndRemoveFetch() {
    Spotify.addOrRemoveTracksIntoSelectedPlaylist(playlistID, tracksToAdd, tracksToRemove);
    setTracksToAdd([]);
    setTracksToRemove([]);
  }

  return (
    <div className="h-full px-96 py-52 bg-cover bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500" style={{ height: "100%"}}>
      <div className="flex flex-col">
          <SearchBar
            handleSearch={handleSearch}
          />
        <div className="flex justify-around">
          <SearchResults 
            searchResult={searchResult}
            addTrack={addTrack}
          />
          <div className="flex flex-col items-center w-64">
            <PlaylistList
              onPlaylistSelect={handleSelectPlaylist}
            />
            <Playlist
              playlistID={playlistID}
              playlist={playlistShownInUI}
              onPlaylistSave={handlePlaylistSave} 
              removeTrack={removeTrack}
              handleAddAndRemove={handleAddAndRemoveFetch}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
