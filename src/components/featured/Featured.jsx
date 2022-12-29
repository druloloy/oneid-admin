import "./featured.scss"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { /*KeyboardArrowDownOutlined,*/ KeyboardArrowUpOutlined } from "@mui/icons-material";
import moment from "moment/moment";
function Featured({type, counter, percentage, range}) {
    

   const value = percentage(counter);
    const date = {
        start: moment.utc(new Date(range.start)).format("MMM DD, YYYY"),
        end: moment.utc(new Date(range.end)).format("MMM DD, YYYY")
    }

    return(
        <div className="featured">
           <div className="top">
                <h1 className="title">Top Disease</h1>
                {/* <MoreVertIcon fontSize="small"/> */}
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar value={value} text={value+'%'} strokeWidth={5}/>
                </div>
                <p className="title">{type.toUpperCase()} CASES</p>
                <p className="amount">{counter}</p>
                <p className="desc">This data shows the top trending diseases from {date.start} to {date.end}.</p>
            </div>
        </div>
    );
}

export default Featured