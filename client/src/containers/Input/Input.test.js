import React from 'react'
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer'
import { INPUT_DATE, INPUT_EMAIL, INPUT_TEXT } from './contants'

import TextField from 'material-ui/TextField'
import DateField from 'material-ui/DatePicker'
import Input from './InputContainer'

configure({ adapter: new Adapter() })

describe("Input", () => {

    it("should render text field", () => {
        const wrapper = shallow(<Input type={INPUT_TEXT} />);
        expect(wrapper.find(TextField).length).toEqual(1)
    });

    it("should render date field", () => {
        const wrapper = shallow(<Input type={INPUT_DATE} value={{}}/>);
        expect(wrapper.find(DateField).length).toEqual(1)
    });

    it("should render email field", () => {
        const wrapper = shallow(<Input type={INPUT_EMAIL} />);
        expect(wrapper.find(TextField).length).toEqual(1)
    });
});