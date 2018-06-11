import React, {Component} from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import SearchPage from './SearchPage'
import SearchResult from './SearchResult'

export default class HomePage extends Component {
    render() {
        return(
            <Router>
                <div className="container-fluid">
                    <Route
                        exact path="/" component={SearchPage}>
                    </Route>
                    <Route
                        path="/result" component={SearchResult}>
                    </Route>
                </div>
            </Router>
        )
    }
}