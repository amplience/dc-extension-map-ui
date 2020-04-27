import React from 'react';
import ReactDOM from 'react-dom';

import {store} from './store/store';
import {Provider} from 'react-redux';
import {fetchSDK} from './store/sdk/sdk.actions';

import App from './App';
import Visualization from './Visualization';

import './index.css';

const Render = () => (
  <Provider store={store}>
    <App/>
  </Provider>
);

const VisualizationRender = ({vse, content, apiKey}) => (
  <Provider store={store}>
    <Visualization content={content} vse={vse} apiKey={apiKey}/>
  </Provider>
);

function getUrlVars() {
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

const urlParams = getUrlVars();


if (urlParams["vse"] && urlParams["content"] && urlParams["apiKey"]) {
  ReactDOM.render(<VisualizationRender content={urlParams["content"]}
                                       apiKey={urlParams["apiKey"]}
                                       vse={urlParams["vse"]}/>, document.getElementById('root'));
} else {
  store.dispatch(fetchSDK());
  ReactDOM.render(<Render/>, document.getElementById('root'));
}


