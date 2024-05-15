import React, { useContext } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeContext } from '../Context/ContextShare';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DigitalClock } from '@mui/x-date-pickers/DigitalClock';


function Time() {

    const {time,setTime} = useContext(TimeContext)

    const handleTimeChange = (value) => {
        setTime(value);
    };

  return (
    <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DigitalClock']}>
                <DemoItem>
                    <DigitalClock 
                        label="Select Time"
                        value={time}
                        onChange={handleTimeChange}
                    />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    </>
  )
}

export default Time