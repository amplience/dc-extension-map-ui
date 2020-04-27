import {
  SET_SELECTED_POINT,
} from './selectedPoint.actions';

export function selectedPointReducer(state = {}, action) {
  switch (action.type) {
    case SET_SELECTED_POINT:
      return action.value;
    default:
      return state;
  }
}




