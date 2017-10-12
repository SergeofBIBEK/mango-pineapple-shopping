import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Authentication from './components/Authentication.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Authentication />, document.getElementById('root'));

registerServiceWorker();
