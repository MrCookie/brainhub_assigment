import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Input.css'

import { INPUT_DATE, INPUT_TEXT, INPUT_EMAIL } from './constants'

import TextField from 'material-ui/TextField'
import DateField from 'material-ui/DatePicker'

const INPUT_COMPONENTS = {
    [INPUT_TEXT]: TextField,
    [INPUT_DATE]: DateField,
    [INPUT_EMAIL]: TextField
}

class InputContainer extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value || ''
        }
    }

    handleOnChange(event, date) {
        const value = event ? event.target.value : date;
        this.setState({
            value
        })
        this.props.onChange(value, this.props.name);
    }

    componentWillReceiveProps(nextProps) {
        // Reset input
        if(nextProps.value == false || Object.keys(nextProps.value).length === 0) {
            this.setState({
                value: nextProps.value
            })
        }
    }

    render() {
        const Input = INPUT_COMPONENTS[this.props.type]

        return <Input style={style} {...this.props} value={this.state.value} onChange={this.handleOnChange.bind(this)} required/>
    }

};

export default InputContainer;
