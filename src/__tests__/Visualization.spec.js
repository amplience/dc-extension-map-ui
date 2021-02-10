import React from 'react';
import {mount} from 'enzyme';
import {mockExtensionWrapper} from '../utils/mockExtension';
import Visualization from '../Visualization';
import {Snackbar} from '@material-ui/core';
import {act} from '@testing-library/react';

it('renders without crashing', async () => {
  const {Render} = await mockExtensionWrapper();

  mount((
    <Render>
      <Visualization
        vse={"8mr8kf9sz3sd1j0vleorud5ub.staging.bigcontent.io"}
        content={"9fba787f-9b89-435e-806f-6f0d6d9057ae"}
      />
    </Render>
  ));
});

it('show warning', async () => {
  const {Render, store} = await mockExtensionWrapper();

  const wrapper = mount(
    <Render>
      <Visualization
        {...store.getState()}
        globalError={"Google api key is required"}
        selectedItems={[]}
        vse={"8mr8kf9sz3sd1j0vleorud5ub.staging.bigcontent.io"}
        content={"9fba787f-9b89-435e-806f-6f0d6d9057ae"}
      />
    </Render>
  );

  expect(wrapper.find(Snackbar).text()).toBe('Google api key is required')
});

it('no API key', async () => {
  const {Render, store} = await mockExtensionWrapper();

  const wrapper = mount(
    <Render>
      <Visualization
        {...store.getState()}
        globalError={"Google api key is required"}
        selectedItems={[]}
        vse={"8mr8kf9sz3sd1j0vleorud5ub.staging.bigcontent.io"}
        content={"9fba787f-9b89-435e-806f-6f0d6d9057ae"}
      />
    </Render>
  );

  expect(wrapper.find(Snackbar).text()).toBe('Google api key is required')
});

it('should fetch data', async () => {
  jest.useFakeTimers();

  const {Render, store} = await mockExtensionWrapper();
  const spy = jest.spyOn(global, 'fetch').mockImplementation(() => {
    return new Promise((resolve) => resolve({
        ok: true,
        json: () => {
          return new Promise((resolve) => resolve({
            content: {
              location: {
                lat: 0,
                lng: 1
              }
            }
          }))
        }
      })
    )
  });

  mount(
    <Render>
      <Visualization
        {...store.getState()}
        vse={"8mr8kf9sz3sd1j0vleorud5ub.staging.bigcontent.io"}
        content={"9fba787f-9b89-435e-806f-6f0d6d9057ae"}
      />
    </Render>
  );

  act(() => {
    jest.runAllImmediates()
  })

  expect(spy).toBeCalled();
});

it('should fail fetch data', async () => {
  jest.useFakeTimers();

  const {Render, store} = await mockExtensionWrapper();
  const spy = jest.spyOn(global, 'fetch').mockImplementation(() => {
    return new Promise((resolve) => resolve({
        ok: true,
        json: () => {
          return new Promise((resolve, reject) => reject('Some error'))
        }
      })
    )
  });

  try {
    act(() => {
      mount(
        <Render>
          <Visualization
            {...store.getState()}
            vse={"8mr8kf9sz3sd1j0vleorud5ub.staging.bigcontent.io"}
            content={"9fba787f-9b89-435e-806f-6f0d6d9057ae"}
          />
        </Render>
      );

      jest.runAllImmediates()
    })
  } catch (error) {
    expect(spy).toBeCalled();

  }

});

