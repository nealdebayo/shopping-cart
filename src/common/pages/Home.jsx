/* eslint-disable react/prefer-stateless-function */

import React, {PureComponent, Fragment} from 'react'
import {FormattedMessage} from 'react-intl'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ProductList from './../components/ProductList'
import {ProductContext} from './../contexts/ProductContext'

class Home extends PureComponent {
	constructor(props){
		super(props)
	}

	render () {
		return (
			<>
			<ProductContext.Provider value={this.props.products}>
				<ProductList />
			</ProductContext.Provider><br /><br />
			</>
		)
	}

}

const mapStateToProps = (state) => {
	return {
		products: state.products
	}
}


export default connect(mapStateToProps)(Home)
