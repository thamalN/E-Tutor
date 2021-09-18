import { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import logo from './Resources/logo_icon_white.png';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Badge } from '@material-ui/core';
import { Cookies } from 'react-cookie';
import { HashLink } from 'react-router-hash-link';

import './Resources/styles.css';

const Navbar = (props) => {
    const cookies = new Cookies();
    let navbar;

    const user = JSON.parse(localStorage.getItem('user'))
    const notifications = JSON.parse(localStorage.getItem('notifications'))
    let notifyLen;
    if (notifications) {
        notifyLen = notifications.payments.length
    }
    //console.log(user);
    const history = useHistory()

    useEffect(() => {
        const loggedUser = localStorage.getItem('user')
        if (loggedUser)
            props.setLoggedIn(true)
    })

    const logOut = () => {
        props.setLoggedIn(false)
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // cookies.remove("tokens");
        // console.log(cookies)
        localStorage.clear();
        history.replace("/")
    };

    if (!(props.loggedIn)) {
        navbar = <nav className="navbar navbar-expand-md fixed-top navbar-dark ">
            <div className="container-xxl">
                <Link to="/" className="navbar-brand">
                    <img src={logo} className="rounded float-left" alt="eTutor" width="7%" />
                    <span className="fw-bold text-light ">
                        eTutor
                    </span>
                </Link>

                {/* toggle button for mobile nav */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* <!-- navbar links --> */}
                <div className="collapse navbar-collapse justify-content-end align-center" id="main-nav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link " to="/#home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <HashLink className="nav-link" to="/#about">About</HashLink>
                            {/* <Link className="nav-link" to="/about">About</Link> */}
                        </li>
                        <li className="nav-item">
                            <HashLink className="nav-link" to="/#courses">Courses</HashLink>
                            {/* <Link className="nav-link" to="/#courses">Courses</Link> */}
                        </li>
                        <li className="nav-item">
                            <HashLink className="nav-link" to="/#staff">Staff</HashLink>
                            {/* <Link className="nav-link" to="/#staff">Staff</Link> */}
                        </li>
                        <li className="nav-item">
                            <HashLink className="nav-link" to="/#contact">Contact</HashLink>
                            {/* <Link className="nav-link" to="/#contact">Contact</Link> */}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signIn">Sign In</Link>
                        </li>
                        <li className="nav-item ms-2 d-none d-md-inline">
                            <Link className="btn btn-secondary rounded-pill" to="/signUp">Join For Free</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    } else {
        navbar = <nav className="navbar navbar-expand-md fixed-top navbar-dark">
            <div className="container-xxl">

                <Link to="/" className="navbar-brand">
                    <img src={logo} className="rounded float-left" alt="eTutor" width="7%" />
                    <span className="fw-bold text-light ">
                        eTutor
                    </span>
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end align-center" id="main-nav">

                    {user.user_flag === 4 && (
                        <ul className="navbar-nav">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <Badge badgeContent={notifyLen}>
                                        <NotificationsIcon />
                                    </Badge>
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {notifications && notifications.payments.map((item) =>
                                        <div>
                                            <Link class="dropdown-item" to="#">Payment due on {item.course_name} {item.year}</Link>
                                        </div>
                                    )}
                                    <div class="dropdown-divider"></div>

                                </div>
                            </li>
                        </ul>
                    )}

                    <ul className="navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <PersonIcon />{" " + user.fname + " " + user.lname}
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link class="dropdown-item" to={{
                                                pathname: "/viewProfile",
                                                state: {
                                                    userId: user.user_id,
                                                    userFlag: user.user_flag
                                                }
                                            }}>
                                                My Details</Link>
                                {/* {user.user_flag === 4 && <a class="dropdown-item" href={`/StudentHome/StudentDetails/${user.user_id}`}>My Details</a>} */}
                                <div class="dropdown-divider"></div>
                                <Link class="dropdown-item" onClick={logOut}>Log Out</Link>
                            </div>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>

    }

    return (
        <div>
            {navbar}
        </div>
    );
}

export default Navbar;
