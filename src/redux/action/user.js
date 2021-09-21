
export const updateUserData = (userData) =>{
	console.log(userData);
	return {
		type: 'LOGIN_SUCCESS',
		payload: userData,
		isLoggedIn: true,
	}
}