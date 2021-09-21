
const initailState = {
    cartItemVal: null
}

export default function(state = initailState , action){
    var action_data = JSON.stringify(action.payload)
    console.log("switch_data"+action_data);
     /*console.log(action.type);*/
   /* let loginData*/
    switch(action.type){
        case 'CART_ADDED_DATA':
        return {
            ...state , 
            cartItemVal : action.payload
        }


        break;  
       
    }
    return state 
}