import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'remote-redux-devtools';
import rootReducers from './rootReducers';

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

export default store;
