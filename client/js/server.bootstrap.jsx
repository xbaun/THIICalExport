const React          = require('react');
const ReactDOMServer = require('react-dom/server');

const template 
   = require('template/index.tmpl.js').default;


const createStore = require('redux').createStore;
const reducers    = require('redux/reducers').default;
const Provider    = require('react-redux').Provider;
const App         = require('components/App.jsx').default;


export function init(callback) {
    

    
   const store 
       = createStore(reducers);
      
   const appString = ReactDOMServer.renderToString(
      <Provider store={store}>
         <App store={store} />
      </Provider>
   );

   callback(template({
      body: appString,
   }));
   
}