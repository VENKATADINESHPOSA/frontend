
export const addCartData = (cartData) =>{
	return {
		type: 'ADD_ITEM',
		payload: cartData
	}
}

export const updateCartData = (cartData) => {
	console.log(cartData)
	return {
		type: 'UPDATE_ITEM',
		payload: {
			itemcode: cartData.itemcode,
			itemData: cartData
		}
	}
}

export const removeCartData = (cartData) =>{
	return {
		type: 'REMOVE_ITEM',
		payload: {
			cartData
		}
	}
}

