import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// We've organized all of our routes into a separate file.
import Router from './js/Router';

ReactDOM.render(Router, document.getElementById('root'));

registerServiceWorker();
