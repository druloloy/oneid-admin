export const userColumns = [
    { field: 'id', headerName: 'ID', width: 210 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: false,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: false,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: false,
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