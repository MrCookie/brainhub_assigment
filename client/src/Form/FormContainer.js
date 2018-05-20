// do fetch call
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateInput, init, submitData, resetForm } from './actions'
import FormComponent from './FormComponent'

import RaisedButton from 'material-ui/RaisedButton';
import style from './Form.css'


const mapStateToProps = state => {
    return {
        inputs: state.form.inputs,
        errors: state.form.errors,
        isFetching: state.form.isFetching,
        fetchSuccess: state.form.fetchSuccess
    };
};

const mapDispatchToProps = dispatch => ({
    initForm: inputs => dispatch(init(inputs)),
    resetForm: () => dispatch(resetForm()),
    updateInput: (name, value) => dispatch(updateInput(name, value)),
    submitForm: formData => dispatch(submitData(formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(FormComponent)