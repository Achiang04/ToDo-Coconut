import {combineReducers} from 'redux';
import todoReducer from '../Reducers/todoReducer';

const rootReducer = combineReducers({
  todoReducer,
});

export default rootReducer;
