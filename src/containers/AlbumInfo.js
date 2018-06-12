import React from 'react';
import TrackSearch from '../services/TrackSearch'
import PageHeader from '../components/PageHeader'
import PageFooter from '../components/PageFooter'
import {Redirect} from 'react-router-dom'
import TrackRow from '../components/TrackRow'

class AlbumInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tracks: [],
            artistId: 0,
            artistName: '',
            albumId: 0,
            albumName: '',
            trackCount: 0,
            trackReleaseYear: '',
            redirectToHome: false
        };

        this.goToHome = this.goToHome.bind(this);

        this.musicService = TrackSearch.instance;
    }

    componentDidMount(){
        this.setState({albumId:this.props.match.params.albumId});

        this.musicService
            .getAlbum(this.props.match.params.albumId)
            .then((result)=> {
                let album = result.message.body.album;
                this.setState({
                    artistName:album.artist_name,
                    artistId: album.artist_id,
                    albumName: album.album_name,
                    trackCount: album.album_track_count,
                    trackReleaseYear: album.album_release_date.split('-')[0],
                    albumCoverArt: album.album_coverart_100x100
                });
            });

        this.musicService
            .getAlbumTracks(this.props.match.params.albumId)
            .then((result)=>{
                this.setState({tracks: result.message.body.track_list})});
    }

    goToHome(){
        this.setState({redirectToHome:true});
    }

    renderAlbumTracks() {
        return (this.state.tracks.map((track) => {
            return <TrackRow track={track.track} key={track.track.track_id} isAlbumSource={true} />
        }));
    }

    render() {
        if(this.state.redirectToHome === true) {
            return <Redirect to={{
                pathname: '/'
            }}/>
        }
        return (
            <div className="container-custom">
                <PageHeader goToHome={this.goToHome}/>
                <div className="container-fluid py-5">
                    <div className="row py-5 px-5">
                        <div className="col-xs-6 col-md-4">
                            <div className="card" style={{width: '15rem'}}>
                                <img className="card-img-top" src={this.state.albumCoverArt} alt="album"/>
                                    <div className="card-body text-center">
                                        <h3>{this.state.albumName}</h3>
                                        <h6>by {this.state.artistName}</h6>
                                        <h6>{this.state.trackReleaseYear}&nbsp;&middot;&nbsp;{this.state.trackCount} Songs</h6>
                                    </div>
                            </div>
                        </div>
                        <div className="col-xs-6 col-md-8 my-5 ">
                            <div className="list-group list-group-flush">
                                {this.renderAlbumTracks()}
                            </div>
                        </div>
                    </div>
                </div>
                <PageFooter/>
            </div>
        )
    }
}
export default AlbumInfo;