import React from 'react';

import {Provider} from 'react-redux';

const initalParams = {
  apiKey: ''
};

export const extension = ({params = initalParams, initalValue = []} = {}) => {
  const onReadOnlyChange = jest.fn();
  const startAutoResizer = jest.fn();
  const getValue = jest.fn(() => initalValue);
  const setValue = jest.fn();

  const extension = {
    params: {
      instance: {...initalParams, ...params}
    },
    form: {
      onReadOnlyChange
    },
    frame: {
      startAutoResizer
    },
    field: {
      getValue,
      setValue,
      schema: {
        type: 'object',
        properties: {
          lat: {
            type: 'number'
          },
          lng: {
            type: 'number'
          }
        }
      }
    },

  };

  const mock = () => {

    jest.doMock('dc-extensions-sdk', () => ({
      init: jest.fn(() => Promise.resolve(extension))
    }));

    const {store, rootReducer} = require('../store/store');

    return {rootReducer, store};

  };


  return {extension, mock};
}
export const mockExtension = ({params = initalParams, initalValue = []} = {}) => {
  const onReadOnlyChange = jest.fn();
  const startAutoResizer = jest.fn();
  const getValue = jest.fn(() => initalValue);
  const setValue = jest.fn();

  const extension = {
    params: {
      instance: {...initalParams, ...params}
    },
    form: {
      onReadOnlyChange
    },
    frame: {
      startAutoResizer
    },
    field: {
      getValue,
      setValue,
      schema: {
        type: 'object',
        properties: {
          lat: {
            type: 'number'
          },
          lng: {
            type: 'number'
          }
        }
      }
    },
    selectedPoint: {
      lat: 51.50676360998321,
      lng: -0.07467510651549603
    }
  };

  jest.doMock('dc-extensions-sdk', () => ({
    init: jest.fn(() => Promise.resolve(extension))
  }));

  const {store, rootReducer} = require('../store/store');

  return {extension, store, rootReducer}
}

export async function mockExtensionWrapper({params = initalParams, initalValue = []} = {}) {
  const {extension, store, rootReducer} = mockExtension({params: {...initalParams, ...params}, initalValue});
  const {fetchSDK} = require('../store/sdk/sdk.actions');

  store.dispatch(fetchSDK());

  const Render = ({children}) => (
    <Provider store={store}>
      {children}
    </Provider>
  );

  return {
    Render,
    store,
    rootReducer,
    ...extension
  };
}
