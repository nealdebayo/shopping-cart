/* eslint-disable react/prefer-stateless-function */

import React, {Fragment} from 'react'
import {FormattedMessage} from 'react-intl'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Product from './../components/Product'
import {removeData} from './../redux/cart' 


const Cart = (props) => {
	const removeFromCart = (product) => {
		props.removeFromCart(product)
	}
		return (
			<>
				<div>
					<Link to="/"><i className="fa fa-arrow-left"  style={{position: 'absolute', top: '-100px', left: '20px', color: '#fff', fontSize: '20px', cursor: 'pointer'}}></i></Link><br />
				</div>
				{
					props.cart.products.map(product => <Product key={product.id} remove = {removeFromCart} product={product} customStyle={"w-100"} displayB={false}/>)
				}
			</>
		)
}

const mapStateToProps = (state) => {
	return {
		cart: state.cart
	}
}
const mapDispatchToProps = (d) => {
	return {
		removeFromCart: (data) => d(removeData(data))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart)
