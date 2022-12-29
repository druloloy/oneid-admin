import React, { useContext } from "react";
import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import StorageIcon from '@mui/icons-material/Storage';
import SettingsIcon from '@mui/icons-material/Settings';
import BookIcon from '@mui/icons-material/Book';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Link} from 'react-router-dom'
import { DarkModeContext } from "../../context/darkModeContext";
import UserService from "../../services/UserService";
import { UserAuthContext } from "../../context/userAuthContext";
function Sidebar(){
    const { dispatch} = useContext(DarkModeContext);
    const { dispatch: userDispatch} = useContext(UserAuthContext); 
    const handleLogout = async () => {
        await UserService.logoutUser().then((res) => {
            userDispatch({type: "LOGGED_OFF"});
        })
    }
    return(
        <div className="sidebar">
            <div className="top">
                <Link to="/dashboard" style={{textDecoration: "none"}}>
                     <span className="logo">OneID Health Record</span>
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
                {/* <Link to="/staff" style={{textDecoration: "none"}}>
                    <li>
                        <AdminPanelSettingsIcon className="icon"/>
                        <span>Admins</span>
                    </li>
                </Link> */}
                <Link to="/patient" style={{textDecoration: "none"}}>
                    <li>
                        <PersonIcon className="icon"/>
                        <span>Patients</span>
                    </li>
                </Link>
                      <p className="title">SYSTEM</p>
                    <li>
                        <SettingsIcon className="icon"/>
                        <span>Settings</span>
                    </li>
                        <p className="title">Admin</p>
                    {/* <li>
                        <AccountCircleIcon className="icon"/>
                        <span>Profile</span>
                    </li> */}
                    <li>
                        <Link to="/" onClick={handleLogout} style={{textDecoration: "none"}}>
                            <LogoutIcon className="icon"/>
                            <span>Logout</span>
                        </Link>
                    </li>
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