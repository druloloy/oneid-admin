/** @format */

import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserAuthContext } from '../context/userAuthContext';
function PrivateRoute({children, ...rest}) {
	const { authenticated } = useContext(UserAuthContext);
	console.log(typeof authenticated)
	return authenticated ? (
		<Outlet />
	) : <Navigate to="/" />;
}

export default PrivateRoute;
