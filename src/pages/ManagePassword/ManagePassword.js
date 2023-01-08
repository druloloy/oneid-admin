import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import UserService from '../../services/UserService'
import './managePassword.scss'
function ManagePassword() {
document.title = 'Manage Password'
  const [showOldPassword, setShowOldPassword] = React.useState(false)
  const [showNewPassword, setShowNewPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

  const [oldPassword, setOldPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    const data = {
        oldPassword,
        newPassword
    };

    UserService.updateAdminPassword(data).then(res => {
        alert("Password updated successfully");
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    })
    .catch(err => {
        alert("Something went wrong");
    });
  }

  return (
    <div className='main'>
        <Sidebar />
        <div className='manage-password'>
            <h2>Manage Admin Password</h2>

            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="oldPassword">Old Password</label>
                    <div className='input-container'>
                        <input 
                            type={
                                showOldPassword ? 'text' : 'password'
                            } 
                            placeholder='Old Password' 
                            value={oldPassword}
                            onChange={e => setOldPassword(e.target.value)}
                        />
                        <button className='show-password'
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        >{
                            showOldPassword ? 'Hide' : 'Show'
                        }</button>
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor="newPassword">New Password</label>
                    <div className='input-container'>
                        <input 
                            type={
                                showNewPassword ? 'text' : 'password'
                            } 
                            placeholder='New Password'
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                        />
                        <button className='show-password'
                        onClick={()=>setShowNewPassword(!showNewPassword)}>{
                            showNewPassword ? 'Hide' : 'Show'
                        }</button>
                    </div>
                    <small>Must be at least 12 characters long</small>
                </div>
                <div className='form-group'>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className='input-container'>
                        <input 
                            type={
                                showConfirmPassword ? 'text' : 'password'
                            } 
                            placeholder='Confirm Password' 
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                        <button className='show-password' 
                        onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>{
                            showConfirmPassword ? 'Hide' : 'Show'
                        }</button>
                    </div>
                </div>

                <button type='submit'>Change Password</button>
            </form>
        </div>
    </div>
  )
}

export default ManagePassword