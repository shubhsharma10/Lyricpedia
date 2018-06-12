import React from 'react';
import TrackSearch from '../services/TrackSearch'
import PageHeader from './PageHeader'
import PageFooter from './PageFooter'
import {Redirect} from 'react-router-dom'
import AlbumCard from "./AlbumCard";

class ArtistInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            albums: [],
            artistId: 0,
            artistName: '',
            redirectToHome: false
        };

        this.goToHome = this.goToHome.bind(this);
        this.renderAlbumCards = this.renderAlbumCards.bind(this);

        this.musicService = TrackSearch.instance;
    }

    componentDidMount(){
        this.setState({artistId:this.props.match.params.artistId});

        this.musicService
            .getArtist(this.props.match.params.artistId)
            .then((result)=> {
                this.setState({artistName:result.message.body.artist.artist_name});
            });

        this.musicService
            .searchAlbums(this.props.match.params.artistId)
            .then((result)=>{
                this.setState({albums: result.message.body.album_list})});
    }

    goToHome(){
        this.setState({redirectToHome:true});
    }

    renderAlbumCards() {
        return (this.state.albums.map((album) => {
            return <AlbumCard album={album.album} key={album.album.album_id} />
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
                    <div className="row justify-content-center">
                            <h1 className="LandingText">{this.state.artistName}</h1>
                    </div>
                </div>
                <div className="container-fluid py-5 px-5">
                    <div className="row justify-content-center">
                        <h2>Albums</h2>
                    </div>
                    <div className="row flex-row flex-wrap">
                        {this.renderAlbumCards()}
                    </div>
                </div>
                <PageFooter/>
            </div>
        )
    }
}
export default ArtistInfo;