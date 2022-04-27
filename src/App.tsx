
/* Global styles import */
import './utils/global-styles/App.css';
import './utils/global-styles/App-utils.css'
import './utils/global-styles/App-mobile.css'

/* Importing all of the various components */
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app" >
        <div>
          <Navbar />
          <div className='main'>
            <Routes>


            </Routes>
          </div>
        </div>
        <Footer />
      </div >
    </Router>
  );
}

export default App;
