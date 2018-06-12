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
                        <small>{this.getTrackLength()}</small>
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