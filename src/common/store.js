
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import products from './redux/products'
import intl from './redux/intl'
import cart from './redux/cart'

export default (state = {}) => {

	const middleware = [
		thunkMiddleware
	]

	if (process.env.NODE_ENV !== 'production') {
		if (typeof window !== 'undefined') {
			middleware.push(createLogger())
		}
	}

	return createStore(
		combineReducers({
			cart,
			products,
			intl
		}),
		state,
		applyMiddleware(...middleware)
	)
}
