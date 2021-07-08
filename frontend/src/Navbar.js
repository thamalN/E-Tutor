import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <Link to="/"><h1>E-TUTOR</h1></Link>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/courses">Courses</Link>
                <Link to="/staff">Staff</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/signIn">Sign In</Link>
                <Link className="joinForFree" to="/signUp">Join For Free</Link>
            </div>
            <div >
            
            </div>
        </nav>
     );
}
 
export default Navbar;