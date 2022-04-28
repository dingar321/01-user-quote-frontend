import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { NavbarStyle } from './Navbar.style'
import User from '../../utils/types/User';
import { getUser, removeTokenAndUser } from '../../utils/common/Session';

//Image import
import QuotasticLogo from '../../assets/images/navbar/navbar-logo.svg';
import { useRecoilState } from 'recoil';
import { UserState } from '../../utils/common/global-state';

const Navbar = () => {

    const [loggedUser, setLoggedUser] = useRecoilState<User>(UserState);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        //loads once and adds the user to the recoil state
        setLoggedUser(getUser());
    }, [])

    //Navigate funtions
    function navigateProfile() {
        navigate("/profile");
    }

    function navigateLogin() {
        navigate("/login");
    }

    function navigateRegister() {
        navigate("/signup");
    }

    function navigateDashbaord() {
        navigate("/");
    }

    function handleLogout() {
        removeTokenAndUser();
        setLoggedUser(getUser());
        navigate("/login");
    }

    return (
        <NavbarStyle>
            <nav>
                <div className="navbar">
                    <div className="navbar-container">
                        <h1>
                            <img className="navbar-logo"
                                onClick={navigateDashbaord} src={QuotasticLogo} />
                        </h1>
                        <nav>
                            <ul className="rigth-side">

                                {((loggedUser?.userId == 0) && location.pathname !== '/signup') &&
                                    <button onClick={navigateRegister} className="btn small bckgrd-orange bord-none text-white">Sign up</button>
                                }

                                {((loggedUser?.userId == 0) && location.pathname !== '/login') &&
                                    <button onClick={navigateLogin} className="btn small bord-orange text-orange">Login</button>
                                }


                                {((loggedUser?.userId != 0)) && <>
                                    <button className="btn-log" onClick={navigateDashbaord}>Home</button>
                                    <button className="btn-log" >Setting</button>
                                    <button className="btn-log" onClick={navigateProfile}>Profile</button>
                                    <button className="btn-log" onClick={handleLogout}>Logout</button>
                                    <button className="btn-add">+</button>

                                    <div className="user-greeting">
                                        <p>
                                            Welcome, <br />
                                            {loggedUser.firstName} {loggedUser.lastName}
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