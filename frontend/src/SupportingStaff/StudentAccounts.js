import Sidebar from "../Sidebar";
import { Link, Route } from 'react-router-dom';

const StudentAccounts = () => {
    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <h1 className="stuRegHeader">Student Accounts</h1>
                <div className="reg_buttons">
                    <Link className="linkbutton" to="/registrations/signUp">Create Student Accounts</Link>
                    <Link className="linkbutton" to="/supportingStaffHome/searchStudents">Search Student Accounts</Link>
                    <Link className="linkbutton" to="/supportingStaffHome/dashboard">Back to Dashboard</Link>
                </div>
            </div>
        </div>
    );
}

export default StudentAccounts;

