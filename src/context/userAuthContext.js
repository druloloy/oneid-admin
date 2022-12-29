import {createContext, useReducer} from 'react'
import userAuthReducer from './userAuthReducer';
const INITIAL_STATE = {
    authenticated: localStorage.getItem('auth') || false
};

export const UserAuthContext = createContext(INITIAL_STATE);

export const UserAuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(userAuthReducer, INITIAL_STATE);
    return(
        <UserAuthContext.Provider value={{authenticated: state.authenticated, dispatch}}>
            {children}
        </UserAuthContext.Provider>
    )
}
