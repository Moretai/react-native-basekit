import { createAction } from 'redux-actions';

export const GOBACK = 'GOBACK';
export const goBack = createAction(GOBACK);

export const RESET_NAVIGATOR = 'RESET_NAVIGATOR';
export const resetNavigator = createAction(RESET_NAVIGATOR);
