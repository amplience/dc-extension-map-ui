import { extension as mockExtension } from '../../../utils/mockExtension.js';
import { mockStore } from '../../../utils/mockStore.js';

describe('sdk actions', () => {
  let actions;
  let extension;

  beforeEach(done => {
    const mocked = mockExtension({});
    extension = mocked.extension;
    mocked.mock();
    actions = require('../sdk.actions.js');
    done();
  });

  it('SET_SDK', async () => {
    const store = mockStore();

    await store.dispatch({
      type: 'SET_SDK',
      value: {}
    });

    const dispatched = store.getActions();

    expect(dispatched).toEqual([{ type: 'SET_SDK', value: {} }]);
  });

  it('fetchSDK already defined', async () => {
    const mocked = mockStore({ SDK: {} });

    await mocked.dispatch(actions.fetchSDK());

    const dispatched = mocked.getActions();

    expect(dispatched).toEqual([]);
  });
});
