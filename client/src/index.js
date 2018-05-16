import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import './public/global.css'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();