import React from 'react'
import UserService from '../../../services/UserService';

function Add({add, availableDays, setData, setAvailableDays}) {

  const [values, setValues] = React.useState({
    day: '',
    activities: '',
    startTime: '07:00',
    endTime: '17:00'
  });

  React.useEffect(() => {
    return () => values.day = availableDays[0];
  }, [availableDays]);

  const handleDayChange = (e) => {
    setValues(d => {
      return {
        ...d,
        day: e.target.value
      }
    })
  }

  const handleActivitiesChange = (e) => {
    setValues(d => {
      return {
        ...d,
        activities: e.target.value
      }
    })
  }

  const handleStartTimeChange = (e) => {
    setValues(d => {
      return {
        ...d,
        startTime: e.target.value
      }
    })
  }

  const handleEndTimeChange = (e) => {
    setValues(d => {
      return {
        ...d,
        endTime: e.target.value
      }
    })
  }

  const addNewData = (data) => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    data.id = days.indexOf(data.day);
    console.log(data)
    setData(d => {
      return [...d, data];
    })
    setAvailableDays(d => {
      return d.filter(day => day !== data.day);
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      day: values.day,
      activities: values.activities.split(',').map(activity => activity.trim()),
      startTime: values.startTime,
      endTime: values.endTime
    }

    UserService.addSchedule(data).then(res => {
      alert("Schedule added successfully.");
      addNewData(data);
    })
    .catch(err => {
      alert("Error while adding schedule.");
    });
  }

  return (add && availableDays?.length > 0) && (
    <form className='schedule-viewer' onSubmit={handleSubmit}>
      <div className='schedule-viewer-top'>
        <h2>New Schedule</h2>
        <select 
          type="text" 
          placeholder='Day' 
          defaultValue={values.day} 
          onChange={handleDayChange}
          required>
            {availableDays.map(day => <option value={day}>{titleCase(day)}</option>)}
        </select>
      </div>
      <div className='schedule-viewer-middle'>
        <h2>Activities</h2>
        <textarea 
          rows={4} 
          placeholder='Separate activities with a comma. Example: Consultation, Screening, Dental Checkup' 
          value={values.activities}
          onChange={handleActivitiesChange}
          required
          />
      </div>
      <div className='schedule-viewer-bottom'>
        <h2>Time</h2>
        <div className='schedule-viewer-bottom-inputs'>
          <div className='schedule-viewer-bottom-input'>
            <label htmlFor='start-time'>Start Time</label>
            <input 
              type="time" 
              name='start-time' 
              id='start-time' 
              value={values.startTime}
              onChange={handleStartTimeChange}/>
          </div>
          <div className='schedule-viewer-bottom-input'>
            <label htmlFor='end-time'>End Time</label>
            <input 
              type="time" 
              name='end-time' 
              id='end-time' 
              value={values.endTime}
              onChange={handleEndTimeChange}/>
          </div>
        </div>
      </div>
      <div className='schedule-viewer-bottom'>
        <button type='submit'>Add Schedule</button>
      </div>
    </form>
  )
}

function titleCase(str) {
  return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
export default Add