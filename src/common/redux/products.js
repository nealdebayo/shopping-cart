import axios from 'axios'

const LOAD_DATA = '@@products/LOAD_DATA'

export const listProducts = () => async dispatch => {
		let productsPromise
		try {
			productsPromise = async () => await axios.get('http://localhost:3000/api/products')
		} catch (e) {
			productsPromise = () => new Promise(resolve=> setTimeout(()=>{
				return {data: 'no-data'}
			}, 500))
		}
		 return productsPromise().then(data => {
			dispatch({type: LOAD_DATA, data: data.data})
		}).catch(e => {
		 	dispatch({type: LOAD_DATA, data: []})
		 })
		
	// }, 500))
}

const initialState = []

export default (state = initialState, action) => {
	if (action.type === LOAD_DATA) { return action.data }
	return state
}
