import React, { useContext } from 'react'
import { Navigate, Outlet} from "react-router-dom";
import { AuthContext } from '../Context/ContextShare'

const PrivateRoute = () => {

    const {isAuthenticated} = useContext(AuthContext)

    console.log({isAuthenticated});

    if (!isAuthenticated()) {
        return <Navigate to="/Login" />;
    }

    return <Outlet />;
}

export default PrivateRoute



// render = {(props) => {
//     user ? <Component {...props}/> : window.location.href = "/Login"
// }}



// import React, { useContext } from 'react'
// import { Navigate, Route } from "react-router-dom";
// import { AuthContext } from '../Context/ContextShare'

// const PrivateRoute = ({element : Element, ...rest}) => {

//     const {user} = useContext(AuthContext)

//   return (
//     <Route
//         {...rest}
//         element = {user ? <Element/> : <Navigate to="/Login" replace/>}
//     />
//   )
// }

// export default PrivateRoute