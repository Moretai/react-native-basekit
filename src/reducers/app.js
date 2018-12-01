import { HIDE_LOADER, SHOW_LOADER } from '../actions/app-action-types';
import { LOGOUT_SUCCESS } from '../actions/user-actions-types';

const initialState = { isLoading: false };

export default function app(state = initialState, action) {
  switch (action.type) {
    case HIDE_LOADER:
      return { isLoading: false };

    case SHOW_LOADER:
      return { isLoading: true };

    case LOGOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
}
