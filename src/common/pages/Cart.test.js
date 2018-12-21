/* eslint-env jest */
import React from 'react'
import configureMockStore from "redux-mock-store"
import {shallow} from 'enzyme'
import Cart from './Cart.jsx'
import {productList} from './../test/mockData/productList'

describe('Page - Cart', () => {

	let wrapper

	beforeAll(() => {
		const mockStore = configureMockStore()
		const store = mockStore({products: productList})

		wrapper = shallow(
				<Cart store={store} />
		)
	})

	// component loads
	it('renders without crashing', () => {
		expect(wrapper.length).toEqual(1)
	})


})
