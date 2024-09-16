import React, { Component } from "react";
import Spotify from '../../util/Spotify';

class PlaylistList extends Component {
    constructor(props){
        super(props);
        this.state = {
            playlistList: []
        }
    }

    async componentDidMount() {
        this.setState({ playlistList: await Spotify.getUserPlaylists() })
    }

    handleSelectPlaylistWrapper = (e) => { // Handling logic of selector component
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index];
        const option =  el.getAttribute('id');
        this.props.onPlaylistSelect(option); // Pushing choosed playlist tracks to App state
    }

    shouldComponentUpdate(nextProps, nextState) {
        // Rendering the component only if 
        // passed props value is changed
    
        if (nextProps.state !== this.state.playlistList.length) {
            console.log("I'm called")
            return true;
        } else {
            console.log("I'm called but nothing changed")
            return false;
        }
    }

    render() {
        const {playlistList} = this.state;
        return (
            <div className="mb-2">
                <section className="userPlaylists" onChange={this.handleSelectPlaylistWrapper}>
                    <select name="playlist-selector" id="playlist-selector" className="block w-52 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <option>New Playlist</option>
                        {playlistList.map((playlist) => (
                            <option key={playlist.id} id={playlist.id}>{playlist.name}</option>
                        ))}
                    </select>
                </section>
            </div>
        )
    }
}

export default PlaylistList;