import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Spinner from './Spinner';

const ProtectedRoute = ({ children, admin }) => {
    const { loggedIn, checkingStatus, isAdmin } = UserAuth();

    return (
        <>
          {
            // display a spinner while auth status being checked
            checkingStatus
              ? <Spinner />
              : loggedIn
                // if user is logged in, grant the access to the route
                // note: in this example component is Bar
                ?
                  !admin || isAdmin 
                  ? <Outlet />
                  : <Navigate to='/' />
                // else render an unauthorised component
                // stating the reason why it cannot access the route
                : <Navigate to='/signin' />
          }
        </>
    );
}

ProtectedRoute.defaultProps = {
  admin: false
}

export default ProtectedRoute