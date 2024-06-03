// import React, { useContext, useEffect, useState } from 'react'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import dayjs from 'dayjs';
// import { DateContext, DoctorIdContext } from '../Context/ContextShare';
// import { getAllDatesAndTimes } from '../Services/allAPIs';


// function Calender() {

//     const {doctorId} = useContext(DoctorIdContext)
//     const {date,setDate} = useContext(DateContext)
//     const [fullBookedDates,setFullBookedDates] = useState([])

//     useEffect(()=>{
//       console.log(doctorId);
//       const get_booked_dates_times = async () =>{
//         const response = await getAllDatesAndTimes(doctorId)
//         console.log(response);
//         const booked_dates_times = response.Booked_Dates_and_Time
//         console.log(booked_dates_times);

//         const slot = {}
//         booked_dates_times.forEach(({date_of_appointment,time_of_appointment}) => {
//           const dateStr = dayjs(date_of_appointment).format('YYYY-MM-DD')
//           if (!slot[dateStr]) {
//             slot[dateStr] = []
//           }
//           slot[dateStr].push(time_of_appointment)
//         });

//         const fullyBooked = Object.keys(slot).filter(date => {
//           const times = slot[date]
//           const validTimes = times.filter(time => time < '13:00' || time >= "14:00")
//           return validTimes.length >= 16
//         })

//         setFullBookedDates(fullyBooked.map(date => dayjs(date)))
//       }
//       get_booked_dates_times()
//     },[])

//     const shouldDisableDate = (date) => {
//         // Disable dates before today
//         const today = dayjs();
//         if (date.isBefore(today, 'day')) {
//           return true;
//         }
//         // Disable Saturdays and Sundays
//         if (date.day() === 0 || date.day() === 6) {
//           return true;
//         }
//         if (fullBookedDates.some(fullDate => fullDate.isSame(date, 'day'))) {
//           return true
//         }
//         return false;
//     };

//     const handleDateChange = (value) =>{
//         setDate(value)
//     }

//   return (
//     <>
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DateCalendar 
//                 shouldDisableDate={shouldDisableDate} 
//                 label="Select Date"
//                 value={date}
//                 onChange={handleDateChange}
//             />
//         </LocalizationProvider>
//     </>
//   )
// }

// export default Calender




import React, { useContext, useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { DateContext, DoctorIdContext } from '../Context/ContextShare';
import { getAllDatesAndTimes } from '../Services/allAPIs';

export const get_booked_dates_times = async (doctorId, setFullBookedDates) => {
    try {
        const response = await getAllDatesAndTimes(doctorId);
        console.log(response);
        const booked_dates_times = response.Booked_Dates_and_Time;
        console.log(booked_dates_times);

        const slot = {};
        booked_dates_times.forEach(({ date_of_appointment, time_of_appointment }) => {
            const dateStr = dayjs(date_of_appointment).format('YYYY-MM-DD');
            if (!slot[dateStr]) {
                slot[dateStr] = [];
            }
            slot[dateStr].push(time_of_appointment);
        });

        const fullyBooked = Object.keys(slot).filter(date => {
            const times = slot[date];
            const validTimes = times.filter(time => time < '13:00' || time >= "14:00");
            return validTimes.length >= 16;
        });

        setFullBookedDates(fullyBooked.map(date => dayjs(date)));
    } catch (error) {
        console.error("Error fetching booked dates and times:", error);
    }
};

function Calendar() {
    const { doctorId } = useContext(DoctorIdContext);
    const { date, setDate } = useContext(DateContext);
    const [fullBookedDates, setFullBookedDates] = useState([]);

    useEffect(() => {
        if (doctorId) {
            get_booked_dates_times(doctorId, setFullBookedDates);
        }
    }, [doctorId]);

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
        if (fullBookedDates.some(fullDate => fullDate.isSame(date, 'day'))) {
            return true;
        }
        return false;
    };

    const handleDateChange = (value) => {
        setDate(value);
    };

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
    );
}

export default Calendar;

