import React, { useContext, useEffect, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateContext, DoctorIdContext, TimeContext } from '../Context/ContextShare';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DigitalClock } from '@mui/x-date-pickers/DigitalClock';
import { getAllDatesAndTimes } from '../Services/allAPIs';
import dayjs from 'dayjs';


function Time() {

    const {doctorId} = useContext(DoctorIdContext)
    const {time,setTime} = useContext(TimeContext)
    const {date} = useContext(DateContext)
    const [bookedTime,setBookedTime] = useState([])

    const handleTimeChange = (value) => {
        setTime(value);
    };

    useEffect(()=>{
        const get_booked_dates_times = async () =>{
            const response = await getAllDatesAndTimes(doctorId)
            console.log(response);
            const booked_dates_times = response.Booked_Dates_and_Time
            console.log(booked_dates_times);

            const timesForSelectedDate = booked_dates_times.filter(item => dayjs(item.date_of_appointment).isSame(date,'day')).map(item => dayjs(item.time_of_appointment,'HH:mm'))
            setBookedTime(timesForSelectedDate)
        }
        if (date) {
            get_booked_dates_times()
        }
        // eslint-disable-next-line 
    },[date])

    const shouldDisableTime = (timeValue) => {
        const timeHour = timeValue.hour()
        const timeMinute = timeValue.minute();
        const isLunchBreak = timeHour >= 13 && timeHour <= 14;
        //const isLunchBreak = timeHour === 13 && timeMinute >= 0 && timeMinute < 30;
        //const isAfterOneThirty = timeHour > 13 || (timeHour === 13 && timeMinute > 30);
        const isBefore9AM = timeHour <= 8 || (timeHour === 8 && timeMinute === 30);
        const isAfter6PM = timeHour > 18 || (timeHour === 18 && timeMinute > 0);
        return isBefore9AM || isAfter6PM || isLunchBreak || bookedTime.some(bookedTime => bookedTime.isSame(timeValue,'minute'))
    }

  return (
    <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DigitalClock']}>
                <DemoItem>
                    <DigitalClock 
                        label="Select Time"
                        value={time}
                        onChange={handleTimeChange}
                        shouldDisableTime={shouldDisableTime}
                    />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    </>
  )
}

export default Time