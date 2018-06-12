import React, {Component} from 'react'
import TrackSearch from '../services/TrackSearch';
import TrackRow from '../components/TrackRow';
import Waypoint from 'react-waypoint';
export default class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputWords: '',
            toResultPage: false,
            trackList: [],
            isLoading: false,
            pageCount: 1,
        };
        this.searchForTracks = this.searchForTracks.bind(this);
        this.inputChanged = this.inputChanged.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.enterWaypoint = this.enterWaypoint.bind(this);
        this.renderMatchingTracks = this.renderMatchingTracks.bind(this);

        this.trackSearchService = TrackSearch.instance;
    }

    componentDidMount(){
        if(this.props.location.inputWords !== undefined) {
            this.setState({
                inputWords: this.props.location.inputWords,
                trackList: [],
                pageCount: 1
            },function () {
                if(this.state.inputWords !== '')
                {
                    this.searchForTracks(this.state.inputWords);
                }
            });
        }
    }

    inputChanged(event) {
        this.setState({
            inputWords:event.target.value,
            trackList: [],
            pageCount: 1
        });
    }

    handleKeyUp(event){
        if (event.key === 'Enter' && this.state.inputWords !== '') {
            this.searchForTracks(this.state.inputWords);
        }
    }

    searchForTracks(word) {
        this.setState({isLoading:true});
        let currentPageCount = this.state.pageCount;
        this.trackSearchService
            .searchTracks(word,currentPageCount)
            .then((result)=>{
                let currentItems = this.state.trackList;
                let newItems = result.message.body.track_list;
                for(let i=0;i<newItems.length;i++)
                {
                    currentItems.push(newItems[i]);
                }
                this.setState({
                    trackList:currentItems},function () {
                    this.setState({
                        isLoading: false,
                        pageCount: this.state.pageCount + 1
                    });
                })
            });
    }

    renderMatchingTracks() {
        return ( this.state.trackList.map((track) => {
            return <TrackRow track={track.track} key={track.track.commontrack_id} />
        }));
    }

    enterWaypoint({ previousPosition }){
        if(!this.state.isLoading
            && this.state.pageCount < 10
            && this.state.inputWords !== ''
            && previousPosition === Waypoint.below) {
            this.searchForTracks(this.state.inputWords);
        }
    }

    render() {
        return (
            <div className="container-custom">
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand">Lyricpedia</a>
                        </div>
                        <div className="Search">
                            <input onKeyUp={this.handleKeyUp}
                                   onChange={this.inputChanged}
                                   type="search"
                                   className="py-2 mr-2"
                                   placeholder="Search for songs..."
                                   value={this.state.inputWords}/>
                            <button className="btn btn-outline-primary mx-1">Login</button>
                            <button className="btn btn-outline-primary mx-1">Sign up</button>
                        </div>
                    </div>
                </nav>
                <div className="row justify-content-center">
                    <table className="custom-table">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Album</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderMatchingTracks()}
                        <Waypoint onEnter={this.enterWaypoint}/>
                        </tbody>
                    </table>
                </div>
                <nav className="navbar navbar-light bg-light fixed-bottom">
                    <div className="navbar-text pull-left">
                        <h8>Developed by Shubham Sharma © 2018</h8>
                    </div>
                </nav>
            </div>
        )
    }
}