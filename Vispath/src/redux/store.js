// src/store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // 这里是你的根Reducer

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;