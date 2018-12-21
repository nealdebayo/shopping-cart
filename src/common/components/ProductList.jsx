import {ProductContext} from './../contexts/ProductContext'
import React, {PureComponent, Fragment} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addData} from './../redux/cart' 
import Product from './Product'



const cartStyle = {
	cursor: 'pointer',
	fontSize: '60px',
	position: 'absolute',
	zIndex: 3,
	top: '-160px',
	right: '-100px'
}


class ProductList extends PureComponent {
	addToCart = (product) => {
		this.props.addToCart(product)
	}

	render(){
			return(
			<>	
				<Link to='/mycart'>
					<div className="w-25 text-center font-weight-bold text-white" style={cartStyle}>
						<i className="fa fa-shopping-cart" ></i><br />
						<p style={{fontSize: '14px'}}>{ this.props.cart.length }</p>
					</div>
				</Link>
				<div className="row">
					{
						this.context.data.map(product => 
							<Product key={product.id} product={product} add = {this.addToCart}  customStyle={"col-sm-4"} displayB={true}/>
						)
					}
				</div>
			</>
			)
	}	
}


ProductList.contextType = ProductContext
//important to resolve ambiguity of many contexts else react will just ignore

const mapStateToProps = (state) => {
	return {
		cart: state.cart
	}
}
const mapDispatchToProps = (d) => {
	return {
		addToCart : (data) => d(addData(data))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductList)