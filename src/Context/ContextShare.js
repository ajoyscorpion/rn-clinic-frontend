import { createContext, useState } from "react";

export const DateContext = createContext()
export const TimeContext = createContext()
export const AuthContext = createContext()


function ContextShare({children}) {

    const [date,setDate] = useState(null)
    const [time,setTime] = useState(null)
    
    const isAuthenticated = () => {
        const user = localStorage.getItem('user');
        return user
    };



  return (
    <AuthContext.Provider value={{isAuthenticated}}>
      <DateContext.Provider value={{date,setDate}}>
          <TimeContext.Provider value={{time,setTime}}>
              {children}
          </TimeContext.Provider>
      </DateContext.Provider>
    </AuthContext.Provider>
  )
}

export default ContextShare