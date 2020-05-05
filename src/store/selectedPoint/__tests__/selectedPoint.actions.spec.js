import {mockStore} from '../../../utils/mockStore.js';
import {mockExtensionWrapper} from '../../../utils/mockExtension.js';
import {SET_FETCHING} from '../../fetching/fetching.actions.js';
import {SET_INITIALISED} from '../../initialised/initialised.actions.js';

import * as actions from '../selectedPoint.actions';
import {SET_GLOBAL_ERROR} from '../../global-error/global-error.actions.js';

describe('set selectedPoint', () => {

  it('setSelectedItems', async () => {
    const {store} = await mockExtensionWrapper({
      params: {
        apiKey: '11111'
      }
    });
    const mocked = mockStore(store.getState());

    await mocked.dispatch(actions.setSelectedItems({lat: 0, lng: 1}));

    const dispatched = mocked.getActions();

    expect(dispatched).toEqual([
      {type: actions.SET_SELECTED_POINT, value: {lat: 0, lng: 1}}
    ]);
  });


  it('setValue', async () => {
    const spy = jest.spyOn(global.console, 'error').mockImplementation();
    const setValue = jest.fn().mockImplementation(() => Promise.resolve());

    const mocked = mockStore({
      SDK: {
        field: {
          setValue
        }
      }
    });

    await mocked.dispatch(actions.setValue());

    expect(setValue).toBeCalled();

    spy.mockRestore();
  });

  it('setSelectedItems error', async () => {
    const spy = jest.spyOn(global.console, 'error').mockImplementation();

    const setValue = jest.fn().mockImplementation(() => Promise.reject([{
      data: {
        keyword: 'error'
      }
    }
    ]));
    const mocked = mockStore({
      SDK: {
        field: {
          setValue
        }
      }
    });

    await mocked.dispatch(actions.setValue());
    const dispatched = mocked.getActions();

    expect(dispatched).toEqual([
      {type: SET_GLOBAL_ERROR, value: 'error'},
    ]);
    spy.mockRestore();
  });

  it('setSelectedItems defaultError', async () => {
    const spy = jest.spyOn(global.console, 'error').mockImplementation();

    const setValue = jest.fn().mockImplementation(() => Promise.reject());
    const mocked = mockStore({
      SDK: {
        field: {
          setValue
        }
      }
    });

    await mocked.dispatch(actions.setValue());
    const dispatched = mocked.getActions();

    expect(dispatched).toEqual([
      {type: SET_GLOBAL_ERROR, value: 'Could not set value'},
    ]);
    spy.mockRestore();
  });


  it('getSelectedPoint success', async () => {
    const spy = jest.spyOn(global.console, 'error').mockImplementation();

    const getValue = jest.fn().mockImplementation(() => Promise.resolve({lat: 0, lng: 1}));
    const setValue = jest.fn().mockImplementation(() => Promise.resolve());
    const mocked = mockStore({
      SDK: {
        field: {
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
          },
          getValue,
          setValue
        }
      },
      params: {
        apiKey: '11111'
      },
      selectedPoint: {},

    });

    await mocked.dispatch(actions.getValues());

    const dispatched = mocked.getActions();

    expect(getValue).toBeCalled();
    expect(dispatched).toEqual([
      {type: SET_FETCHING, value: true},
      {
        type: actions.SET_SELECTED_POINT,
        value: {lat: 0, lng: 1}
      },
      {type: SET_FETCHING, value: false},
      {type: SET_INITIALISED, value: true}
    ]);

    spy.mockRestore();
  });

  it('getSelectedPoint with error', async () => {
    const spy = jest.spyOn(global.console, 'error').mockImplementation();

    const getValue = jest.fn().mockImplementation(() => Promise.resolve({lat: 0, lng: 1}));
    const setValue = jest.fn().mockImplementation(() => Promise.resolve());
    const mocked = mockStore({
      SDK: {
        field: {
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
          },
          getValue,
          setValue
        }
      },
      params: {
        apiKey: ''
      },
      selectedPoint: {},

    });

    await mocked.dispatch(actions.getValues());

    const dispatched = mocked.getActions();

    expect(dispatched).toEqual([
      {type: SET_INITIALISED, value: true},
      {type: SET_GLOBAL_ERROR, value: 'Google api key is required'},
    ]);

    spy.mockRestore();
  });

  it('getSelectedPoint with error', async () => {
    const spy = jest.spyOn(global.console, 'error').mockImplementation();

    const getValue = jest.fn().mockImplementation(() => Promise.reject());
    const setValue = jest.fn().mockImplementation(() => Promise.resolve());
    const mocked = mockStore({
      SDK: {
        field: {
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
          },
          getValue,
          setValue
        }
      },
      params: {
        apiKey: '11111'
      },
      selectedPoint: {},

    });

    try {
      await mocked.dispatch(actions.getValues());
    } catch (e) {
      const dispatched = mocked.getActions();

      expect(dispatched).toEqual([
        {type: SET_FETCHING, value: false},
        {type: SET_INITIALISED, value: true},
        {type: SET_GLOBAL_ERROR, value: 'Could not get selected point'},
      ]);
    }
    spy.mockRestore();
  });
});
