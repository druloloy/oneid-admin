import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import StaffDatatable from "../../components/staffDatatable/StaffDatatable";

function StaffList(){
    document.title = "Staffs | OneID";
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