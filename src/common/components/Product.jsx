import React,{Fragment} from 'react'

const circularDivWrap = {
    overflow: "hidden",
	borderRadius: '50%',	
}

const imageStyle = {
	width: '200px',
	maxWidth: '100%'
}

const Product = (props) => {
	const TheButton = () => {
		if (props.displayB) {
			return (
				<button className="btn btn-primary" onClick={() => props.add(props.product)}>Add To WishList</button>
				)
		}
		return (
			<>
				<button className="btn btn-primary" onClick={() => props.remove(props.product)}>Remove From WishList</button>
			</>
			)
	}
	//always use uppercase to start functional or stateful components
	return(
		<>
		<div className={ `${props.customStyle} text-center`}>
			<div style={circularDivWrap}>
			<img src={props.product.image} style={imageStyle} alt={props.product.name} className='m-2'/>
			</div>
			<p className="font-weight-bold text-uppercase">{props.product.product}</p>
			<TheButton />
		</div>
		</>
		)
}

export default Product