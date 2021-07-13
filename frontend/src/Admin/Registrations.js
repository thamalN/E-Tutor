import Sidebar from "../Sidebar";
import { useEffect } from "react";
import { useHistory, Link, Route, useLocation } from 'react-router-dom';


const Registrations = (props) => {
    let registrations;

    const location = useLocation()

    const user = JSON.parse(localStorage.getItem('user'))
    let flag = user.user_flag

    const history = useHistory()



    if (!(flag === 1)) {
        return [
            <div>
                <Sidebar />
                <h1 style={{ marginLeft: "250px" }}>Registrations</h1>
                <div className="reg_buttons">
                    <Link to="/signUp"><button >Student Registration</button></Link>
                    <Link to="/adminHome/createTeacherAcc"><button >Teacher Registration</button></Link>
                    <Link to="/adminHome/createSupStaffAcc"><button >Supporting Staff Registration</button></Link>
                    <Link to="/adminHome/recentRegistrations"><button >View Recent Registrations</button></Link>
                    <Link to="/adminHome"><button >Back to Dashboard</button></Link>
                </div>
            </div>
        ]
    } else if (flag === 2) {
        return [
            <div>
                <Sidebar />
                <h1 style={{ marginLeft: "250px" }}>Registrations</h1>
                <div className="reg_buttons">
                    <Link to="/signUp"><button >Student Registration</button></Link>
                    <Link to="/adminHome/createTeacherAcc"><button >Teacher Registration</button></Link>
                    <Link to="/adminHome/recentRegistrations"><button >View Recent Registrations</button></Link>
                    <Link to="/supportingStaffHome"><button >Back to Dashboard</button></Link>
                </div>
            </div>
        ];
    }

}

export default Registrations;


