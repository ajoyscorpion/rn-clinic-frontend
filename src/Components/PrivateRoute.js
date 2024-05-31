import React, { useContext, useState, useEffect } from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from '../Context/ContextShare'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PrivateRoute = () => {
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const { isAuthenticated, loading } = useContext(AuthContext);

    useEffect(() => {
        if (!isAuthenticated && !loading) {
            setSnackbarMessage('Please Login !.');
            setSnackbarSeverity('error');
            setOpen(true);
        }
    }, [isAuthenticated, loading]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    if (loading) {
        return <div>Loading...</div>; // Render a loading state while checking authentication
    }

    if (!isAuthenticated) {
        return (
            <>
                <Navigate to="/Login" />
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert onClose={handleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </>
        );
    }

    return <Outlet />;
}

export default PrivateRoute;











// import React, { useContext } from 'react'
// import { Navigate, Outlet} from "react-router-dom";
// import { AuthContext } from '../Context/ContextShare';

// const PrivateRoute = () => {

//     const {isAuthenticated,loading} = useContext(AuthContext)

//     console.log({isAuthenticated});

//     if (loading) {
//         return <div>Loading...</div>; // Render a loading state while checking authentication
//     }

//     if (!isAuthenticated) {
//         return <Navigate to="/Login" />;
//     }

//     return <Outlet />;
// }

// export default PrivateRoute















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