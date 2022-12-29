/** @format */

import { useContext, useEffect } from 'react';
import { UserAuthContext } from '../context/userAuthContext';
import { useNavigate } from 'react-router-dom';
const useRedirect = () => {
	const {authenticated} = useContext(UserAuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!authenticated) {
			return navigate('/');
		}
		if (authenticated && window.location.pathname === '/') {
			return (window.location.href = '/dashboard');
		}
	}, [authenticated, navigate]);
};

export default useRedirect;
