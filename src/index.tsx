import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './app/index.scss';
import App from './app/App';
import "./localization/localization"

ReactDOM.render(
    <Suspense fallback={<div>Loading...</div>}>
        <App/>
    </Suspense>,
    document.getElementById('root')
);

