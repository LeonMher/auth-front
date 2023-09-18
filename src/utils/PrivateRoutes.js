import {Outlet, Navigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';

const PrivateRoutes = () => {
    
    const token = Cookies.get('jwtt');
    const role = Cookies.get('jwtrole');
    const userId = Cookies.get('jwtuserid');
    const dispatch = useDispatch()

    

        if (userId && role) {
          const decodedToken = jwt_decode(role);
          const decodedUserId = jwt_decode(userId);
          
          dispatch({
            type: 'edit-current-user-name',
            payload:{
                userId: decodedUserId.userId,
                name: decodedToken.role
            }
        })
        }

    return (
        token ? <Outlet /> : <Navigate to="/login" />
    )
}


export default PrivateRoutes;