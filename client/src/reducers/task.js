import {
  ADD_TASK,
  UPDATE_TASK,
  GET_TASKS,
  GET_TASK,
  LOG_OUT,
} from '../utils/types';

const initialState = {
  tasks: [],
  task: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: payload,
        task: [],
      };
    case GET_TASK:
      return {
        ...state,
        task: payload,
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, payload],
        task: payload,
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: [...state.tasks],
        task: [],
      };
    case LOG_OUT:
      return {
        ...state,
        tasks: [],
        task: null,
      };
    default:
      return state;
  }
}
