import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppFinal from './App';
import reportWebVitals from './reportWebVitals';
// import { createStore } from 'redux'

// import rootReducer from './reducers'
import store from './redux/store';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AppFinal />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
/*
root.render(
  <React.StrictMode>
    <AppFinal />
  </React.StrictMode>
);
*/