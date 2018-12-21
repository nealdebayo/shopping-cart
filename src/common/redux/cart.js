
export const ADD_DATA = '@@cart/ADD_DATA'
export const REMOVE_DATA = '@@cart/REMOVE_DATA'


export const addData = (data) => dispatch => {
	return	dispatch({type: ADD_DATA, data})
}

export const removeData = (data) => dispatch => {
	return dispatch({type: REMOVE_DATA, data})
}


const initialState = {length: 0, products: []}

export default (state = initialState, action) => {
	let AlreadyAdded = false
	switch (action.type) {
		case ADD_DATA: 
			AlreadyAdded = false
			state.products.map(product => { AlreadyAdded =  !AlreadyAdded ? (product.product === action.data.product && product.id === action.data.id) : true} )
			if (AlreadyAdded) {

			} else {
				return {...state, length: state.products.length + 1, products:[...state.products, action.data]}
			}
			break
		case REMOVE_DATA:
			AlreadyAdded = false
			state.products.map(product => { AlreadyAdded =  !AlreadyAdded ? (product.product === action.data.product && product.id === action.data.id) : true} )
			if (AlreadyAdded) {
				let newProducts = [...state.products]
				newProducts = newProducts.filter(product => !(product.product === action.data.product && product.id === action.data.id))
				//filter does not affectt the array, but makes a new array depeding on the fileter condition

				return {...state, length: newProducts.length, products: newProducts}				
			}

	}
	return state
}
