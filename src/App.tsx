
/* importing global styles */
import './utils/styles/App.css';
import './utils/styles/App-utils.css'
import './utils/styles/App-mobile.css'

/* Importing all of the various components */
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import LandingPage from './components/landing-page/LandingPage';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Profile from './components/profile/Profile';

/* Importing libraries */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { useState } from 'react';



function App() {

  const [loggedUser, setLoggedUser] = useState();

  return (
    <RecoilRoot>
      <Router>
        <div className="app" >
          <div>
            <Navbar />
            <div className='main'>
              <Routes>

                {/* Public routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Private routes */}
                <Route path="/profile" element={<Profile />} />


                {/* Catch all */}
                {/*TODO:*/}
              </Routes>
            </div>
          </div>
          <Footer />
        </div >
      </Router>
    </RecoilRoot>
  );
}

export default App;
