import axios from 'axios';


export const login = async info => {
	try{
		//console.log(info)
	    const response = await axios('http://api.store.zwz.co.in/authentication/token/',
	        {
	            method: 'POST',
	            headers: {
	                Accept: 'application/json',
	                'Content-Type': 'application/json',
	            },
	            data:{
	            	'login_type': "zwz",
	                'username':info.username,
	                'password':info.password,
	            }
	        });
	    return response.data
	}catch(error) {
		console.log(error)
		return {
			error
		}
	}
}

export const loginNod = async info => {
	try{
		//console.log(info)
	    const response = await axios('http://api.store.nodbearings.net/authentication/token/',
	        {
	            method: 'POST',
	            headers: {
	                Accept: 'application/json',
	                'Content-Type': 'application/json',
	            },
	            data:{
	            	'login_type': "zwz",
	                'username':info.username,
	                'password':info.password,
	            }
	        });
	    return response.data
	}catch(error) {
		console.log(error)
		return {
			error
		}
	}
}


export const register = async info => {
	try{
		//console.log(info)
	    const response = await axios(info.url,
	        {
	            method: 'POST',
	            headers: {
	                Accept: 'application/json',
	                'Content-Type': 'application/json',
	            },
	            data:{
					
					"title" : info.title,
					"first_name" : info.firstname,
					"last_name" : info.lastname,
					"email" : info.email,
					"password" :info.password,
					"name_of_company": info.name_of_company,
					"designation":info.designation
	            }
	        });
			
	    return response.data
	}catch(error) {
		console.log(error)
		return {
			error
		}
	}
}




/*export const mobileverfication = async info => {
	try{
		console.log(info)
	    const response = await axios('http://api.store.zwz.co.in/authentication/mobile/otp_sent/',
	        {
	            method: 'POST',
	            headers: {
	                Accept: 'application/json',
	                'Content-Type': 'application/json',
					'Authorization' : 'Token ' + sessionStorage.getItem('auth_key'),
	            },
	            data:{
	            	"mobile":info.mobile,
	            }
	        });
	    return response.data
		console.log(response);
	}catch(error) {
		console.log(error)
		return {
			error
		}
	}
}

/*export const otpverification_ajax_call = async datastring => {
		await axios(
					datastring.url,
					{
						method: 'POST',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
						},
						data: datastring
					});
					
	//	return response;
		
	} 

 */