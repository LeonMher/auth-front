import {Outlet, Navigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';

const PrivateRoutes = () => {
    
    const token = Cookies.get('jwtt');
    // const role = Cookies.get('jwtrole');
    const employeeId = Cookies.get('jwtuserid');
    const dispatch = useDispatch()

    

        if (employeeId) {
          const decodedUserId = jwt_decode(employeeId);
          
          dispatch({
            type: 'edit-current-user-name',
            payload:{
                employeeId: decodedUserId.employeeId,
                // name: decodedToken.role
            }
        })
        }

    return (
        token ? <Outlet /> : <Navigate to="/login" />
    )
}


export default PrivateRoutes;