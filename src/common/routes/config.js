
import App from '../components/App'
import AsyncRoute from './AsyncRoute'

import ErrorPage from '../pages/ErrorPage'
import Cart from '../pages/Cart'
import {listProducts} from '../redux/products'
import {listCart} from '../redux/cart'

// todo:
// many of the route names will come from external service.
export default async () => {
	await new Promise(resolve => setTimeout(() => resolve()), 500)
	return [{
		component: App,
		routes: [{
			path: '/',
			exact: true,
			component: AsyncRoute({
				loader: () => import('../pages/Home.jsx'),
				actions: [
					() => listProducts()
				]
			})
		}, {
			path: '/mycart',
			component: AsyncRoute({
				loader: () => import('../pages/Cart.jsx')
			})
		}, {
			path: '*',
			status: 404,
			component: ErrorPage
		}]
	}]
}
