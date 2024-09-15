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

  //Playlist control
  const [ playlistTracks, setPlaylist ] = useState([]);
  //state which adds tracks everytime we adding tracks to selected(already exist) playlist
  const [ tracksToAdd, setTracksToAdd ] = useState([]);
  //state which adds tracks which we want to remove from selected playlist
  const [ tracksToRemove, setTracksToRemove ] = useState([]);
  //playlist ID used to decide do we work with existed playlist or not
  const [ playlistID, setPlaylistID ] = useState("");

  function handleSelectPlaylist(id){
    if(id) {
      setPlaylistID(id);
      Spotify.getPlaylist(id).then(setPlaylist);
    } else {
      setPlaylistID("")
      setPlaylist([])
    }
  }

  function addTrack(trackToAdd) {
    // add or remove, depending on the state
    // if we add a track with same key React causes a alert
    // to prevent a problems with removing a tracks from playlist
    // we add a filter on our existing playlist thus prevent 
    // addition same key tracks
    const filterOnExistingTrack = playlistTracks.filter(
      (existingTrack) => trackToAdd.id === existingTrack.id
    );
    if (filterOnExistingTrack.length === 0){
      setPlaylist((prev) => [...prev, trackToAdd])
      if(playlistID) {
        setTracksToAdd((prev) => [...prev, trackToAdd])
      }
    };
  } 

  function removeTrack(trackToRemove) {
    setPlaylist(playlistTracks.filter((track) => 
      trackToRemove.id !== track.id))
    if(playlistID) {
      setTracksToRemove((prev) => [...prev, trackToRemove])
    }
  }

  function handlePlaylistSave(playlistName) {
    Spotify.createNewPlaylist(playlistName, playlistTracks).then(Spotify.getUserPlaylists());
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
              playlist={playlistTracks}
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
