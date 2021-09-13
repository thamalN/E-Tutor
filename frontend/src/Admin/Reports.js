import Sidebar from "../Sidebar";
import { Link, Route } from 'react-router-dom';

const Reports = () => {
    return (
        <div>
            <Sidebar/>
            <div className="homeContent">
            <h1>Reports</h1>
            <div className="reg_buttons">
            <Link to="/adminHome/registrations/recentRegistrations"><button >Recent Registrations List</button></Link>
            <Link to="/adminHome/reports/allStudents"><button >All Students List</button></Link>
            <Link to="/adminHome/reports/allTeachers"><button >All Teachers List</button></Link>
            <Link to="/adminHome/reports/allStaff"><button >All Staff List</button></Link>
            <Link to="/adminHome/reports/allCoursesList"><button >All Courses List</button></Link>
            <Link to="/adminHome/reports/coursePayments"><button >Total Payments Of The Month</button></Link>
            
            <Link to="/adminHome/dashboard"><button >Back to Dashboard</button></Link>
        </div>
        </div>
        </div>
        
      );
}
 
export default Reports;