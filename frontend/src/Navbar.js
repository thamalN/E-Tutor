import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark scrolling-navbar">
            <div class="navbar-brand">
                <Link to="/">
                    <img src="logo.png" className="rounded float-left" alt="eTutor" width="50%" />
                </Link>
            </div>
            
            <div className="links">
                {/* <li className="nav-link">
                    <Link to="/" className="nav-link" >Home</Link>
                </li> */}
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/courses">Courses</Link>
                <Link to="/staff">Staff</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/signIn">Sign In</Link>
                <Link className="joinForFree" to="/signUp">Join For Free</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;