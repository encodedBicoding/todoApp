import { createStore } from 'redux';
import thunk from 'redux-thunk';
import {applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import database from '../model/data';

const middlewares = [thunk];
const initialState = {
  activityReducer: {
    activities: database.get()
  }
};
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middlewares),
)

export default store;