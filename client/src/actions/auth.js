import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT,
} from '../utils/types';

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth/');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//  User Registration
export const register = (values) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(values);

  try {
    const res = await axios.post('/api/users/', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//  User Login
export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth/', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//  User Logout
export const logout = () => async (dispatch) => {
  dispatch({
    type: LOG_OUT,
  });
};
