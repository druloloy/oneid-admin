import {useState, useContext} from 'react';
import UserService from "../../services/UserService";
import { UserAuthContext } from '../../context/userAuthContext';
import { useNavigate } from 'react-router-dom';
import useRedirect from '../../effects/useRedirect';
import "./login.scss";
import Logo from '../../assets/logo/compressed/oneid_256x256.png'

function Login(){
    document.title = "Login";
    const {_, dispatch} = useContext(UserAuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useRedirect();

    const handleSubmit = (e) => {
        e.preventDefault();
        UserService.loginUser(username, password).then((res) => {
            dispatch({type: "AUTHENTICATED"});  
            navigate("/dashboard");  
        });
    }

    return(
        <div className="login-container">
            <div className="login">
                <img src={Logo} alt="logo" loading="lazy"/>
                <h1>OneID Health Card System</h1>
                <h2>Admin</h2>

                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" onChange={e=>setUsername(e.target.value)}/>
                    <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
                    <button className="loginButton">Login</button>
                </form>
            </div>
        </div>
        
    );
}
export default Login