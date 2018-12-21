import CartReducer from './cart'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import { addData, ADD_DATA, REMOVE_DATA } from './cart.js'

const data =  { id: 1,
                product: 'ice cream',
                image: 'https://images.pexels.com/photos/1028704/pexels-photo-1028704.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
              }

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {length: 0, products: []}
const expectedActions = [ {type: ADD_DATA, data} ]
const decrementAction = {type: REMOVE_DATA, data}
const store = mockStore({cart : initialState}) 


describe('Cart Actions', () => {
  it('Should dispatch the right actions', () => {        
  store.dispatch(addData(data))
  expect(store.getActions()).toEqual(expectedActions);
  })
})

describe('Cart Reducer', () => {
  it('Should increment as due', () => {
    expect(CartReducer(initialState, expectedActions[0])).toEqual({...initialState,length: 1, products: [data]})
  })
  it('Should decrement as due', () => {
    expect(CartReducer({length: 1, products: [data]}, decrementAction)).toEqual(initialState)
  })
})