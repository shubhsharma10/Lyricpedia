import React from 'react';
import MusixMatchAPIService from '../services/MusixMatchAPIService'
import PageHeader from '../components/PageHeader'
import PageFooter from '../components/PageFooter'
import AlbumCard from "../components/AlbumCard";
import {Redirect} from 'react-router-dom'
import Waypoint from 'react-waypoint';

class ArtistInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            albums: [],
            artistId: 0,
            artistName: '',
            isLoading: false,
            pageCount: 1,
            redirectToHome: false
        };

        this.goToHome = this.goToHome.bind(this);
        this.enteredWaypoint = this.enteredWaypoint.bind(this);
        this.renderAlbumCards = this.renderAlbumCards.bind(this);

        this.musicService = MusixMatchAPIService.instance;
    }

    componentDidMount(){
        this.setState({artistId:this.props.match.params.artistId});

        this.musicService
            .getArtist(this.props.match.params.artistId)
            .then((result)=> {
                this.setState({artistName:result.message.body.artist.artist_name});
            });

        this.searchForAlbums(this.props.match.params.artistId);
    }

    searchForAlbums(artistId) {
        this.setState({isLoading:true});
        let currentPageCount = this.state.pageCount;
        this.musicService
            .searchAlbums(artistId,currentPageCount)
            .then((result)=>{
                let currentItems = this.state.albums;
                let newItems = result.message.body.album_list;
                for(let i=0;i<newItems.length;i++)
                {
                    let album = newItems[i].album;
                    let index = currentItems.findIndex(i => i.album.album_name === album.album_name);
                    if(index === -1)
                        currentItems.push(newItems[i]);
                }
                this.setState({
                    albums:currentItems},function () {
                    this.setState({
                        isLoading: false,
                        pageCount: this.state.pageCount + 1
                    });
                })
            });
    }

    enteredWaypoint() {
        if(!this.state.isLoading
            && this.state.artistId !== 0) {
            this.searchForAlbums(this.state.artistId);
        }
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
                    <div className="card-columns">
                        {this.renderAlbumCards()}
                        <Waypoint
                            onPositionChange={this.enteredWaypoint}
                        />
                    </div>
                </div>
                <PageFooter/>
            </div>
        )
    }
}
export default ArtistInfo;