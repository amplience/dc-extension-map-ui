import React from 'react';
import {mount} from 'enzyme';
import {mockExtensionWrapper} from '../../utils/mockExtension';
import ShallowRenderer from 'react-test-renderer/shallow';
import Map from '../index';
import renderer from 'react-test-renderer';
import { act } from "react-dom/test-utils";

describe('extension', () => {
  let component;

  jest.useFakeTimers();

  beforeEach(() => {
    component = ShallowRenderer.createRenderer();
  });


  it('renders without crashing', async () => {
    const {Render} = await mockExtensionWrapper();

    mount((
      <Render>
        <Map/>
      </Render>
    ));
  });


  it('check snapshot', async () => {
    const {store} = await mockExtensionWrapper();

    const component = renderer.create(<Map {...store.getState()}/>);
    expect(component.toJSON()).toMatchSnapshot();
  });
});

