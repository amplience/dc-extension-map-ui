import {mockStore} from '../../../utils/mockStore.js';
import {mockExtensionWrapper} from '../../../utils/mockExtension.js';
import {SET_FETCHING} from '../../fetching/fetching.actions.js';
import {SET_INITIALISED} from '../../initialised/initialised.actions.js';

import * as actions from '../selectedPoint.actions';
import {SET_GLOBAL_ERROR} from '../../global-error/global-error.actions.js';

describe('selecterdPoint.actions', () => {
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
});
