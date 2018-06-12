import React from 'react'
import {Redirect} from 'react-router-dom'
import PageFooter from '../components/PageFooter'


class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputWords: '',
            toResultPage: false
        };
        this.inputChanged = this.inputChanged.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
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
            <div className="container-custom">
                <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand">Lyricpedia</a>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                        <button className="btn btn-outline-primary mx-1">Login</button>
                        <button className="btn btn-outline-primary mx-1">Sign up</button>
                    </div>
                </nav>
                <div className="container vertical-center py-5">
                    <div className="col">
                        <div className="row">
                            <h1 className="LandingText float-left">Search songs by lyrics</h1>
                        </div>
                        <div className="row Search1">
                                <input onKeyUp={this.handleKeyUp}
                                       onChange={this.inputChanged}
                                       placeholder="Enter lyrics here.."
                                       value={this.state.inputWords}/>
                        </div>
                    </div>
                </div>
                <PageFooter/>
            </div>
        )
    }

}

export default SearchPage;
