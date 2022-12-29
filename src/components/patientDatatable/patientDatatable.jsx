import "./datatable.scss"
import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import {userColumns} from '../../patientSampledata';
import {Link} from 'react-router-dom'
import UserService from "../../services/UserService";
import moment from "moment";


const PatientDatatable = () => {
    const [data, setData] = useState([])
    const [limit, setLimit] = useState(9);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
      UserService.getPatients(limit, offset).then((res) => {
        const content = res.content;
        console.log(content);
        setData([
          ...content.map(d=>{
            return {
                id: d._id,
                firstName: d.details?.firstName ?? "---",
                lastName: d.details?.lastName ?? "---",
                age: getAge(d.details?.birthdate) ?? "---",
                status: d.accountCompleted ? "Completed" : "Incomplete",
            }
          })
        ]);
      });
  }, [])

    const handleDelete = async (id) => {
      if(window.confirm('Are you sure you want to permanently delete this account?')){
        await UserService.deletePatient(id).then((res) => {
            alert("Account deleted permanently!");
            setData(data.filter(item=>item.id !==id))
        });
      }
      
    };
    const actionColumn =[{field:"action", headerName: "Action", width: 200, renderCell:(params)=>{
        return(
            <div className="cellAction">
               <Link to={
                `/patient/${params.row.id}`
               } style={{textDecoration: "none"}}>
                  <div className="viewButton">View</div>
                </Link>
                <div className="deleteButton" onClick={()=>handleDelete(params.row.id)}>Delete</div>
            </div>
        )
    }}];

  return (
    <div className="datatable">
          <div className="datatableTitle">
            Patients
            <Link to="/patient/new" className="link">
              Add New
            </Link>
        </div>
         <DataGrid
         className="datagrid"
            rows={data}
            // columns={userColumns}
            columns={userColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
         />
    </div>
  )
}
const getAge = (birthdate) => {
  if (!birthdate) return null;
  return moment().diff(birthdate, 'years');
}
export default PatientDatatable