import React, { useContext } from "react";
import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LockIcon from '@mui/icons-material/Lock';

import {Link, useNavigate} from 'react-router-dom'
import { DarkModeContext } from "../../context/darkModeContext";
import UserService from "../../services/UserService";
import { UserAuthContext } from "../../context/userAuthContext";
function Sidebar(){
    const navigate = useNavigate();
    const { dispatch} = useContext(DarkModeContext);
    const { dispatch: userDispatch} = useContext(UserAuthContext); 
    const handleLogout = async () => {
        await UserService.logoutUser().then((res) => {
            userDispatch({type: "LOGGED_OFF"});
            navigate("/");
        })
    }
    return(
        <div className="sidebar">
            <div className="top">
                <Link to="/dashboard" style={{textDecoration: "none"}}>
                     <span className="logo">OneID Health Card System</span>
                </Link>          
            </div>
            <hr/>
            <div className="center">
                <ul>
                       <p className="title">MAIN</p> 
                <Link to="/dashboard" style={{textDecoration: "none"}}>      
                    <li>
                        <DashboardIcon className="icon"/>
                        <span>Dashboard</span>
                    </li>
                </Link>
                    
                        <p className="title">ACCOUNTS</p>
                <Link to="/staff" style={{textDecoration: "none"}}>
                    <li>
                        <AdminPanelSettingsIcon className="icon"/>
                        <span>Staffs</span>
                    </li>
                </Link>
                <Link to="/patient" style={{textDecoration: "none"}}>
                    <li>
                        <PersonIcon className="icon"/>
                        <span>Patients</span>
                    </li>
                </Link>
                    <p className="title">SYSTEM</p>
                <Link to="/schedule" style={{textDecoration: "none"}}>
                    <li>
                        <ScheduleIcon className="icon"/>
                        <span>Schedule</span>
                    </li>
                </Link>
                <p className="title">Admin</p>
                    <Link to="/managepassword" style={{textDecoration: "none"}}>
                        <li>
                            <LockIcon className="icon"/>
                            <span>Manage Password</span>
                        </li>
                    </Link>
                     <div onClick={handleLogout} style={{textDecoration: "none"}}>
                        <li>
                            <LogoutIcon className="icon"/>
                            <span>Logout</span>
                        </li>
                    </div>
                </ul>
            </div>
            <div className="bottom">
                <div className="colorOption" onClick={()=> dispatch({type:"LIGHT"})}></div>
                <div className="colorOption" onClick={()=> dispatch({type:"DARK"})}></div>
            </div>
        </div>
    );
}

export default Sidebar;