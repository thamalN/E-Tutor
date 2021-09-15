import Sidebar from "../Sidebar";
import { Link, Route } from 'react-router-dom';

const StaffReports = () => {
    return (
        <div>
            <Sidebar/>
            <div className="homeContent">
            <h1>Reports</h1>
            <div className="reg_buttons">
            <Link to="/supportingStaffHome/registrations/recentStaffRegistrations"><button >Recent Registrations List</button></Link>
            <Link to="/supportingStaffHome/reports/allStudents"><button >All Students List</button></Link>
            <Link to="/supportingStaffHome/reports/allTeachers"><button >All Teachers List</button></Link>
            <Link to="/supportingStaffHome/reports/allCoursesList"><button >All Courses List</button></Link>

            <Link to="/supportingStaffHome/dashboard"><button >Back to Dashboard</button></Link>
        </div>
        </div>
        </div>
        
      );
}
 
export default StaffReports;