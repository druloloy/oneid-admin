import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import StaffDatatable from "../../components/staffDatatable/StaffDatatable";
import useRedirect from "../../effects/useRedirect";

function StaffList(){
    document.title = "Staffs";
    // useRedirect();
    return(
        <div className="list">
            <Sidebar/>
            <div className="listContainer">
                <StaffDatatable/>
            </div>
        </div>
    );
}
export default StaffList;