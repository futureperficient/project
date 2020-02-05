
myApp.factory('authService' , ['$window' , ($window)=>{

	let authToken = {};

	
    let store = $window.localStorage;
    let key = 'auth-token';



      
    authToken.isLoggedIn = ()=> {
        
        if (authToken.getToken()) {
            return true; 
        } else {
            return false; 
        }
    };
    
	authToken.getToken = ()=>{
		
		return store.getItem(key);
	}
	
    
	authToken.setToken = (token)=>{
		if(token){
			store.setItem(key, token);
		}else{
			store.removeItem(key);
		}
	}
	
	return authToken;

	
}]);