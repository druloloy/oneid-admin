import { useContext, useEffect } from 'react';
import { UserAuthContext } from '../context/userAuthContext';
import UserService from '../services/UserService';
const useVerifyToken = () => {
	const { dispatch } = useContext(UserAuthContext);
	useEffect(() => {
		UserService.me()
			.then((response) => {
				dispatch({
					type: 'AUTHENTICATED'
				});
			})
			.catch((error) => {
				dispatch({ type: 'LOGGED_OFF' });
			});
	}, [dispatch]);
};

export default useVerifyToken;