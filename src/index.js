import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import '../node_modules/jquery'

import HomePage from "./containers/HomePage";

ReactDOM.render(
    <HomePage/>,
    document.getElementById('root')
);
