import {
    FORM_RESET,
    FORM_UPDATE_VALUE,
    FORM_DESTROY,
    FORM_INIT,
    FORM_SUBMIT_REQUESTED,
    SUBMIT_FORM_SUCCESS,
    SUBMIT_FORM_FAIL
} from './constants';
import {
    API_URL
} from '../../config'
import axios from 'axios'

export function init(inputs) {
    return {
        type: FORM_INIT,
        payload: {
            inputs
        }
    }
}

export function destroy(inputs) {
    return {
        type: FORM_DESTROY
    }
}

export function updateInput(name, value) {
    return {
        type: FORM_UPDATE_VALUE,
        payload: {
            name,
            value
        }
    };
}

export function resetForm() {
    return {
        type: FORM_RESET
    };
}

export function submitDataRequested() {
    return {
        type: FORM_SUBMIT_REQUESTED,
    };
}

export function submitDataSuccess(data) {
    return {
        type: SUBMIT_FORM_SUCCESS,
        payload: { data }
    };
}

export function submitDataFailed(errors) {
    return {
        type: SUBMIT_FORM_FAIL,
        payload: { errors }
    };
}

export function submitData(formData) {
    return dispatch => {
        // set state to "loading"
        dispatch(submitDataRequested());

        axios.post(API_URL + 'api/event', {
            data: formData
            }).then(response => {
                // set state to success
                if (typeof response.data.errors !== 'undefined') {
                    const errors = Object.values(response.data.errors);
                    dispatch(submitDataFailed(errors));
                }
                else dispatch(submitDataSuccess(response.data));
            })
            .catch(error => {
                dispatch(submitDataFailed([error]));
            })
    }
}

export function onSubmitComplete(response) {
    return {
        type: SUBMIT_FORM_SUCCESS,
        response
    }
}