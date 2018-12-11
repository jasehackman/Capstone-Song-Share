
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/cyborg/materia.css'
// import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import './index.css';
import ReactManager from './components/ReactManager';



ReactDOM.render(
  <Router>
    <ReactManager />
  </Router>
, document.getElementById('root'));

