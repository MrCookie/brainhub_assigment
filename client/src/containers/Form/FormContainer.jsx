// do fetch call
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateInput, init, submitData, resetForm } from './actions'

import RaisedButton from 'material-ui/RaisedButton';
import style from './Form.css'

class FormContainer extends Component {

    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.object),
            PropTypes.object
        ]).isRequired,

        title: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            selectedDatePicker: null,
            isFetching: false,
            formSent: false
        };
    }

    handleInputChange(value, name) {  
        this.props.updateInput(name, value);
    }

    handleDatePickerChange(date) {
        const newDate = new Date(date).toLocaleString('en');
        this.handleInputChange(date, this.state.selectedDatePicker.name)
        this.setState({
            selectedDatePicker: null
        });
    }

    handleTextChange(value, name) {
        this.handleInputChange(value, name);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.submitForm(this.props.inputs);
    }

    makeInputsFromChildren() {
        const inputs = {};
        this.props.children.forEach((input) => {
            inputs[input.props.name] = "";
        });
        return inputs;
    }

    // Display connection-related errors
    showErrors() {
        if(this.props.errors.length > 0) {
            return (
                <ul>
                    {this.props.errors.map((error, key) => {
                        if(!error.path) {
                            return <li key={key}>{error.message}</li>
                        }
                    })}
                </ul>
            )
        }
        return null;
    }

    setSelectedDate(event) {
        this.setState({
            selectedDatePicker: event.target
        });
    }

    createInputs() {
        return this.props.children.map((input, key) => {

            const InputComponent = input.type;
            const error = this.props.errors.find(error => error.path === input.props.name)
            const value = this.props.inputs[input.props.name];

            // Binding form events
            if(input.props.type === 'INPUT_DATE') {
                return <InputComponent
                    {...input.props}
                    key={key}
                    value={value || {}}
                    errorText={error ? error.message : ''}
                    onChange={this.handleDatePickerChange.bind(this)}
                    onClick={this.setSelectedDate.bind(this)}/>
            }
                
            return <InputComponent
                key={key}
                {...input.props}
                value={value || ''}
                errorText={error ? error.message : ''}
                onChange={this.handleTextChange.bind(this)}/>
        })
    }

    componentDidUpdate() {
        if(this.props.fetchSuccess) {
            this.props.resetForm();
            this.setState({
                formSent: true
            })
        }
    }

    componentWillMount() {
        const inputs = this.makeInputsFromChildren();
        this.props.initForm(inputs);
    }

    componentWillUnmount() {
        this.props.resetForm();
    }

    render() {
        return (
            <form className={style.awesome_form} onSubmit={this.handleSubmit}  >
                { this.showErrors() }
                { (this.state.formSent) ? <h3>Hurray! Form sent!</h3> : null }
                <h1>{this.props.title}</h1>
                { this.createInputs() }
                <RaisedButton color="primary" primary={true} type="submit" label="Submit" onClick={this.handleSubmit} disabled={ this.props.isFetching }/>
            </form>
        )
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer)