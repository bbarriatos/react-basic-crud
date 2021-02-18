import axios from 'axios';
import { ADD_TASK, UPDATE_TASK, GET_TASKS, GET_TASK } from '../utils/types';
import { setAlert } from '../actions/alert';

export const getTask = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/task`);

    dispatch({
      type: GET_TASKS,
      payload: res.data,
    });
  } catch (err) {
    console.log(' get tasks: ', err);
  }
};

export const getTaskId = (taskId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/task/${taskId}`);

    dispatch({
      type: GET_TASK,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const addTask = (values) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(values);
  try {
    const res = await axios.post('/api/task', body, config);
    dispatch({
      type: ADD_TASK,
      payload: res.data,
    });

    setAlert({ msg: 'Successfully Added', alertType: 'primary' });
  } catch (err) {
    console.log(err);
  }
};

export const updateTask = (values, taskId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(values);

  try {
    const res = await axios.put(`/api/task/${taskId}`, body, config);

    dispatch({
      type: UPDATE_TASK,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  try {
    await axios.delete(`/api/task/${taskId}`);

    const res = await axios.get(`/api/task`);

    dispatch({
      type: GET_TASKS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
