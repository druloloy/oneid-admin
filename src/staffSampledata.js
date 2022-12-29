export const userColumns = [
    { field: 'id',
     headerName: 'ID',
      width: 230 
    },
    { field: 'role',
     headerName: 'Role',
      width: 60 
    },
    { field: 'username',
      headerName: 'Username',
      width: 150
    },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
    },
    {
      field: 'age',
      headerName: 'Age',
      width: 60,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 110,
        renderCell:(params) => {
            return(
                <div className={`cellWithStatus ${params.row.status}`}>{params.row.status}</div>
            )
        },
      },
  ];

export const userRows=[
    { 
        id: 1, 
        position:'Doctor',
        lastName: 'Sample', 
        firstName: 'Name', 
        age: 35,
        status:'Online' 
    },
    { 
        id: 2, 
        position:'Nurse',
        lastName: 'Sample', 
        firstName: 'Name', 
        age: 35,
        status:'Online' 
    },
    { 
        id: 3, 
        position:'Health Worker',
        lastName: 'Tehans', 
        firstName: 'Meri', 
        age: 35,
        status:'Offline' 
    }     
]