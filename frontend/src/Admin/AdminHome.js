import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";

const AdminHome = ({id}) => {
    let ID = id.user_id
    return ( <div>
        <nav className="navbar">
            <div className="links">
                <Link to="/createTeacherAcc">Create Teacher Account</Link>
                <Link to="/">Create Supporting Staff Account</Link>
            </div>
        </nav>
        <Sidebar/></div>);
}
 
export default AdminHome;