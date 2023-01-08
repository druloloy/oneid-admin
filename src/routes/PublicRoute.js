/** @format */

import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserAuthContext } from '../context/userAuthContext';
function PublicRoute() {
	const { authenticated } = useContext(UserAuthContext);
	return !authenticated ? <Outlet /> : <Navigate to="/dashboard" />;
}

export default PublicRoute;
