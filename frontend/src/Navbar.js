import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from './Resources/logo_white.png';

const Navbar = (props) => {
    let navbar;
    
    const location = useLocation()

    useEffect(() => {
        const loggedUser = localStorage.getItem('user')
        if (loggedUser)
            props.setLoggedIn(true)
    })

    if (!(props.loggedIn)) {
        navbar = <nav className="navbar">
                    <div className="navbar-brand">
                        <Link to="/">
                            <img src={logo} className="rounded float-left" alt="eTutor" width="50%" />
                        </Link>
                    </div><div className="links">
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/courses">Courses</Link>
                        <Link to="/staff">Staff</Link>
                        <Link to="/contact">Contact</Link>
                        <Link to="/signIn">Sign In</Link>
                        <Link className="joinForFree" to="/signUp">Join For Free</Link>
                    </div>
                </nav>

    } else {
        navbar = <nav className="navbar">
                    <div className="navbar-brand">
                        <Link to= {location.pathname}>
                            <img src={logo} className="rounded float-left" alt="eTutor" width="50%" />
                        </Link>
                    </div><div className="links">
                        <Link to="">Username</Link>
                    </div>
                </nav>

    }

    return (
        <div>
            { navbar }
        </div>
    );
}

export default Navbar;