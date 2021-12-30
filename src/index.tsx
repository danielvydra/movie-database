import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './app/index.scss';
import App from './app/App';
import "./localization/localization"
import {persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";
import {createStore} from "redux";
import {Provider} from 'react-redux'
import allReducers from "./redux/reducers";

// @ts-ignore
const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// const persistor = persistStore(store)

ReactDOM.render(
    <Provider store={store}>
        {/*<PersistGate loading={null} persistor={persistor}>*/}
            <Suspense fallback={<div>Loading...</div>}>
                <App/>
            </Suspense>
        {/*</PersistGate>*/}
    </Provider>,
    document.getElementById('root')
);

