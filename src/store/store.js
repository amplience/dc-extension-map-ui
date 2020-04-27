import thunkMiddleware from 'redux-thunk';

import {createStore, applyMiddleware, combineReducers, compose} from 'redux';

import {sdkReducer} from './sdk/sdk.reducer';
import {paramReducer} from './params/params.reducer';
import {globalErrorReducer} from './global-error/global-error.reducer';
import {initialisedReducer} from './initialised/initialised.reducer';
import {selectedPointReducer} from './selectedPoint/selectedPoint.reducer';
import {fetchingReducer} from './fetching/fetching.reducer';

export const rootReducer = combineReducers({
  SDK: sdkReducer,
  params: paramReducer,
  globalError: globalErrorReducer,
  initialised: initialisedReducer,
  selectedPoint: selectedPointReducer,
  isFetching: fetchingReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);
