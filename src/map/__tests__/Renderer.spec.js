import React from 'react';
import {mount} from 'enzyme';
import {mockExtensionWrapper} from '../../utils/mockExtension';
import ShallowRenderer from 'react-test-renderer/shallow';
import Map from '../renderer';
import renderer from 'react-test-renderer';

describe('renderer', () => {
  let component;

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

    const component = renderer.create(<Map apiKey={"11111"} {...store.getState()}/>);
    expect(component.toJSON()).toMatchSnapshot();
  });
});

