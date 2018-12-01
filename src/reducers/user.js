import { LOGIN_SUCCESS, LOGOUT_SUCCESS, UPDATE_PROFILE } from '../actions/user-actions-types';

const initialState = {
  token: null,
  userDetails: null,
};

export default function user(state = initialState, {
  payload, type,
}) {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        userDetails: payload,
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          ...payload,
        },
      };

    case LOGOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
}
