
/* eslint-disable react/no-unsafe */

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export default function ({loader, actions = [], Placeholder}) {

	if (!loader) {
		throw new Error('loader required!')
	}

	let Component = null

	class AsyncComponent extends React.Component {

		static defaultProps = {
			loaded: false
		}

		static propTypes = {
			loaded: PropTypes.bool,
			dispatch: PropTypes.func.isRequired
		}

		static get component () {
			return loader().then(component => Component = component.default || component)
		}

		static get actions () {
			return actions
		}

		constructor (props) {
			super(props)
			this.update = this.update.bind(this)
			this.state = {Component}
		}

		// todo - maybe r17 makes this less of a pain to get going
		UNSAFE_componentWillMount () {
			AsyncComponent.component.then(this.update)
		}

		componentDidMount () {

			// if we already loaded from server context, ignore.
			if (this.props.loaded) {
				return
			}

			// todo - this fires actions every time the component is mounted even if unnecessary
			// figure a way to check if data loaded (i.e. from ssr, previous visit) and don't fire actions
			// this might warrant some route config (i.e., might want to ALWAYS fire actions; this feature isn't just for loading data)
			actions.forEach(action => this.props.dispatch(action()))
		}

		update () {
			if (this.state.Component !== Component) {
				this.setState({Component})
			}
		}

		render () {
			const {Component: ComponentFromState} = this.state

			if (ComponentFromState) {
				return <ComponentFromState {...this.props} />
			}

			if (Placeholder) {
				return <Placeholder {...this.props} />
			}

			return null
		}

	}

	return connect()(AsyncComponent)

}
