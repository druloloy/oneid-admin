/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import SVG from '../../assets/misc/undraw_void_-3-ggu.svg';
import './page404.scss';
function Page404() {
	return (
		<div className="container">
			<div className="content">
				<img src={SVG} alt="404" />
				<div className="text">
					<h1 className="text-2xl text-primary-900">
						Oops! You may want to go back{' '}
						<Link
							to="/"
							className="link">
							Home
						</Link>
						
					</h1>
				</div>
			</div>
		</div>
	);
}

export default Page404;
