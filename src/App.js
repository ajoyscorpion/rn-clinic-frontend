import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Booking from './Pages/Booking';
import Footer from './Components/Footer';
import Mybookings from './Pages/Mybookings';
import View from './Pages/View';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Pages/Profile';

function App() {

  return (
    <div className="App">
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route element={<PrivateRoute/>}>
            <Route path='/Booking' element={<Booking />} exact/>
            <Route path='/Mybookings' element={<Mybookings />} />
            <Route path={`/:name`} element={<Profile/>} />
            <Route path='/View/:id' element={<View />} />
          </Route>
          <Route path='/Login' element={<Login />} />
          <Route path='/SignUp' element={<SignUp />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
