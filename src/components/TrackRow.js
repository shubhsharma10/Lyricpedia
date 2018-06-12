import React from 'react';
import {Link} from 'react-router-dom';

class TrackRow extends React.Component {

    render() {
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
                    {this.props.track.album_name}
                </td>
            </tr>
        )
    }
}
export default TrackRow;