import React, {Component} from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import SearchPage from './SearchPage'
import SearchResult from './SearchResult'
import ArtistInfo from '../components/ArtistInfo'

export default class HomePage extends Component {
    render() {
        return(
            <Router>
                <div>
                    <Route
                        exact path="/" component={SearchPage}>
                    </Route>
                    <Route
                        exact path="/result" component={SearchResult}>
                    </Route>
                    <Route
                        exact path="/artist/:artistId" component={ArtistInfo}>
                    </Route>
                </div>
            </Router>
        )
    }
}