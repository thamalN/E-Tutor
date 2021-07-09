import { Link } from "react-router-dom";
import logo from './Resources/logo_white.png';

const Navbar = () => {
    let navbar;
    
    let user = JSON.parse(localStorage.getItem('user'))

    if (!user) {
        navbar = <div className="links">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/courses">Courses</Link>
                    <Link to="/staff">Staff</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/signIn">Sign In</Link>
                    <Link className="joinForFree" to="/signUp">Join For Free</Link>
                </div>

    } else {
        navbar = <div className="links">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/courses">Courses</Link>
                    <Link to="/staff">Staff</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="#">Username</Link>
                </div>

    }

    return (

        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">
                    <img src={logo} className="rounded float-left" alt="eTutor" width="50%" />
                </Link>
            </div>

            {navbar}
            
        </nav>
    );
}

export default Navbar;