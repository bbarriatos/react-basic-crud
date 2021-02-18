import { SET_ALERT, REMOVE_ALERT } from '../utils/types';

const initialState = {
  alert: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        alert: [
          { msg: payload.msg, alertType: payload.alertType, id: payload.id },
        ],
        loading: false,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alert: state.alert.filter((a) => a.id !== payload.id),
        loading: true,
      };
    default:
      return state;
  }
}
