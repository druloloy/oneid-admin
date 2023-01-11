import "./widgets.scss";
import SickOutlinedIcon from '@mui/icons-material/SickOutlined';
import { Link } from "react-router-dom";
function Widget({type, counter}){
    const data = {
        title:type.toUpperCase(),
        counter,
        link:<Link className='link' to="/patient">See All Patient</Link>,
        icon:<SickOutlinedIcon className="icon" style={{
            backgroundColor:"#f19292"
        }}/>,
    };
        
    return(
        <div className="widget">
            <div className="left">
              <span className="title">{data.title}</span>
              <span className="counter">{data.counter}</span>
              <span>{data.link}</span>
            </div>
                
            <div className="right">
                {data.icon}
            </div>
        </div>
    );
}

export default Widget;
//