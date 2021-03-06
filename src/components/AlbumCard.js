import React from 'react';
import {Link} from 'react-router-dom';

class AlbumCard extends React.Component {

    render() {
        return (
            <div className="card" style={{width: '15rem'}}>
                <img className="card-img-top" src={this.props.album.album_coverart_100x100} alt="test"/>
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link to={`/album/${this.props.album.album_id}`}>
                                {this.props.album.album_name}
                            </Link>
                        </h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                            {this.props.album.album_release_date}
                            <span className="badge badge-info float-right">
                                {this.props.album.album_track_count}
                            </span>
                        </h6>
                    </div>
            </div>
        )
    }
}
export default AlbumCard;