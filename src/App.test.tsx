import MomentUtils from '@date-io/moment';
import { CssBaseline } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from './theme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <App />
      </MuiPickersUtilsProvider>
    </ThemeProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
