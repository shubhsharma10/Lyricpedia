import React from 'react'

export default class PageHeader extends React.Component {

    render() {
        return(
            <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href='' onClick={this.props.goToHome}>Lyricpedia</a>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                    <div className="Search">
                        <button className="btn btn-outline-primary mx-1">Login</button>
                        <button className="btn btn-outline-primary mx-1">Sign up</button>
                    </div>
                </div>
            </nav>
        );
    }
}