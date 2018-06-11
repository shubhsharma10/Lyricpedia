import React, {Component} from 'react'
import TrackSearch from '../services/TrackSearch';

export default class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputWords: '',
            toResultPage: false
        };
        this.searchForTracks = this.searchForTracks.bind(this);
        this.inputChanged = this.inputChanged.bind(this);

        this.trackSearchService = TrackSearch.instance;
    }

    componentDidMount(){
        this.setState({inputWords: this.props.location.inputWords});
    }

    inputChanged(event) {
        this.setState({inputWords:event.target.value});
    }

    searchForTracks() {
        console.log('came here');
        this.trackSearchService
            .searchTracks('you do')
            .then((result)=>{
            console.log(result.message.body);
            })
    }

    render() {
        return (
            <div className="container-custom container-fluid">
                <div className="row">
                    <div className="input-group my-3 col">
                        <input type="text"
                               value={this.state.inputWords}
                               onChange={this.inputChanged}
                               className="form-control"
                               placeholder="Enter lyrics here"
                               aria-label="Enter lyrics here"
                               aria-describedby="basic-addon2"/>
                        <div className="input-group-append">
                            <button className="btn btn-primary" onClick={this.searchForTracks}>Search</button>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                <div className="card-deck">
                    <div className="card bg-dark text-white">
                        <img className="card-img" src="..." alt="Card image"/>
                            <div className="card-img-overlay">
                                <h5 className="card-title">Card title</h5>
                            </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}