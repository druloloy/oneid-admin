import React from 'react'
import { useNavigate } from 'react-router-dom';
import UserService from '../../../services/UserService';
import './index.scss';

function UpdateForm({data, updateData, isOpen, close, type}) {

  const [singleValue, setSingleValue] = React.useState('');
  const [multipleValue, setMultipleValue] = React.useState({});
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    setSingleValue('');
    setMultipleValue({});
  },[updateData])

  const submit = async (e, multiple) => {
    e.preventDefault();
    let d = !multiple ? singleValue : multipleValue;

    const body = {
      [Object.keys(updateData)[0]]: d
    }

    if(type === 'staff'){
      await UserService.updateStaff(data.login._id, body).then((res) => {
        close();
        if(!window.confirm('Updated successfully! Continue editing?')){
          navigate('/staff');
        }
        // re-render the page
        window.location.reload();
      });
    }

    if(type === 'patient'){
      await UserService.updatePatient(data.id, body).then((res) => {
        close();
        if(!window.confirm('Updated successfully! Continue editing?')){
          navigate('/patient');
        }
        // re-render the page
        window.location.reload();
      });
    }
  }

  const togglePassword = () => {
    setShowPassword(!showPassword);
  }

  return isOpen && (
      <form className="update-form-container" onSubmit={(e)=>submit(e, form[Object.keys(updateData)[0]].multiple)}>
        <h2>Update {form[Object.keys(updateData)[0]].title}</h2>

        <div className="update-form">
          {
            form[Object.keys(updateData)[0]].multiple ? (
              <div className="multiple">
                {
                  Object.keys(form[Object.keys(updateData)[0]].sub).map((key, index) => (
                    <div className="input-container" key={index}>
                      <label>{form[Object.keys(updateData)[0]].sub[key].title}</label>
                      {
                        form[Object.keys(updateData)[0]].sub[key].type !== 'select' ? (
                          <input 
                            type={form[Object.keys(updateData)[0]].sub[key].type} 
                            placeholder={form[Object.keys(updateData)[0]].sub[key].title} 
                            value={multipleValue[key]} 
                            onChange={(e) => setMultipleValue({...multipleValue, [key]: e.target.value})} 
                            required={form[Object.keys(updateData)[0]].sub[key].required}
                          />
                        ) :
                        (
                          <select 
                            value={multipleValue[key]} 
                            onChange={(e) => setMultipleValue({...multipleValue, [key]: e.target.value})}
                            required={form[Object.keys(updateData)[0]].sub[key].required}>
                            {
                              form[Object.keys(updateData)[0]].sub[key].options.map((option, i) => (
                                <option key={i} value={option.value}>{option.label}</option>
                              ))
                            }
                          </select>
                        ) 
                      }
                    </div>
                  ))
                }
              </div>
            ) : (
              <div className="single">
                {
                  form[Object.keys(updateData)[0]].type !== 'password' ? (
                    <div className="input-container">
                      <label>{form[Object.keys(updateData)[0]].title}</label>
                      <input 
                        type={form[Object.keys(updateData)[0]].type} 
                        value={singleValue} onChange={(e) => setSingleValue(e.target.value)} 
                        required={form[Object.keys(updateData)[0]].required} 
                      />
                    </div>
                  ) : (
                    <div className="input-container">
                      <label>{form[Object.keys(updateData)[0]].title}</label>
                      <input type={showPassword ? 'text' : 'password'} value={singleValue} onChange={(e) => setSingleValue(e.target.value)} />
                      <button onClick={() => togglePassword()}>Show</button>
                    </div>
                  )
                }
              </div>
            )  
          }
        </div>
        <div className="button-container">
          <button onClick={close}>Close</button>
          <button type="submit" className="submit">Update</button>
        </div>
       
      </form>
  )
}


const form = {
  password: {
    title: 'Password',
    type: 'password',
    multiple: false,
    required: true,
  },
  mobileNumber: {
    title: 'Mobile Number',
    type: 'text',
    multiple: false,
    required: true,
  },
  birthdate: {
    title: 'Birthdate',
    type: 'date',
    multiple: false,
    required: true,
  },
  address: {
    title: 'Address',
    type: 'text',
    multiple: true,
    sub: {
      houseNumber: {
        title: 'House Number',
        type: 'text',
        required: true,
      },
        street: {
        title: 'Street',
        type: 'text',
        required: true,
      },
      barangay: {
        title: 'Barangay',
        type: 'text',
        required: true,
      },

      city: {
        title: 'City',
        type: 'text',
        required: true,
      },
    }
  },
  name: {
    title: 'Name',
    type: 'text',
    multiple: true,
    sub: {
      firstName: {
        title: 'First Name',
        type: 'text',
        required: true,
      },
      middleName: {
        title: 'Middle Name',
        type: 'text',
        required:false,
      },
      lastName: {
        title: 'Last Name',
        type: 'text',
        required: true,
      },
      suffix: {
        title: 'Suffix',
        type: 'select',
        required: false,
        options: [
          {
            label: 'None',
            value: ''
          },
          {
            label: 'Jr.',
            value: 'Jr.'
          },
          {
            label: 'Sr.',
            value: 'Sr.'
          },
          {
            label: 'III',
            value: 'III'
          },
          {
            label: 'IV',
            value: 'IV'
          }
        ]
      },
    }
  }
}
export default UpdateForm