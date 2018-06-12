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
        this.inputChanged = this.inputChanged.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);

        
        this.trackSearchService = TrackSearch.instance;
    }

    handleKeyUp(event){
        if (event.key === 'Enter' && this.state.inputWords !== '') {
            this.setState({toResultPage:true});
        }
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
            <div className="container vertical-center">
                <div className="col">
                    <div className="row">
                        <h1 className="LandingText float-left">Search songs by lyrics</h1>
                    </div>
                    <div className="row">
                        <div id="search" className="Search1">
                            <input onKeyUp={this.handleKeyUp}
                                   onChange={this.inputChanged}
                                   placeholder="Search for songs..."
                                   value={this.state.inputWords}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default SearchPage;
