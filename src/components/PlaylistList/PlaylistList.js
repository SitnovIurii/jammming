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

    render() {
        const {playlistList} = this.state;
        return (
            <>
                <section onChange={this.handleSelectPlaylistWrapper}>
                    <select name="playlist-selector" id="playlist-selector" className="block w-52 rounded-md border-0 py-1 px-4 shadow-md bg-indigo-600 text-slate-200 ring-transparent">
                        <option>New Playlist</option>
                        {playlistList.map((playlist) => (
                            <option key={playlist.id} id={playlist.id}>{playlist.name}</option>
                        ))}
                    </select>
                </section>
            </>
        )
    }
}

export default PlaylistList;