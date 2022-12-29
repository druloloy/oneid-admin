import "./table.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



function List() {
    const rows = [
        { id: 1, name: 'Susan Doe', age: 35,username: 'susandoemapagmahal69',status:"Pending"},
        { id: 2, name: 'Jon Doe', age: 42 , username: 'bhozxc.john_doe20',status:"Pending"},
        { id: 3, name: 'San Doe', age: 45 ,username:'san_doe_jan01',status:"Pending"},
        { id: 4, name: 'Don Doe', age: 16 ,username:'DonDoe22',status:"Approved"},
        { id: 5, name: 'Doe Doe', age: 29, username:'DoeDoe25',status:"Approved"},
        { id: 6, name: 'Go Doe', age: 64 ,username:'GowDoe33',status:"Pending"},
        { id: 7, name: 'Ghe Doe', age: 44 ,username:'GheDoe99',status:"Approved"},
        { id: 8, name: 'Goku Doe', age: 36, username:'OPSupersayan01',status:"Pending"},
        { id: 9, name: 'Ge Doe', age: 65 ,username:'AnakniGheDoe01' ,status:"Approved"},
      ];

    return(
        <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Patient ID</TableCell>
              <TableCell className="tableCell">Name</TableCell>
              <TableCell className="tableCell">Age</TableCell>
              <TableCell className="tableCell">Username</TableCell>
              <TableCell className="tableCell">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{row.id}</TableCell>
                <TableCell className="tableCell">{row.name}</TableCell>
                <TableCell className="tableCell">{row.age}</TableCell>
                <TableCell className="tableCell">{row.username}</TableCell>
                <TableCell className="tableCell">
                    <span className={`status ${row.status}`}>{row.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        
    );
}

export default List;


