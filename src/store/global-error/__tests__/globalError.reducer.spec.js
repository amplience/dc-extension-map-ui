import {basicReducer} from '../../../utils/basicReducer';
import {SET_GLOBAL_ERROR} from '../global-error.actions';
import {globalErrorReducer} from "../../global-error/global-error.reducer";

describe('global error reducer', () => {
  it('SET_GLOBAL_ERROR', () => {
    basicReducer(globalErrorReducer, [
      {
        action: {
          type: SET_GLOBAL_ERROR,
          value: 'Global error'
        },
        expected: 'Global error'
      },
      { action: { type: '', value: null }, expected: null}
    ]);
  });
});
