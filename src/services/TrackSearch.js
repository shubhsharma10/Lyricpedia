import axios from 'axios'

const API_MUSIXMATCH = '629bf02832ff5f4513c42b46453c2340';
const ENDPOINT = 'http://api.musixmatch.com/ws/1.1';

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

    searchTracks(word) {
        let params = {
            format: 'jsonp',
            callback: 't',
            q_lyrics: word,
            page_size:10,
            apikey: '629bf02832ff5f4513c42b46453c2340'
        };

        let esc = encodeURIComponent;
        let query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
        console.log(query);
        let url = 'http://api.musixmatch.com/ws/1.1/track.search?'+query;
        console.log(url);
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