import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { NavbarStyle } from './Navbar.style'

//Image import
import QuotasticLogo from '../../assets/images/navbar/navbar-logo.svg';

const Navbar = () => {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);

    /* User information */
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user) {
            setUserFirstName("Dino");
            setUserLastName("Garic");
        }
    }, [])

    function navigateLogin() {
        navigate("/login");
    }

    function navigateDashbaord() {
        navigate("/");
    }

    return (
        <NavbarStyle>
            <nav>
                <div className="navbar">
                    <div className="navbar-container">
                        <h1>
                            <img className="navbar-logo" onClick={navigateDashbaord} src={QuotasticLogo} />
                        </h1>
                        <nav>
                            <ul className="rigth-side">

                                {(!(user) && location.pathname !== '/signup') &&
                                    <button className="btn small bckgrd-orange bord-none text-white">Sign up</button>
                                }

                                {(!(user) && location.pathname !== '/login') &&
                                    <button onClick={navigateLogin} className="btn small bord-orange text-orange">Login</button>
                                }

                                {((user)) && <>
                                    <button className="btn-log" >Home</button>
                                    <button className="btn-log" >Setting</button>
                                    <button className="btn-log" >Profile</button>
                                    <button className="btn-log" >Logout</button>
                                    <button className="btn-add" >+</button>


                                    <div className="user-greeting">
                                        <p>
                                            Welcome, <br />
                                            {userFirstName} {userLastName}
                                        </p>
                                    </div>


                                </>
                                }

                            </ul>
                        </nav>
                    </div>
                </div>

            </nav>
        </NavbarStyle>
    )
}

export default Navbar