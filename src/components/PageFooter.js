import React from 'react'

export default class PageFooter extends React.Component {
    render() {
        return(
            <nav className="navbar navbar-light bg-light fixed-bottom">
                <div className="navbar-text pull-left">
                    <h6>Developed by Shubham Sharma © 2018</h6>
                </div>
            </nav>
        );
    }
}