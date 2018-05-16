import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import thunk from 'redux-thunk'

import InputContainer from '../../containers/Input/InputContainer'
import { INPUT_DATE, INPUT_TEXT } from '../../containers/Input/contants'

import Form from '../../containers/Form/FormContainer'
import formReducer from '../../containers/Form/reducers'

const store = createStore(combineReducers({
  form: formReducer
}), applyMiddleware(thunk));

window.store = store;

const App = () =>
  <Provider store={store}>
    <MuiThemeProvider>
      <Form title="Event form">
        <InputContainer type={INPUT_TEXT} name="firstName" hintText="Fiest Name" />
        <InputContainer type={INPUT_TEXT} name="lastName" hintText="Last Name" />
        <InputContainer type={INPUT_TEXT} name="email" hintText="Email" />
        <InputContainer type={INPUT_DATE} name="date" hintText="Event date" />
      </Form>
    </MuiThemeProvider>
  </Provider>;

export default App;
