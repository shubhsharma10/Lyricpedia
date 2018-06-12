import React from 'react';

class TrackRow extends React.Component {

    render() {
        return (
            <tr>
                <td>
                    {this.props.track.track_name}
                </td>
                <td>
                    {this.props.track.artist_name}
                </td>
                <td>
                    {this.props.track.album_name}
                </td>
            </tr>
        )
    }
}
export default TrackRow;