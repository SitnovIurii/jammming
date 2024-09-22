//Authotization

const urlForAuthorization = "https://accounts.spotify.com/authorize";
const client_id = "1cea62a785744d299537437101200db9";
const redirect_uri = "https://jammmingprojectapp.netlify.app/";
let _accessToken; // For internal check inside getAccessToken()
const scope = "playlist-modify-public";
let _user_id = null;

const Spotify = {

  // 1. Unauth state, no accessToken, no URL object available
  // 2. First action on page, no accessToken, URL object available
  // 3. Authorized, accessToken available

  // Auth function
  getAccessToken() {
    // If the accessToken already exists, do not waste time checking for it again
    if (_accessToken) {
      return _accessToken;
    }
    let urlToParse = new URL(document.location.toString());
    let params = new URLSearchParams(urlToParse.hash.substring(1));
    _accessToken = params.get("access_token");
    let expirationTime = Number(params.get("expires_in"));
    if (_accessToken && expirationTime) {
      const refreshMessage = () => {
        if (window.confirm('Your token has expired, we will refresh a page.')) {
          window.location = redirect_uri
        }
      }
      window.setTimeout(() => refreshMessage(), expirationTime * 1000)
      return _accessToken;
    } else {
      window.location.href = `${urlForAuthorization}?client_id=${client_id}&response_type=token&scope=${scope}&redirect_uri=${redirect_uri}`;

    }
  },

  async search(query) {
    const accessToken = Spotify.getAccessToken();
    const searchEndpoint = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`
    return fetch(searchEndpoint, {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      }).then((response) => {
        return response.json()
      }).then((jsonResponse) => {
        if (!jsonResponse) {
          return [];
        }
        return jsonResponse.tracks.items.map((track) => ({
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          id: track.id
        })); 
      });
  },

  async getCurrentUserId(){
    const accessToken = Spotify.getAccessToken();
    if (_user_id) {
      const promise1 = Promise.resolve(_user_id)
      return promise1.then((value) => value)
    }
    return fetch(`https://api.spotify.com/v1/me`, {
      method: "GET",
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    }).then((response) => {
      return response.json()
    }).then((jsonResponseUserId) => {
      _user_id = jsonResponseUserId.id;
      return _user_id;
    });
  },

  async createNewPlaylist(playlistName, playlistTracks) {
    const accessToken = this.getAccessToken();
    const user_id = await this.getCurrentUserId();
    const playlistEndpoint = `https://api.spotify.com/v1/users/${user_id}/playlists`;
    fetch(playlistEndpoint, {
      method: "POST",
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: playlistName
      })
    }).then((response) => {
      return response.json();
    }).then((jsonResponsePlaylistSubmit) => {
      const trackURIs = playlistTracks.map((track) => "spotify:track:" + track.id)
      const playlist_id = jsonResponsePlaylistSubmit.id;
      const addItemsToPlaylistEndpoint = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`
      fetch(addItemsToPlaylistEndpoint, {
        method: "POST",
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          'uris': trackURIs
        })
      })
    });
  },

  async addOrRemoveTracksIntoSelectedPlaylist(playlistID, tracksToAdd, tracksToRemove) {
    const accessToken = this.getAccessToken();
    const addItemsToPlaylistEndpoint = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`
    if(tracksToAdd.length > 0) {
      const trackURIs = tracksToAdd.map((track) => "spotify:track:" + track.id)
      fetch(addItemsToPlaylistEndpoint, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          "uris": trackURIs
        })
      })
    }
    if(tracksToRemove.length > 0) {
      const trackURI = tracksToRemove.map((track) => ({"uri": `spotify:track:${track.id}`}))
      fetch(addItemsToPlaylistEndpoint, {
        method: "DELETE",
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'Content-type': 'application/json'
        },
        body: JSON.stringify(
          {
            "tracks": trackURI
          })
      })
    }
  },

  async getUserPlaylists() {
    const accessToken = await this.getAccessToken();
    const user_id = await this.getCurrentUserId();
    const getUserPlaylistEndpoint = `https://api.spotify.com/v1/users/${user_id}/playlists`
    return fetch(getUserPlaylistEndpoint, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    }).then((response) => {
      return response.json()
    }).then((jsonResponsePlaylistList) => {
      const playlistNameAndIdArray = [];
      for (let playlistResponseObject of jsonResponsePlaylistList.items) {
        playlistNameAndIdArray.push({name: playlistResponseObject.name, id: playlistResponseObject.id})
      }
      return playlistNameAndIdArray;
    })
  },

  async getPlaylist(id){
    const playlist_id = id;
    const accessToken = this.getAccessToken();
    const retrievePlaylistTracksEndpoint = `https://api.spotify.com/v1/playlists/${playlist_id}`
    return fetch(retrievePlaylistTracksEndpoint, {
      method: "GET",
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-type': 'application/json'
      }
    }).then((response) => {
      return response.json()
    }).then((jsonResponseRetrievedTracks) => {
      return jsonResponseRetrievedTracks.tracks.items.map((track) => ({
        name: track.track.name,
        artist: track.track.artists[0].name,
        album: track.track.album.name,
        id: track.track.id
      }))
    })
  }
}


export default Spotify;
