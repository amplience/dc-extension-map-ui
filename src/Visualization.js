import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Warning} from '@material-ui/icons';
import {setGlobalError} from './store/global-error/global-error.actions';
import {Container, Snackbar} from '@material-ui/core';

import MapWrapper from './map/renderer'

const getUrl = ({vse, content}) => {
  return `//${vse}/content/id/${content}`;
};

const VisualizationComponent = params => {
  const [values, setValues] = useState({});
  const message = (
    <span>
      <Warning/>
      {params.globalError}
    </span>
  );

  useEffect(() => {
    async function fetchData(url) {
      const res = await fetch(url);

      res
        .json()
        .then(res => setValues(res.content))
        .catch(err => params.setGlobalError(err));
    }


    fetchData(getUrl(params));
  }, [params]);

  return (
    <>
      <Container>
        <Snackbar
          anchorOrigin={{vertical: 'top', horizontal: 'center'}}
          autoHideDuration={3000}
          open={Boolean(params.globalError)}
          message={message}
        />
      </Container>
      {values.location ? (<MapWrapper apiKey={params.apiKey} {...values}/>) : null}
    </>
  );
};

const Visualization = connect(
  state => ({
    globalError: state.globalError,
  }),
  {setGlobalError}
)(VisualizationComponent);

export default Visualization;
