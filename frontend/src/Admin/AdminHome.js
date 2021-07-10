import { useHistory, Link } from "react-router-dom";
import Sidebar from "../Sidebar";

const AdminHome = (props) => {

    const history = useHistory()

    const user = JSON.parse(localStorage.getItem('user'))

    const logOut = () => {
        props.setLoggedIn(false)
        localStorage.clear();
        history.replace("/")
    };

    return ( 
        <div>
            <nav className="navbar">
                <div className="links">
                    <Link to="/Admin/createTeacherAcc">Create Teacher Account</Link>
                    <Link to="/">Create Supporting Staff Account</Link>
                </div>
            </nav>

            <Sidebar/>

            <h1> User Id = {user.user_id } </h1>
            <button onClick={logOut}>Log Out</button>
        
        </div>);
}
 
export default AdminHome;