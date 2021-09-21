
export const updateCartItemData = (cartItemData) =>{
	var cartItemDataVal =  JSON.stringify(cartItemData)
	console.log("updated value cart"+ cartItemDataVal );
	return {
		type: 'CART_ADDED_DATA',
		payload: cartItemData,
	}
}