import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import UserService from '../../../services/UserService';

function Update({open, close, type, day, data, setData}) {
  const [value, setValue] = React.useState({
    activities: '',
    startTime: '',
    endTime: ''
  });
  const updateType = titleCase(type);

  React.useEffect(() => {
    if(type === 'activities'){
      setValue(d => {
        return {
          ...d,
          activities: data.activities.join(', ')
        }
      });
    }

    if(type === 'time'){
      setValue(d => {
        return {
          ...d,
          startTime: data.startTime,
          endTime: data.endTime
        }
      });
    }
  }, [data, type])

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      day
    }

    if(type === 'activities'){
      data.activities = value.activities.split(',').map(activity => activity.trim());

      UserService.updateActivities(data).then(res => {
        alert("Activities updated successfully.");
        // update data in the parent component
        setData(d => d.map(c=>{
          if(c.day === day){
            return {
              ...c,
              activities: data.activities
            }
          }
          return c;
        }))
        close();
      }).catch(err => {
        alert("Error while updating activities.");
      })
    }

    if(type === 'time'){
      data.startTime = value.startTime;
      data.endTime = value.endTime;

      UserService.updateTime(data).then(res => {
        alert("Time updated successfully.");
        // update data in the parent component
        setData(d => d.map(c=>{
          if(c.day === day){
            return {
              ...c,
              startTime: data.startTime,
              endTime: data.endTime
            }
          }
          return c;
        }))
        close();
      }).catch(err => {
        alert("Error while updating time.");
      })
    }


  }

  const handleActivitiesChange = (e) => {
    setValue(d => {
      return {
        ...d,
        activities: e.target.value
      }
    });
  }

  const handleTimeStartChange = (e) => {
    setValue(d => {
      return {
        ...d,
        startTime: e.target.value
      }
    });
  }

  const handleTimeEndChange = (e) => {
    setValue(d => {
      return {
        ...d,
        endTime: e.target.value
      }
    });
  }

  return open && (
    <div className='update'>
        <div className="container">
            <div className="header">
                <h2>Update {updateType}</h2>
                <CloseIcon className="icon" onClick={close}/>
            </div>
            <div className="body">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor={type}>{updateType}</label>
                        <p>Separate activities with a comma. Example: Consultation, Screening, Dental Checkup</p>
                        {
                          type === 'activities' ? (
                            <textarea name={type} id={type} rows={4} value={value.activities} onChange={handleActivitiesChange}> </textarea>
                          ) : (
                            <>
                              <div className='input-container'>
                                <label htmlFor={'start'+type}>Start Time</label>
                                <input type="time" name={type} id={type} value={value.startTime} onChange={handleTimeStartChange}/>
                              </div>
                              <div className='input-container'>
                                <label htmlFor={'end'+type}>End Time</label>
                                <input type="time" name={'end'+type} id={'end'+type} value={value.endTime} onChange={handleTimeEndChange}/>
                              </div>
                            </>
                          )
                        }
                    </div>
                    <button type="submit" className="btn">Update</button>
                </form>
            </div>
        </div>
    </div>
  )
}

function titleCase(str) {
  return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export default Update


