import { basicReducer } from '../../../utils/basicReducer';
import { paramReducer, params } from '../params.reducer';
import { SET_PARAMS } from '../params.actions';

describe('params reducer', () => {
  it('SET_PARAMS', () => {
    basicReducer(paramReducer, [
      {
        action: {
          type: SET_PARAMS,
          value: { instance: { apiKey: '11111', theme: "Light", searchPlaceholderText: "Search" }, installation: {} }
        },
        expected: Object.assign(params, { apiKey: '11111', theme: "Light", searchPlaceholderText: "Search" })
      },
      {
        action: {
          type: SET_PARAMS
        },
        expected: params
      },
      { action: { type: '', value: {} }, expected: params }
    ]);
  });
});
