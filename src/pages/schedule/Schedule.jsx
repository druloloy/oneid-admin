import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import './Schedule.scss'
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import Update from './Update/Update';
import Add from './Add/Add'
import UserService from '../../services/UserService';

function Schedule() {
  document.title = "Manage Schedules";
  const daysRef = React.useRef([]);
  const [open, setOpen] = React.useState(false);
  const [updateType , setUpdateType] = React.useState('monday');
  const [day, setDay] = React.useState('');
  const [data, setData] = React.useState([])
  const [addNew, setAddNew] = React.useState(false);
  const [availableDays, setAvailableDays] = React.useState([]);

  const openNewSchedule = () => {
    setAddNew(true);
    selectDay('', data.length);
  }

  const selectDay = (day, index) => {
    daysRef.current.forEach((d, i) => {
      if (i === index){
        d?.classList.add('active');
      }
      else{
        d?.classList.remove('active');
      }
    });
    setDay(day);
  }

  const closeModal = () => {
    setOpen(false);
    setUpdateType('');
  }

  const openModal = (type) => {
    setOpen(true);
    setUpdateType(type);
  }

  const deleteDay = async () => {
    const data = {
      day
    }
    if(window.confirm("Are you sure you want to delete this schedule?")){
      await UserService.removeSchedule(data).then((res) => {
        alert("Schedule deleted!");
        setData(d=>{
          console.log("data", d.filter(item=>item.day !== day));
          return d.filter(item=>item.day !== day)
        });
        
      }).catch((err) => {
        alert("Something went wrong while deleting schedule.");
      });
    }
  }

  const fetchSchedule = async () => {
    await UserService.getAllSchedule().then((res) => {
      const content = res.content;
      setData([
        ...content.map(d=>{
          return {
            id: d.id,
            day: d.day,
            startTime: d.startTime,
            endTime: d.endTime,
            activities: d.activities
          }
        })
      ]);
    }).catch((err) => {
      alert("Something went wrong while fetching schedules.");
    });
  }

  const closeNewTab = () => {
    setAddNew(false);
  }

  React.useEffect(() => {
    fetchSchedule();
  }, []);

  React.useEffect(() => {
    if(day){  
      closeNewTab();
    }
  }, [day]);

  React.useEffect(() => {
    //update available days
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    setAvailableDays(days.filter(d=>!data.map(d=>d.day).includes(d)));
  }, [data]);

  return (
    <div className="main">
        <Sidebar />
        <div className="schedule">
            <h2>Manage Clinic Schedule</h2>

            <div className="days-container">
                {
                  data.sort((a,b)=>a.id-b.id).map((d,i) => {
                    return (
                      <div
                        ref={el => daysRef.current[i] = el}
                        key={d.id} 
                        className='day' 
                        onClick={()=>selectDay(d.day, i)}>
                          <h3>{titleCase(d.day)}</h3>
                          <p>{d.startTime}-{d.endTime}</p>
                      </div>
                    )
                  })
                }
                {
                  data.length < 7 && (<div ref={
                    el => daysRef.current[data.length] = el
                  } className="add-day" onClick={openNewSchedule}>
                      <AddBoxIcon className="icon"/>
                  </div>)
                }
            </div>
            {
              day && (
                <div className="schedule-viewer">
                    <div className="schedule-viewer-top">
                      <h2 className="title">Activities</h2>
                      <div className="activities-container">
                        {
                          data
                          .filter(d=>d.day === day)
                          .map(d=>d.activities)
                          .flat()
                          .map((a,i) => (<span key={i} className="activity">{a}</span>))
                        }

                        <span className="update-activity" onClick={()=>openModal('activities')}>
                          <EditIcon className="icon"/>
                          Update Activities
                        </span>
                      </div>
                    </div>

                    <div className="schedule-viewer-bottom">
                      <h2 className="title">Update Time</h2>
                      <button className="update-time" onClick={()=>openModal('time')}>Update Time</button>
                    </div>

                    <div className="schedule-viewer-bottom">
                      <h2 className="title">Delete Schedule</h2>
                      <button className="delete-schedule" onClick={deleteDay}>Delete Schedule Permanently</button>
                    </div>
                </div>
              )
            }

            <Add add={addNew} availableDays={availableDays} setData={setData} setAvailableDays={setAvailableDays}/>
        </div>

        <Update type={updateType} open={open} close={closeModal} day={day} data={
          data.find(d=>d.day === day)
        } setData={setData} />

        
    </div>
  )
}

function titleCase(str) {
  return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
export default Schedule