import Sidebar from "../Sidebar";
import { Link, Route } from 'react-router-dom';

const Reports = () => {
    return (
        <div>
            <Sidebar/>
            <div className="homeContent">
            <h1>Reports</h1>
            <div className="reg_buttons">
            <Link to="/adminHome/registrations/recentRegistrations">Recent Registrations List</Link>
            <Link to="/adminHome/reports/allStudents">All Students List</Link>
            <Link to="/adminHome/reports/allTeachers">All Teachers List</Link>
            <Link to="/adminHome/reports/allStaff">All Staff List</Link>
            <Link to="/adminHome/reports/allCoursesList">All Courses List</Link>
            <Link to="/adminHome/reports/coursePayments">Total Monthly Revenue</Link>
            
        </div>
        </div>
        </div>
        
      );
}
 
export default Reports;