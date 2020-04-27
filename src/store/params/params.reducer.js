import {SET_PARAMS} from "./params.actions";

export const params = {
  "apiKey": ""
};

export function paramReducer(state = params, {type, value}) {
  switch (type) {
    case SET_PARAMS:
      const {installation, instance} = (value || {});
      const selectedParams = {...installation, ...instance};

      return {...state, ...selectedParams};
    default:
      return state;
  }
}
