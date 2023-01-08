import "./single.scss";
import Sidebar from '../../components/sidebar/Sidebar'
import CallIcon from '@mui/icons-material/Call';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeIcon from '@mui/icons-material/Home';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import WorkIcon from '@mui/icons-material/Work';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import moment from "moment/moment";
import { useParams } from "react-router-dom";
import UpdateForm from "./Edit/UpdateForm";
import useRedirect from "../../effects/useRedirect";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import HeightIcon from '@mui/icons-material/Height';
import ScaleIcon from '@mui/icons-material/Scale';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

const staffDataModel = [
    {
        type: 'login',
        name: 'username',
        title: 'Username',
        value: '',
        icon: <AlternateEmailIcon className="left" />,
        updateable: false
    },
    {
        type: 'login',
        name: 'password',
        title: 'Password',
        value: '**********',
        icon: <LockIcon className="left" />,
        updateable: true
    },
    {
        type: 'login',
        name: 'role',
        title: 'Role',
        value: '',
        icon: <WorkIcon className="left" />,
        updateable: false
    },
    {
        type: 'details',
        name: 'mobileNumber',
        title: 'Mobile Number',
        value: '',
        icon: <CallIcon className="left" />,
        updateable: true
    },
    {
        type: 'details',
        name: 'birthdate',
        title: 'Birthdate',
        value: '',
        icon: <CalendarMonthIcon className="left" />,
        updateable: true
    },
    {
        type: 'details',
        name: 'address',
        title: 'Address',
        value: '',
        icon: <HomeIcon className="left" />,
        updateable: true
    },
]

const patientDataModel = [
    {
        type: 'login',
        name: 'mobileNumber',
        title: 'Mobile Number',
        value: '',
        icon: <CallIcon className="left" />,
        updateable: true
    },
    {
        type: 'password',
        name: 'password',
        title: 'Password',
        value: '**********',
        icon: <LockIcon className="left" />,
        updateable: true
    },
    {
        type: 'details',
        name: 'birthdate',
        title: 'Birthdate',
        value: '',
        icon: <CalendarMonthIcon className="left" />,
        updateable: true
    },
    {
        type: 'details',
        name: 'address',
        title: 'Address',
        value: '',
        icon: <HomeIcon className="left" />,
        updateable: true
    },
    {
        type: 'details',
        name: 'sex',
        title: 'Sex',
        value: '',
        icon: <MaleIcon className="left" />,
        updateable: false
    },
    {
        type: 'medical',
        name: 'bloodGroup',
        title: 'Blood Group',
        value: '',
        icon: <BloodtypeIcon className="left" />,
        updateable: false
    },
    {
        type: 'medical',
        name: 'height',
        title: 'Height',
        value: '',
        icon: <HeightIcon className="left" />,
        updateable: false
    },
    {
        type: 'medical',
        name: 'weight',
        title: 'Weight',
        value: '',
        icon: <ScaleIcon className="left" />,
        updateable: false
    },
    {
        type: 'medical',
        name: 'allergies',
        title: 'Allergies',
        value: '',
        icon: <MedicalInformationIcon className="left" />,
        updateable: false
    }
]

function Single({type}){
    document.title = type === 'patient' ? 'Patient' : 'Staff';
    const [data, setData] = useState({});
    const [formData, setFormData] = useState(type==='patient' ? patientDataModel : staffDataModel);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [updateData, setUpdateData] = useState({});

    const {id} = useParams();
    // useRedirect();

    const loadFormData = (values) => {
        setFormData((prev) => {
            return prev.map((data) => {
                if(data.name === 'username'){
                    data.value = values.username;
                }
                if(data.name === 'role'){
                    data.value = values?.role;
                }
                if(data.name === 'mobileNumber'){
                    data.value = values?.mobileNumber || 'N/A';
                }
                if(data.name === 'birthdate'){
                    data.value = values?.birthdate || 'N/A';
                }
                if(data.name === 'address'){
                    data.value = values?.address || 'N/A';
                }
                if(data.name === 'sex'){
                    data.icon = values?.sex === 'Female' ? <FemaleIcon className="left" /> : <MaleIcon className="left" />;
                    data.value = values?.sex || 'N/A';
                }
                if(data.name === 'bloodGroup'){
                    data.value = values?.bloodGroup || 'N/A';
                }
                if(data.name === 'height'){
                    data.value = values?.height || 'N/A';
                }
                if(data.name === 'weight'){
                    data.value = values?.weight || 'N/A';
                }
                if(data.name === 'allergies'){
                    data.value = values?.allergies || 'N/A';
                }
                return data;
            });
        });
    }

    const openUpdateForm = (index) => {
        setUpdateData({});
        setShowUpdateForm(true);
        const d = {
            [formData[index].name]: formData[index].value 
        }
        console.log(d);
        setUpdateData(d);
    }

    const updateName = () => {
        setUpdateData({});
        setShowUpdateForm(true);
        setUpdateData({name:''});
    }

    const closeUpdateForm = () => {
        setShowUpdateForm(false);
        setUpdateData({});
    }

    const deleteAccount = async () => {
        if(window.confirm('Are you sure you want to permanently delete this account?')){
            if(type==='patient'){
                await UserService.deletePatient(id).then((res) => {
                    alert("Account deleted permanently!");
                    window.location.href = '/patient';
                });
            }

            if(type==='staff'){
                await UserService.deleteStaff(id).then((res) => {
                    alert("Account deleted permanently!");
                    window.location.href = '/staff';
                });
            }
        }
    }

    useEffect(() => {
        if(type === 'staff'){
            UserService.getStaff(id).then((res) => {
                let {login, details} = res.content;
    
                if(!details){
                    details = {
                    };
                }
    
                const address = addressJoiner(details.address.houseNumber, details.address.street, details.address.barangay, details.address.city);
                setData(res.content);
                const role = login.role === 'phys' ? 'Physician' : 'Staff';            
                const values = {
                    username: login.username,
                    role: role,
                    mobileNumber: login.mobileNumber,
                    birthdate: formatDate(details?.birthdate),
                    address,
                }
                loadFormData(values);
            })
        }
        
        if(type==='patient'){
            UserService.getPatient(id).then((res) => {
                let {login, details, medical} = res.content;

                if(!details){
                    details = {
                    };
                }
    
                const address = addressJoiner(details.address.houseNumber, details.address.street, details.address.barangay, details.address.city);
                setData(res.content);
                const values = {
                    mobileNumber: login?.mobileNumber || '',
                    birthdate: formatDate(details?.birthdate) || '',
                    address,
                    sex: titleCase(details?.sex) || '',
                    bloodGroup: medical?.bloodGroup || '',
                    height: heightCmToFeet(medical?.height) || '',
                    weight: medical?.weight || '',
                    allergies: medical?.allergies.join(', ') || ''
                }
                loadFormData(values);
            })
        }       

        return () => {
            setData({});
        }
    }, [id, type]);

    return(
        <div>
           <div className="main">
            <Sidebar/>
                <div className="profile">
                    <div className="profile-card">
                        <div className="header">
                            <div className="left">
                                <h2>{
                                    data?.details ? `${nameJoiner(data?.details?.firstName, data?.details?.middleName, data?.details?.lastName, data?.details?.suffix)}, ${getAge(data?.details?.birthdate)}` : ''
                                }
                                </h2>
                            </div>
                            <div className="right">
                                <button className="btn btn-edit" onClick={()=>updateName()}>
                                    Edit Name
                                </button>
                                <button onClick={()=>deleteAccount()} className="btn btn-delete">
                                    Delete Permanently
                                </button>
                            </div>
                        </div>

                        <div className="body">
                            <div className="card-container">
                                {
                                    formData && formData.map((data, i) => {
                                        return (
                                            <div key={i} className="card">
                                                <div className="content">
                                                    {data.icon}
                                                    <div className="right">
                                                        <p className="card-title">{data.title}</p>
                                                        <h2 className="card-value">{data.value}</h2>
                                                    </div>
                                                </div>
                                                {
                                                    data.updateable && (
                                                    <div className="action" onClick={()=>openUpdateForm(i)}>
                                                        <EditIcon className="icon" />
                                                        <p>Edit</p>
                                                    </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <UpdateForm 
                        isOpen={showUpdateForm} 
                        data={data} 
                        updateData={updateData} 
                        close={closeUpdateForm} 
                        type={type}/>
                </div>
           </div>
        </div>
        
    );
}


const nameJoiner = (firstName, middleName, lastName, suffix) => {
    let name = firstName || '';
    if(middleName){
        name += " " + middleName;
    }
    if(lastName){
        name += " " + lastName;
    }
    if(suffix){
        name += " " + suffix;
    }
    return name;
}

const addressJoiner = (houseNumber, street, barangay, city) => {
    let address = houseNumber;
    if(street){
        address += " " + street;
    }
    if(barangay){
        address += " " + barangay;
    }
    if(city){
        address += " " + city;
    }
    return address;
}

const getAge = (birthdate) => {
    if(!birthdate){ return ''; }
    return moment().diff(birthdate, 'years');
}

const formatDate = (date) => {
    if(!date){ return 'N/A'; }
    return moment(date).format('MMMM Do, YYYY');
}

const heightCmToFeet = (height) => {
    // return example 5'7
    if(!height){ return 'N/A'; }
    const feet = Math.floor(height / 30.48);
    const inches = Math.round((height % 30.48) / 2.54);
    return `${feet}'${inches}`;
}

const titleCase = (str) => {
    if(!str){ return ''; }
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export default Single