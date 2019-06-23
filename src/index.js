import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';


const store = configureStore();
const jsx = (
  <Provider store={store}>
  <App />
  </Provider>
);



ReactDOM.render(jsx, document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
