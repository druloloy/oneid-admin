import axios from "axios";
import "./datatable.scss"
import { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import {userColumns} from '../../staffSampledata';
import {Link} from 'react-router-dom'
import UserService from "../../services/UserService";
import moment from "moment/moment";

const StaffDatatable = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        UserService.getStaffs().then((res) => {
          const content = res.content;
          setData([
            ...content.map(d=>{
              return {
                  id: d._id,
                  role: d.role,
                  username: d.username,
                  firstName: d.details?.firstName ?? "---",
                  lastName: d.details?.lastName ?? "---",
                  age: getAge(d.details?.birthdate) ?? "---",
                  status: d.accountCompleted ? "Completed" : "Incomplete",
              }
            })
          ]);
        });
    }, [])


    const handleDelete = (id) => {
      if(window.confirm('Are you sure you want to permanently delete this account?')){
          UserService.removeStaff(id).then((res) => {
            alert("Account deleted permanently!");
            setData(data.filter((item) => item.id !== id));
          });
        }
    };
    const actionColumn =[{field:"action", headerName: "Action", width: 200, renderCell:(params)=>{
        return(
            <div className="cellAction">
               <Link to={
                `/staff/${params.row.id}`
               } style={{textDecoration: "none"}} >
                  <div className="viewButton">View</div>
                </Link>
                <div className="deleteButton" onClick={()=>handleDelete(params.row.id)}>Delete</div>
            </div>
        )
    }}];

  return (
    <div className="datatable">
          <div className="datatableTitle">
            Staffs
            <Link to="/staff/new" className="link">
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
            checkboxSelection={false}
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
export default StaffDatatable;