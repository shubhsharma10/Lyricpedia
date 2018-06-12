import React from 'react'

export default class PageFooter extends React.Component {
    render() {
        return(
            <nav className="navbar navbar-light bg-light fixed-bottom justify-content-end">
                <div className="navbar-text">
                    <h6><a className="mr-2" href="https://github.com/shubhsharma10/Lyricpedia/">
                            <i className="fa fa-github"/>
                        </a>
                        Developed by Shubham Sharma © 2018</h6>
                </div>
            </nav>
        );
    }
}