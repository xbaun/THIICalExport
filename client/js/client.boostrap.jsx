import React    from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware  } from 'redux';

import {App}        from './components/App.jsx';
import reducers     from './redux/reducers'

import io           from './connection/io';
import ioMiddleware from './redux/middleware/socketio';
import sfMiddleware from './redux/middleware/save-file';
//import { debugGlobStateMiddleware } from './redux/middleware/debug-state'

import * as authActions    from 'redux/actions/auth';
import * as genICalActions from 'redux/actions/generate-ical';

export const store 
    = createStore(reducers, applyMiddleware(ioMiddleware, sfMiddleware /*, debugGlobStateMiddleware*/));

io.on("auth", function (res) {
   
    switch (res.state) {
       case 'SUCCESS':
           
            store.dispatch(authActions.authSuccess());

            break;
        case 'FAILURE':
            
            store.dispatch(authActions.authFailure());
            
            break;
   }
});

io.on("generate-ical", function (res) {

    switch (res.state) {
        case 'STARTED':
            
            store.dispatch(genICalActions.genICalStarted());
            
            break;
        case 'SUCCESS':
           
            store.dispatch(genICalActions.genICalSuccess(res.data));
           
           break;
        case 'FAILURE':
           
            store.dispatch(genICalActions.genICalFailure({
                error: res.error,
                input: res.input
            }));
           
           break;
    }
});

window.addEventListener('load', function () {
 
    ReactDOM.render(
        
        <Provider store={store}>
            <App store={store} />
        </Provider>
        
        , document.querySelector("#app")
        
    );   

});