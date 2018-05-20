import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import thunk from 'redux-thunk'

import Input from '../Input'
import { INPUT_DATE, INPUT_EMAIL, INPUT_TEXT } from '../Input/constants';

import Form from '../Form'
import formReducer from '../Form/reducers'

const store = createStore(combineReducers({
  form: formReducer
}), applyMiddleware(thunk));

window.store = store;

const App = () =>
  <Provider store={store}>
    <MuiThemeProvider>
      <Form title="Event form">
        <Input type={INPUT_TEXT} name="firstName" hintText="Fiest Name" />
        <Input type={INPUT_TEXT} name="lastName" hintText="Last Name" />
        <Input type={INPUT_TEXT} name="email" hintText="Email" />
        <Input type={INPUT_DATE} name="date" hintText="Event date" />
      </Form>
    </MuiThemeProvider>
  </Provider>;

export default App;
