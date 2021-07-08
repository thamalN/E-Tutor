import { Link } from "react-router-dom";

const AdminHome = ({id}) => {
    let ID = id.user_id
    return ( 
        <nav className="navbar">
            <div className="links">
                <Link to="/createTeacherAcc">Create Teacher Account</Link>
                <Link to="/">Create Supporting Staff Account</Link>
            </div>
        </nav>);
}
 
export default AdminHome;