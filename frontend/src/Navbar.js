import { useEffect } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import logo from './Resources/logo_white.png';
import PersonIcon from '@material-ui/icons/Person';
import './Resources/styles.css';

const Navbar = (props) => {
    let navbar;

    const location = useLocation()

    const user = JSON.parse(localStorage.getItem('user'))

    const history = useHistory()


    useEffect(() => {
        const loggedUser = localStorage.getItem('user')
        if (loggedUser)
            props.setLoggedIn(true)
    })

    const logOut = () => {
        props.setLoggedIn(false)
        localStorage.clear();
        history.replace("/")
    };

    if (!(props.loggedIn)) {
        navbar = <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">
                    <img src={logo} className="rounded float-left" alt="eTutor" width="50%" />
                </Link>
            </div>
            <div className="links">
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
            <div className="navbar-brand fixed">

                <img src={logo} className="rounded float-left" alt="eTutor" width="50%" />

            </div>
            <div className="links" >
            <p  style={{display:"inline-block", margin:10}}>{ user.fname } { user.lname} </p>   
            <button className="joinForFree" onClick={logOut} >Log Out</button>
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