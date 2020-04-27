import {setFetching} from '../fetching/fetching.actions';
import {setInitialised} from '../initialised/initialised.actions';
import {setGlobalError} from '../global-error/global-error.actions';

export const SET_SELECTED_POINT = 'SET_SELECTED_POINT';

export const setSelectedItems = value => ({
  type: SET_SELECTED_POINT,
  value
});

export const setValue = value => async (dispatch, getState) => {
  const {SDK} = getState();
  try {
    await SDK.field.setValue(value);
  } catch (e) {
    const error = e[0].data.keyword;
    if (!error) {
      dispatch(setGlobalError('Could not set value'));
    }
  }
};

export const getValues = () => async (dispatch, getState) => {
  const state = getState();
  const {SDK, params} = state;

  if (!params.apiKey) {
    dispatch(setInitialised(true));

    return dispatch(setGlobalError('Google api key is required'));
  }

  dispatch(setFetching(true));

  try {
    const value = await SDK.field.getValue();

    dispatch(setSelectedItems(value));

    dispatch(setFetching(false));
    dispatch(setInitialised(true));
  } catch (e) {
    console.error('could not load', e);
    dispatch(setFetching(false));
    dispatch(setInitialised(true));
    dispatch(setGlobalError('Could not get selected point'));
  }
};