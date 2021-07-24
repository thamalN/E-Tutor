import Sidebar from "../Sidebar";
import { Link, Route } from 'react-router-dom';

const StudentRegistrations = () => {
    return (
        <div>
            <Sidebar />
            <div className="homeContent">

            <h1 className="stuRegHeader">Registrations</h1>
            <div className="reg_buttons">
                <Link className="linkbutton" to="/signUp"><button>Register new Student</button></Link>
                <Link className="linkbutton" to="/supportingStaffHome/recentRegistrations"><button>View Recent Registrations</button></Link>
                <Link className="linkbutton" to="/supportingStaffHome"><button>Back to Dashboard</button></Link>
            </div>
            </div>
        </div>

    );
}

export default StudentRegistrations;