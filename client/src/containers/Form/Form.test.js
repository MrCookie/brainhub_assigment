import React from 'react'
import { configure, mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';

import Form from './FormContainer'
import TextField from 'material-ui/TextField'
import DateField from 'material-ui/DatePicker'

import { updateInput, init, resetForm } from './actions'
import formReducer from './reducers'

configure({ adapter: new Adapter() })

describe("Form", () => {
    let props;
    let wrapper;
    let store;

    const initialState = {
        form: {
            inputs: [],
            errors: [],
            isFetching: false,
            fetchSuccess: false
        }  
    }
    const mockStore = configureStore()
    

    beforeEach(() => {
        store = mockStore(initialState)
        wrapper = shallow(<Provider store={store}><Form title="Hello"><TextField /><DateField /></Form></Provider>)   
    });

    it("should render smart component", () => {
        expect(wrapper.find(Form).length).toEqual(1)
    });

    it('check actions on dispatching', () => {
        let action
        store.dispatch(init())
        store.dispatch(updateInput())
        store.dispatch(resetForm())
        action = store.getActions()

        expect(action[0].type).toBe("FORM_INIT")
        expect(action[1].type).toBe("FORM_UPDATE_VALUE")
        expect(action[2].type).toBe("FORM_RESET")
    });

});

describe('Test FormActions', () => {
    it('actionCreator init', () => {
        const initAction = init({"test": 123})
        expect(initAction).toEqual({
            payload: {
                inputs: {
                    test: 123
                }
            },
            type: 'FORM_INIT'
        })
    });

    it('actionCreator updateInput', () => {
        const updateInputAction = updateInput({"test": 321})
        expect(updateInputAction).toEqual({
            payload: {
                name: {
                    test: 321
                }
            },
            type: 'FORM_UPDATE_VALUE'
        })
    });

    it('actionCreator resetForm', () => {
        const resetFormAction = resetForm()
        expect(resetFormAction).toEqual({
            type: 'FORM_RESET'
        })
    });

});

describe('Test formReducers',()=>{
    let initialState = {
        inputs: {},
        errors: [],
        isFetching: false,
        fetchSuccess: false
    }
    let state;

    beforeEach(() => {
        state = initialState;
    })

    it('reducer for FORM_DESTROY', () => {
        let newState = formReducer(state, { type:"FORM_DESTROY" })
        expect(newState).toEqual(initialState)
    });

    it('reducer for FORM_RESET', () => {
        state.inputs = {
            test1: '123',
            test2: '321'
        }
        let newState = formReducer(state, { type:"FORM_RESET" })
        expect(newState).toEqual(initialState)
    });

    it('reducer for FORM_UPDATE_VALUE', () => {
        state.inputs = {
            test1: '123',
            test2: '321'
        }
        const payload = {
            name: 'test2',
            value: '123'
        }
        let newState = formReducer(state, { type:"FORM_UPDATE_VALUE", payload })
        expect(newState.inputs.test2).toEqual('123')
    });

});