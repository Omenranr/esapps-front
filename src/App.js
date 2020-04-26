import React, { Component } from 'react';
import { Router } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';

//REDUX IMPORTS
import {Provider} from 'react-redux'
import store from './store'
import { loadUser } from "./actions/authActions";

import { history } from '../src/history'

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

export default class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Router history={history}>
              <Routes />
            </Router>
          </ThemeProvider>
      </Provider>
    );
  }
}
