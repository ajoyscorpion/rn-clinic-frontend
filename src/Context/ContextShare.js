import { createContext, useEffect, useState } from "react";

export const DateContext = createContext()
export const TimeContext = createContext()
export const AuthContext = createContext()


function ContextShare({children}) {

    const [date,setDate] = useState(null)
    const [time,setTime] = useState(null)
    const [isAuthenticated,setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true);
    
    // const isAuthenticated = () => {
    //     const user = localStorage.getItem('user');
    //     return user
    // };

    useEffect(()=>{
      const customerId = localStorage.getItem('customerId');
      if (customerId) {
          setIsAuthenticated(true);
      }
      setLoading(false);
    },[])

    const login = (name,customerId) => {
      localStorage.setItem('user',name)
      localStorage.setItem('customerId',customerId)
      setIsAuthenticated(true)
    }

    const logout = () => {
      localStorage.removeItem('user')
      localStorage.removeItem('customerId')
      setIsAuthenticated(false)
    }


  return (
    <AuthContext.Provider value={{isAuthenticated,login,logout,loading}}>
      <DateContext.Provider value={{date,setDate}}>
          <TimeContext.Provider value={{time,setTime}}>
              {children}
          </TimeContext.Provider>
      </DateContext.Provider>
    </AuthContext.Provider>
  )
}

export default ContextShare