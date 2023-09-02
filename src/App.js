import logo from './logo.svg';
import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Dashboard from './pages/Dashboard'
import Demo from './pages/Demo';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
              <Route element={<Home />} path='/' exact/>
              <Route element={<AboutUs />} path='/aboutus' exact/>
              <Route element={<Dashboard />} path='/dashboard' exact/>
              <Route element={<Demo />} path='/demo' exact/>
          </Route>
          <Route element={<Login />} path='/login' exact/>
          <Route element={<Signup />} path='/signup' exact/>
          
        </Routes>
    </Router>
    </div>
  );
}

export default App;
