import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Datatable from "../../components/patientDatatable/patientDatatable";

function PatientList(){
    document.title = "Patients | OneID";
    return(
        <div className="list">
            <Sidebar/>
            <div className="listContainer">
                <Datatable/>
            </div>
        </div>
    );
}
export default PatientList;