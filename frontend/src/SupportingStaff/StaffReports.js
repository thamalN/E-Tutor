import Sidebar from "../Sidebar";
import { Link, Route } from 'react-router-dom';
import '../SupportingStaff/staffhome.css';

const StaffReports = () => {
    return (
        <div>
            <Sidebar/>
            <div className="homeContent">
            <h1>Reports</h1>
            <div className="reg_buttons">
            <Link to="/supportingStaffHome/registrations/recentStaffRegistrations">Recent Registrations List</Link>
            <Link to="/supportingStaffHome/reports/allStudents">All Students List</Link>
            <Link to="/supportingStaffHome/reports/allTeachers">All Teachers List</Link>
            <Link to="/supportingStaffHome/reports/allCoursesList">All Courses List</Link>

            <Link to="/supportingStaffHome/dashboard">Back to Dashboard</Link>
        </div>
        </div>
        </div>
        
      );
}
 
export default StaffReports;