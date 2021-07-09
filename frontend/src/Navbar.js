import { Link } from "react-router-dom";

const Navbar = ({id}) => {

    let navbar;

    switch (id.user_flag) {
        case 1:
            navbar = <div className="links">
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/courses">Courses</Link>
                        <Link to="/staff">Staff</Link>
                        <Link to="/contact">Contact</Link>
                        <Link to="/signIn">Sign In</Link>
                        <Link className="join for free" to="/">Sign Out</Link>
                    </div>
            break;
        case 2:
            navbar = <div className="links">
                        
                    </div>
            break;
        case 3:
            navbar = <div className="links">
                        
                    </div>
            break;
        case 4:
            navbar = <div className="links">
                        
                    </div>
            break;
        default:
            navbar = <div className="links">
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/courses">Courses</Link>
                        <Link to="/staff">Staff</Link>
                        <Link to="/contact">Contact</Link>
                        <Link to="/signIn">Sign In</Link>
                        <Link className="joinForFree" to="/signUp">Join For Free</Link>
                    </div>
    }

    return ( 

        <nav className="navbar fixed-top navbar-expand-lg navbar-dark scrolling-navbar">
            <div className="navbar-brand">
                <Link to="/">
                    <img src="logo_white.png" className="rounded float-left" alt="eTutor" width="50%" />
                </Link>
            </div>

            { navbar }

        </nav>
     );
}
 
export default Navbar;