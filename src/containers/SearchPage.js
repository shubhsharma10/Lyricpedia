import React from 'react'
import TrackSearch from '../services/TrackSearch'


export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputWords: ''
        };
        this.searchForTrack = this.searchForTrack.bind(this);
        this.inputChanged = this.inputChanged.bind(this);

        
        this.trackSearchService = TrackSearch.instance;
    }


    searchForTrack(){
        console.log('came here');
        this.trackSearchService
            .searchTracks('you do')
            .then((result)=>{
            console.log(result.message.body);
            })

    }

    inputChanged(event) {
        this.setState({inputWords:event.target.value});
    }


    render() {
        return(
            <div className="bg">
                <div className="container">
                    <div className="row vertical-center">
                        <div className="input-group mb-3 col">
                            <input type="text"
                                   value={this.state.inputWords}
                                   onChange={this.inputChanged}
                                   className="form-control"
                                   placeholder="Enter lyrics here"
                                   aria-label="Enter lyrics here"
                                   aria-describedby="basic-addon2"/>
                                <div className="input-group-append">
                                    <button className="btn btn-primary" onClick={this.searchForTrack}>Search</button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
