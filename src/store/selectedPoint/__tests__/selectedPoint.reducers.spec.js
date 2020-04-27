import { basicReducer } from "../../../utils/basicReducer";
import { selectedPointReducer } from "../selectedPoint.reducer";
import { SET_SELECTED_POINT } from "../selectedPoint.actions";

describe('selectedPoint reducer', () => {
  it('SET_SELECTED_POINT', () => {
    basicReducer(selectedPointReducer, [
      { action: { type: SET_SELECTED_POINT, value: {}}, expected: {}},
      { action: { type: '', value: {}}, expected: {}}
    ]);
  });
})