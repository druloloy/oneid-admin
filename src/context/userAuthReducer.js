
const states = {
    AUTHENTICATED: {
        authenticated: true,
    },
    LOGGED_OFF: {
        authenticated: false
    }
}

const userAuthReducer = (state, action) => {
    switch (action.type) {
        case "AUTHENTICATED":{
            localStorage.setItem('auth', true);
            return states.AUTHENTICATED;
        }
            
        case "LOGGED_OFF":{
            localStorage.removeItem('auth');
            return states.LOGGED_OFF;
        }
            
        default:
            return state;
    }
}

export default userAuthReducer;