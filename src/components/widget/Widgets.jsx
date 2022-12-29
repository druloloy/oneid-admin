import "./widgets.scss";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SickOutlinedIcon from '@mui/icons-material/SickOutlined';
import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import { Link } from "react-router-dom";
function Widget({type, counter}){
    const data = {
        title:type.toUpperCase(),
        counter,
        link:<Link className='link' to="patient">See All Patient</Link>,
        icon:<SickOutlinedIcon className="icon" style={{
            backgroundColor:"#f19292"
        }}/>,
        // isPositve:<KeyboardArrowUpIcon style={{
        //     color:"red"
        // }}/>,
        // percentage:"10%"
    };
        
    return(
        <div className="widget">
            <div className="left">
              <span className="title">{data.title}</span>
              <span className="counter">{data.counter}</span>
              <span>{data.link}</span>
            </div>
                
            <div className="right">
                {/* <div className="percentage">
                    {data.isPositve}
                    {data.percentage}
                </div> */}
                {data.icon}
            </div>
        </div>
    );
}

export default Widget;
//