import {init} from 'dc-extensions-sdk';
import {setGlobalError} from '../global-error/global-error.actions';
import {setInitialised} from "../initialised/initialised.actions";
import {setParams} from "../params/params.actions";
import {getValues} from "../selectedPoint/selectedPoint.actions"
export const SET_SDK = 'SET_SDK';

export const setSDK = value => ({
  type: SET_SDK,
  value
});

export const fetchSDK = () => async (dispatch, getState) => {
  let {SDK} = getState();

  try {
    if (SDK) {
      return SDK;
    }

    SDK = window.extensionsSdkInstance ? await window.extensionsSdkInstance : await init();

    dispatch(setSDK(SDK));

    dispatch(setParams(SDK.params));

    dispatch(getValues());

    SDK.frame.startAutoResizer();
    SDK.form.onReadOnlyChange(readOnly => {
      dispatch(setSDK({...SDK, form: {...SDK.form, readOnly}}))
    })
  }
  catch (e) {
    console.error('Failed to load', e);
    dispatch(setInitialised(true));
    dispatch(setGlobalError('Could not get SDK'));
  }


  return SDK;
};