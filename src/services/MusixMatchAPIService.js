import * as constants from '../constants/index'

let _singleton = Symbol();

class MusixMatchAPIService {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new MusixMatchAPIService(_singleton);
        return this[_singleton]
    }

    getAlbum(albumId) {
        let params = {
            format: 'jsonp',
            callback: 't',
            album_id: albumId,
            apikey: constants.API_KEY
        };

        let esc = encodeURIComponent;
        let query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
        let url = 'https://api.musixmatch.com/ws/1.1/album.get?'+query;
        return fetch(url)
            .then( (response) => response.text())
            .then((responseText) => {
                let match = responseText.slice(2);
                match = match.slice(0,-2);
                return JSON.parse(match);
            })
    }

    getAlbumTracks(albumId) {
        let params = {
            format: 'jsonp',
            callback: 't',
            album_id: albumId,
            page: 1,
            page_size: 50,
            apikey: constants.API_KEY
        };

        let esc = encodeURIComponent;
        let query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
        let url = 'https://api.musixmatch.com/ws/1.1/album.tracks.get?'+query;
        return fetch(url)
            .then( (response) => response.text())
            .then((responseText) => {
                let match = responseText.slice(2);
                match = match.slice(0,-2);
                return JSON.parse(match);
            })
    }


    getArtist(artistId) {
        let params = {
            format: 'jsonp',
            callback: 't',
            artist_id: artistId,
            apikey: constants.API_KEY
        };

        let esc = encodeURIComponent;
        let query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
        let url = 'https://api.musixmatch.com/ws/1.1/artist.get?'+query;
        return fetch(url)
            .then( (response) => response.text())
            .then((responseText) => {
                let match = responseText.slice(2);
                match = match.slice(0,-2);
                return JSON.parse(match);
            })
    }

    searchAlbums(artistId,pageCount) {
        let params = {
            format: 'jsonp',
            callback: 't',
            artist_id: artistId,
            page_size:6,
            page:pageCount,
            s_release_date: 'desc',
            g_album_name: 1,
            apikey: constants.API_KEY
        };

        let esc = encodeURIComponent;
        let query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
        let url = 'https://api.musixmatch.com/ws/1.1/artist.albums.get?'+query;
        return fetch(url)
            .then( (response) => response.text())
            .then((responseText) => {
                let match = responseText.slice(2);
                match = match.slice(0,-2);
                return JSON.parse(match);
            })
    }

    searchTracks(word,pageNumber) {
        let params = {
            format: 'jsonp',
            callback: 't',
            q_lyrics: word,
            page_size:20,
            page:pageNumber,
            apikey: constants.API_KEY
        };

        let esc = encodeURIComponent;
        let query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
        let url = 'https://api.musixmatch.com/ws/1.1/track.search?'+query;
        return fetch(url)
                .then( (response) => response.text())
            .then((responseText) => {
                let match = responseText.slice(2);
                match = match.slice(0,-2);
                return JSON.parse(match);
            })
    }
}

export default MusixMatchAPIService;