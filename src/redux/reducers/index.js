
import user from './user';
import cartDetail from './cartDetail';
import productDetail from './productDetail';
import cartItemVal from './cartItemVal';
import {createStore, combineReducers} from 'redux';

let reducer = combineReducers({
	user,
	cartDetail,
	productDetail,
	cartItemVal
})

export default reducer
