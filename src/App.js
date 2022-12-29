import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import PatientList from './pages/patient/PatientList';
import StaffList from './pages/staff/StaffList';
import Single from './pages/single/Single';
import New from './pages/new/New';
import { staffInputs } from './formSources';
import "./style/dark.scss"
import { DarkModeContext } from './context/darkModeContext';
import useVerifyToken from './effects/useVerifyToken'
function App() {

  const {darkMode} = useContext(DarkModeContext)
  useVerifyToken();
  
  return (
    <div className={darkMode ? "app dark" : "app"}>
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Login/>}/>
          <Route path="dashboard" element={<Home/>}/>

          <Route path="staff">
            <Route index element={<StaffList/>}/>
            <Route path=':id' element={<Single type="staff" />}/>
            <Route path='new' element={<New inputs={staffInputs} title="Add New Staff"/>}/>
          </Route>

          <Route path="patient">
            <Route index element={<PatientList/>}/>
            <Route path=':id' element={<Single type="patient" />}/>
          </Route>
          {/* {
            authenticated && (
              <>
                <Route path="patient">
                  <Route index element={<PatientList/>}/>
                  {/* <Route path=':userId' element={<Single/>}/> */}
                  {/* <Route path='new' 
                    element={<New inputs={userInputs} title="Add New Patient"/>}
                  />
                </Route>

                <Route path="staff">
                  <Route index element={<StaffList/>}/>
                  <Route path=':id' element={<Single />}/>
                  <Route path='new'
                    element={<New inputs={staffInputs} title="Add New Staff"/>}
                  />
                </Route>
              </> */}
            )
          } */}
        </Route>
      </Routes>
    </Router>
  </div>
  );
}

export default App;
