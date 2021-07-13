import Sidebar from "../Sidebar";
import { Link, Route } from 'react-router-dom';

const StudentRegistrations = () => {
    return (
        <div>
            <Sidebar/>
            <h1 style={{marginLeft: "250px"}}>Registrations</h1>
            <div className="reg_buttons">
            <Link to="/signUp"><button >Register new Student</button></Link>
            <Link to="/supportingStaffHome/recentRegistrations"><button >View Recent Registrations</button></Link>
            <Link to="/supportingStaffHome"><button >Back to Dashboard</button></Link>
        </div>
        </div>
        
      );
}
 
export default StudentRegistrations;