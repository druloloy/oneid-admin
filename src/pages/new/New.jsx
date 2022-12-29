import "./new.scss";
import Sidebar from '../../components/sidebar/Sidebar'
import  DriveFolderUploadOutlinedIcon  from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import UserService from "../../services/UserService";
import useRedirect from "../../effects/useRedirect";

const New = ({inputs,title}) => {
    useRedirect();
    
    const [details, setDetails] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        suffix: "",
        mobileNumber: "",
        birthdate: "",
        houseNumber: "",
        street: "",
        barangay: "",
        city: "",
        username: "",
        password: "",
        role: "staff"
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const d = {
            ...details,
            address: {
                houseNumber: details.houseNumber,
                street: details.street,
                barangay: details.barangay,
                city: details.city
            }
        }
        UserService.addStaff(d).then((res) => {
            alert(res.message);
        })
    }

    return(
        <div className="new">
           <Sidebar />
           <div className="newContainer">
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">

                    <div className="right">
                        <form onSubmit={handleSubmit}>
                            {inputs.map((section, i) => {
                                return (
                                    <div key={i} className="subsection">
                                        {
                                            section.map((input, i) => {
                                                return input.type !== 'select' ? (
                                                    (
                                                        <div className="input">
                                                            <label>{input.label}</label>
                                                            <input type={input.type} 
                                                                placeholder={input.placeholder}
                                                                value={details[input.name]}
                                                                onChange={(e) => setDetails({...details, [input.name]: e.target.value})} 
                                                                required={input.required}/>
                                                        </div>
                                                    ) 
                                                )   :
                                                    (
                                                        <div className="input">
                                                            <label>{input.label}</label>
                                                            <select 
                                                                name={input.name} 
                                                                id={input.name} 
                                                                value={details[input.name]}
                                                                onChange={(e) => setDetails({...details, [input.name]: e.target.value})}
                                                                required={input.required}>
                                                                {
                                                                    input.options.map((option, i) => {
                                                                        return (
                                                                            <option key={i} value={option.value}>{option.label}</option>
                                                                        )
                                                                    }
                                                                    )
                                                                }
                                                            </select>
                                                        </div>
                                                    )
                                            })
                                        }
                                    </div>
                                )
                            })}
                          
                                
                            <button>Submit</button>
                        </form>
                    </div>
                </div>
           </div>
        </div>
        
    );
}
export default New