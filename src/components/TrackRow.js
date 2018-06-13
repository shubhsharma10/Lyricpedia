import React from 'react';
import {Link} from 'react-router-dom';

class TrackRow extends React.Component {

    constructor(props) {
        super(props);
        this.getTrackLength = this.getTrackLength.bind(this);
    }

    getTrackLength() {
        let trackLen = this.props.track.track_length;
        trackLen = trackLen / 60;
        return trackLen.toFixed(2);
    }

    render() {
        if(this.props.isAlbumSource === true) {
            return(
                <a className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between flex-nowrap">
                        <div className="row mx-1">
                            <i className="fa fa-music fa-1x mx-1 py-1"/>
                            <h5 className="mb-1 mx-2">{this.props.track.track_name}</h5>
                        </div>
                        <div className="row mx-1">
                            <div className="dropdown mx-1">
                                <a id="dropdownMenu2"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false">
                                    <i className="fa fa-ellipsis-h fa-2x"/>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
                                    <button className="dropdown-item" type="button">Comment</button>
                                    <button className="dropdown-item" type="button">Add to playlist</button>
                                </div>
                            </div>
                            <small className="mx-1 py-1">{this.getTrackLength()}</small>
                        </div>
                    </div>
                </a>
            );
        }
        else {
            return (
                <tr>
                    <td>
                        {this.props.track.track_name}
                    </td>
                    <td>
                        <Link to={`/artist/${this.props.track.artist_id}`}>
                            {this.props.track.artist_name}
                        </Link>
                    </td>
                    <td>
                        <Link to={`/album/${this.props.track.album_id}`}>
                            {this.props.track.album_name}
                        </Link>
                    </td>
                </tr>
            )
        }
    }
}
export default TrackRow;