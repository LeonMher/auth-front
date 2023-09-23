import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Dashboard from './pages/Dashboard'
import Sms from './pages/Sms'
import Demo from './pages/Demo';
import Main from './components/gantt/Main'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import { useSelector } from 'react-redux';

function App() {
  

  // TODO: Move somewhere else
  const userName = useSelector(function(state){
    return state.currentUser.name
  })

  const userId = useSelector(function(state){
    return state.currentUser.employeeId
  })




  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
              <Route element={<Home />} path='/' exact/>
              <Route element={<AboutUs />} path='/aboutus' exact/>
              <Route element={<Dashboard />} path='/dashboard' exact/>
              <Route element={<Demo userId={userId} userName={userName}/>} path="/gantt" exact />
              {/* {userName === 'manager' && <Route element={<Main />} path="/gantt" exact />} */}
              <Route element={<Sms />} path='/sms' exact/>
          </Route>
          <Route element={<Login />} path='/login' exact/>
          <Route element={<Signup />} path='/signup' exact/>
          
        </Routes>
    </Router>
    </div>
  );
}

export default App;
