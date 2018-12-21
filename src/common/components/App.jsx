
/* eslint-disable react/forbid-component-props */

import React, {Fragment, PureComponent} from 'react'
import PropTypes from 'prop-types'
import {renderRoutes} from 'react-router-config'
import {Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl'
import {withRouter} from 'react-router'
import {Helmet} from "react-helmet";
import './../../../node_modules/bootstrap/dist/css/bootstrap.css'
import './../../../node_modules/font-awesome/css/font-awesome.css'



class App extends PureComponent {

	static propTypes = {
		route: PropTypes.object.isRequired,
		loaded: PropTypes.bool.isRequired,
		//match: PropTypes.object.isRequired, // comes from withRouter, unused
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	}

	constructor (props) {
		super(props)
		this.listener = null
		this.state = {loaded: props.loaded}
	}

	componentDidMount () {

		this.listener = this.props.history.listen(location => {
			if (location.pathname !== this.props.location.pathname) {
				this.setState({loaded: false})
			}
		})
	}

	componentWillUnmount () {
		this.listener()
	}

	render () {
		return (
			<Fragment>
				<Helmet>
		            <meta charSet="utf-8" />
		            <title>MostG Shopping Cart</title>
		        </Helmet>
				<nav className="navbar bg-primary text-white" style={{height: '150px'}}>
					<div className="text-center w-100">
						<font className="font-weight-bold" style={{fontSize: '20px'}}><FormattedMessage id = "MOSTG" /></font>
						<br />
						Feel free to add any mock item to your wishlist (can only add an item)
					</div>
				</nav>
				<br/>
				<main className="container">
					<div className="row">
						<div className="col-sm-12">
							{renderRoutes(this.props.route.routes, {loaded: this.state.loaded})}
						</div>
					</div>
				</main>
			</Fragment>
		)
	}
}

export default withRouter(App)
