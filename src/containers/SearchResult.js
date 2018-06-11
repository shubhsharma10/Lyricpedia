import React, {Component} from 'react'

export default class SearchResult extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <table>
                    <thead>
                        <th>Title</th>
                        <th>Artist</th>
                    </thead>
                </table>
                
            </div>
        )
    }
}