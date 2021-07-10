import { useHistory, Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import Card from "../Card";
        
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
        <div className="wrapper">
            <Card title="Users Online" description="456" button="View Users"></Card>
            <Card title="Unenrolled Courses" description="12" button="View Courses"></Card>
            <Card title="Users Online" description="456" button="View Users"></Card>
            <Card title="Users Online" description="456" button="View Users"></Card>
            </div>

            <h1> User Id = {user.user_id } </h1>
            <button onClick={logOut}>Log Out</button>
        
        </div>);
}
 
export default AdminHome;