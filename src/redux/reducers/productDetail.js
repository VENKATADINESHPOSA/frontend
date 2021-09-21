
const initailState = {
    
    product: []
}

export default function(state = initailState , action){
 
    switch(action.type){
        case 'SHOW_PRODUCT':
        return {
            ...state , 
            product : {
                ...action.payload
            }
        }


        break;  
       
    }
    return state 
}