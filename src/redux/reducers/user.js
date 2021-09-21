
const initailState = {
    isLoggedIn: false,
    user: null
}

export default function(state = initailState , action){
    let loginData
    switch(action.type){
        case 'LOGIN_SUCCESS':
        window.localStorage.setItem('userData', action.payload)
        return {
            ...state , 
            isLoggedIn: true,
            user : {
                ...action.payload
            }
        }


        break;  
        case 'LOG_OUT':
        return {
            ...state,
            isLoggedIn: false,
            user: null
        }
        break;
    }
    return state 
}