
const initailState = {
    cart: []
}

export default function(state = initailState , action){
    let cartItems
    switch(action.type){
        case 'ADD_ITEM':
        cartItems = [
            ...state.cart,
            action.payload
        ]
        window.localStorage.setItem('cartItems', JSON.stringify(cartItems))
        return {
            ...state,
            cart: cartItems
        }
        break;
        case 'UPDATE_ITEM':
        cartItems = state.cart.map(item => item.itemcode === action.payload.itemcode ? action.payload.itemData : item)
        console.log(cartItems)
        window.localStorage.setItem('cartItems', JSON.stringify(cartItems))
        return {
            ...state,
            cart: cartItems
        }
        break;

        case 'REMOVE_ITEM':
        cartItems = action.payload.cartData
        console.log(cartItems)
        window.localStorage.setItem('cartItems', JSON.stringify(cartItems))
         return {
            ...state,
            cart: cartItems
        }
       /* cartItems = [
            ...state.cart,
            action.payload
        ]*/
        /*window.localStorage.setItem('cartItems', JSON.stringify(cartItems))
        return {
            ...state,
            cart: cartItems
        }*/
        break;
    }
    return state 
}