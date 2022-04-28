
/* importing global styles */
import './utils/global-styles/App.css';
import './utils/global-styles/App-utils.css'
import './utils/global-styles/App-mobile.css'

/* Importing all of the various components */
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import LandingPage from './components/landing-page/LandingPage';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';

/* Importing libraries */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
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

            </Routes>
          </div>
        </div>
        <Footer />
      </div >
    </Router>
  );
}

export default App;
