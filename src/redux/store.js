import {createStore, applyMiddleware, combineReducers} from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import shakespeareReducer from '../reducers/shakespeareReducer'

const reducer = combineReducers({
  shakespeareReducer: shakespeareReducer
})

export default createStore(
  reducer,
  applyMiddleware(reduxPromiseMiddleware())
);
