import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <Link to="/"><h1>E-TUTOR</h1></Link>
            <div className="links">
                <Link to="/signIn">SIGN IN</Link>
                <Link to="/signUp">SIGN UP</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;