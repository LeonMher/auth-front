import {Outlet, Navigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';

const PrivateRoutes = () => {
    
    const token = Cookies.get('jwtt');
    // const role = Cookies.get('jwtrole');
    const employeeId = Cookies.get('jwtuserid');
    const employee_userName = Cookies.get('jwtusername');
    const dispatch = useDispatch()

    

        if (employeeId) {
          const decodedUserId = jwt_decode(employeeId);
          const decodedUserName = jwt_decode(employee_userName)
          dispatch({
            type: 'edit-current-user-name',
            payload:{
                employeeId: decodedUserId.employeeId,
                name: decodedUserName.username
            }
        })
        }

    return (
        token ? <Outlet /> : <Navigate to="/login" />
    )
}


export default PrivateRoutes;