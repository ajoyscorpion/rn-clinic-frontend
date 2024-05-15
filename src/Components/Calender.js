import React, { useContext } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { DateContext } from '../Context/ContextShare';


function Calender() {

    const {date,setDate} = useContext(DateContext)

    const shouldDisableDate = (date) => {
        // Disable dates before today
        const today = dayjs();
        if (date.isBefore(today, 'day')) {
          return true;
        }
        // Disable Saturdays and Sundays
        if (date.day() === 0 || date.day() === 6) {
          return true;
        }
        return false;
    };

    const handleDateChange = (value) =>{
        setDate(value)
    }

  return (
    <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar 
                shouldDisableDate={shouldDisableDate} 
                label="Select Date"
                value={date}
                onChange={handleDateChange}
            />
        </LocalizationProvider>
    </>
  )
}

export default Calender