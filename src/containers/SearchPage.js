import React from 'react'
import TrackSearch from '../services/TrackSearch'
import {Redirect} from 'react-router-dom'


class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputWords: '',
            toResultPage: false
        };
        this.searchForTrack = this.searchForTrack.bind(this);
        this.inputChanged = this.inputChanged.bind(this);

        
        this.trackSearchService = TrackSearch.instance;
    }


    searchForTrack(){
        this.setState({toResultPage:true});
    }

    inputChanged(event) {
        this.setState({inputWords:event.target.value});
    }


    render() {
        if(this.state.toResultPage === true) {
            return <Redirect to={{
                pathname: '/result',
                inputWords: this.state.inputWords
            }}/>
        }
        return(
            <div className="container-fluid">
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
        )
    }

}

export default SearchPage;
