import React from 'react';
import {mount} from 'enzyme';
import {mockExtensionWrapper} from '../utils/mockExtension';
import App from '../App';
import {Snackbar} from '@material-ui/core';
import {mockStore} from "../utils/mockStore";

describe('App', () => {
  it('renders without crashing', async () => {
    const {Render} = await mockExtensionWrapper();

    mount((
      <Render>
        <App/>
      </Render>
    ));
  });

  it('show warning', async () => {
    const {Render, store} = await mockExtensionWrapper();

    const wrapper = mount(
      <Render>
        <App
          {...store.getState()}
          globalError={"Google api key is required"}
        />
      </Render>
    );

    expect(wrapper.find(Snackbar).text()).toBe('Google api key is required')
  });


  it('no API key', async () => {
    const {Render, store} = await mockExtensionWrapper();

    const wrapper = mount(
      <Render>
        <App
          {...store.getState()}
          globalError={"Google api key is required"}
        />
      </Render>
    );

    expect(wrapper.find(Snackbar).text()).toBe('Google api key is required')
  });


})
