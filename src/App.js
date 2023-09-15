import logo from './logo.svg';
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
import Cookies from 'js-cookie';


function App() {

  // const role = 'employee'
  const role = Cookies.get('currentUserRole');
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
              <Route element={<Home />} path='/' exact/>
              <Route element={<AboutUs />} path='/aboutus' exact/>
              <Route element={<Dashboard />} path='/dashboard' exact/>
              {role === 'manager' && <Route element={<Demo />} path="/gantt" exact />}
              {role === 'employee' && <Route element={<Main />} path="/gantt" exact />}
              <Route element={<Demo />} path='/demo' exact/>
              <Route element={<Main />} path='/gantt' exact/>
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
