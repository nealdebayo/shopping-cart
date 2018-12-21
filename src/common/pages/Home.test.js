/* eslint-env jest */
import React from 'react'
import configureMockStore from "redux-mock-store"
import {shallow} from 'enzyme'
import Home from './Home.jsx'
import {productList} from './../test/mockData/productList'

describe('Page - Home', () => {

	let wrapper

	beforeAll(() => {
		const mockStore = configureMockStore()
		const store = mockStore({products: productList})

		wrapper = shallow(
				<Home store={store} />
		)
	})

	// component loads
	it('renders without crashing', () => {
		expect(wrapper.length).toEqual(1)
	})


})
