import { FORM_DESTROY, FORM_RESET, FORM_UPDATE_VALUE, FORM_INIT, FORM_SUBMIT_REQUESTED, SUBMIT_FORM_SUCCESS, SUBMIT_FORM_FAIL } from './constants';

const initialState = {
  inputs: {},
  errors: [],
  isFetching: false,
  fetchSuccess: false
};

function formReducer (state = initialState, action) {
  switch(action.type) {
        case FORM_DESTROY: {
            return initialState;
        }
        case FORM_RESET: {
            let newState = state;
            Object.keys(newState.inputs).forEach((input, i) => {
                newState.inputs[input] = "";
            });
            return { ...newState, errors: [], fetchSuccess: false };
        }
        case FORM_UPDATE_VALUE: {
            let newState = state;
            newState.inputs[action.payload.name] = action.payload.value;
            return newState;
        }
        case FORM_INIT: {
            return { ...state, inputs: action.payload.inputs }
        }
        case FORM_SUBMIT_REQUESTED: {
            return { ...state, isFetching: true }
        }
        case SUBMIT_FORM_SUCCESS: {
            return { ...state, errors: [], isFetching: false, fetchSuccess: true }
        }
        case SUBMIT_FORM_FAIL: {
            return { ...state, errors: action.payload.errors, isFetching: false }
        }
        
        default: return initialState;
  }
}

export default formReducer;