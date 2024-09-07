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
    };
  } 

  function removeTrack(trackToRemove) {
    setPlaylist(playlistTracks.filter((track) => 
      trackToRemove.id !== track.id))
  }

  const [ playlistName, setPlaylistName ] = useState("");
  function handlePlaylistSave(playlistName) {
    Spotify.createNewPlaylist(playlistName, playlistTracks);
  }
  
  function handleSelectPlaylist(id){
    if(id) {
      Spotify.getPlaylist(id).then(setPlaylist);
    } else {
      setPlaylist([])
    }
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
              playlistNameOnSelect={setPlaylistName}
              onPlaylistSelect={handleSelectPlaylist}
            />
            <Playlist
              playlistName={playlistName}
              playlistNameInput={setPlaylistName}
              playlist={playlistTracks}
              onPlaylistSave={handlePlaylistSave} 
              removeTrack={removeTrack}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
