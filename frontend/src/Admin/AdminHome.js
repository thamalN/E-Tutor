import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import Card from "../Card";

const AdminHome = () => {
    return ( <div>
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
        </div>);
}
 
export default AdminHome;