import Sidebar from "../Sidebar";
import { Link, Route } from 'react-router-dom';

const StudentRegistrations = () => {
    return (
        <div>
            <Sidebar />
            <div className="homeContent">

                <h1 className="stuRegHeader">Registrations</h1>
                <div className="reg_buttons">
                    <Link className="linkbutton" to="/registrations/signUp">Register new Student</Link>
                    <Link className="linkbutton" to="/supportingStaffHome/registrations/recentStaffRegistrations">View Recent Registrations</Link>
                    <Link className="linkbutton" to="/supportingStaffHome/dashboard">Back to Dashboard</Link>
                </div>
            </div>
        </div>

    );
}

export default StudentRegistrations;