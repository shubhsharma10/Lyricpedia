import React, {Component} from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import SearchPage from './SearchPage'
import SearchResult from './SearchResult'
import ArtistInfo from './ArtistInfo'
import AlbumInfo from './AlbumInfo'

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
                    <Route
                        exact path="/album/:albumId" component={AlbumInfo}>
                    </Route>
                </div>
            </Router>
        )
    }
}