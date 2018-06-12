let _singleton = Symbol();

class TrackSearch {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new TrackSearch(_singleton);
        return this[_singleton]
    }

    getArtist(artistId) {
        let params = {
            format: 'jsonp',
            callback: 't',
            artist_id: artistId,
            apikey: '629bf02832ff5f4513c42b46453c2340'
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

    searchAlbums(artistId) {
        let params = {
            format: 'jsonp',
            callback: 't',
            artist_id: artistId,
            page_size:10,
            page:1,
            s_release_date: 'desc',
            g_album_name: 1,
            apikey: '629bf02832ff5f4513c42b46453c2340'
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
            page_size:10,
            page:pageNumber,
            apikey: '629bf02832ff5f4513c42b46453c2340'
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

export default TrackSearch;