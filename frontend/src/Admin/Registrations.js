import Sidebar from "../Sidebar";
import { Link, Route } from 'react-router-dom';

const Registrations = () => {
    return (
        <div>
            <Sidebar/>
            <div className="homeContent">
            <h1>Registrations</h1>
            <div className="reg_buttons">
            <Link to="/signUp">Student Registration</Link>
            <Link to="/adminHome/registrations/createTeacherAcc">Teacher Registration</Link>
            <Link to="/adminHome/registrations/createSupStaffAcc">Supporting Staff Registration</Link>
            <Link to="/adminHome/registrations/recentRegistrations">View Recent Registrations</Link>
            <Link to="/adminHome/dashboard">Back to Dashboard</Link>
        </div>
        </div>
        </div>
        
      );
}
 
export default Registrations;