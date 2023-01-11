import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import PatientList from './pages/patient/PatientList';
import StaffList from './pages/staff/StaffList';
import Single from './pages/single/Single';
import New from './pages/new/New';
import { staffInputs } from './formSources';
import "./style/app.scss"
import { DarkModeContext } from './context/darkModeContext';
import useVerifyToken from './effects/useVerifyToken'
import Schedule from './pages/schedule/Schedule';
import ManagePassword from './pages/ManagePassword/ManagePassword';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Page404 from './pages/404/Page404';
function App() {
  const {darkMode} = useContext(DarkModeContext)
  useVerifyToken();
  return (
    <div className={JSON.parse(darkMode) ? "app dark" : "app"}>
      <Router>
        <Routes path="/">

          <Route element={<PublicRoute />}>
            <Route exact index element={<Login/>}/>
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Home/>}/>

            <Route path="/staff" element={<StaffList/>}/>
            <Route path='/staff/:id' element={<Single type="staff" />}/>
            <Route path='/staff/new' element={<New inputs={staffInputs} title="Add New Staff"/>}/>

 
            <Route path="/patient" element={<PatientList/>}/>
            <Route path='/patient/:id' element={<Single type="patient" />}/>
            

            <Route path='/schedule' element={<Schedule />}/>
            <Route path='/managepassword' element={<ManagePassword />}/>
          </Route>

          <Route path="*" element={<Page404 />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
