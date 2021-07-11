import Sidebar from "../Sidebar";
import { Link, Route } from 'react-router-dom';

const Registrations = () => {
    return (
        <div>
            <Sidebar/>
            <h1>Registrations</h1>
            <div className="reg_buttons">
            <Link to="/signUp"><button >Student Registration</button></Link>
            <Link to="/adminHome/createTeacherAcc"><button >Teacher Registration</button></Link>
            <Link to="/adminHome/createSupStaffAcc"><button >Supporting Staff Registration</button></Link>
            <Link to="/adminHome/recentRegistrations"><button >View Recent Registrations</button></Link>
            <Link to="/adminHome"><button >Back to Dashboard</button></Link>
        </div>
        </div>
        
      );
}
 
export default Registrations;