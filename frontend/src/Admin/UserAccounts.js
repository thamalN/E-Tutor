import Sidebar from "../Sidebar";
import { Link } from 'react-router-dom';

const UserAccounts = () => {
    return (
        <div>
            <Sidebar/>
            <div className="homeContent">
            <h1>User Accounts</h1>
            <div className="reg_buttons">
            <Link to="/adminHome/studentAccs"><button >Students</button></Link>
            <Link to="/adminHome/teacherAccs"><button >Teachers</button></Link>
            <Link to="/adminHome/supStaffAccs"><button >Supporting Staff</button></Link>
        </div>
        </div>
        </div>
        
      );
}
 
export default UserAccounts;