import { combineReducers } from 'redux';
import auth from './auth';
import task from './task';
import alert from './alert';

export default combineReducers({
  auth,
  task,
  alert,
});
