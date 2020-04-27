import React from 'react';

import {connect} from 'react-redux';
import {Warning} from '@material-ui/icons';
import {setGlobalError} from './store/global-error/global-error.actions';
import {Snackbar} from '@material-ui/core';


const AppComponent = params => {

  const message = (
    <span>
      <Warning/>
      {params.globalError}
    </span>
  );

  return (
    <>
      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        autoHideDuration={3000}
        onClose={() => params.setGlobalError(null)}
        open={Boolean(params.globalError)}
        message={message}
      />

    </>
  );
};

const App = connect(
  state => ({
    globalError: state.globalError,
    params: state.params
  }),
  {setGlobalError}
)(AppComponent);

export default App;
