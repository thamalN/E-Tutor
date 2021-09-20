import Sidebar from "../Sidebar";
import { Link, Route } from 'react-router-dom';

const StaffManagePayments = () => {
    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <h1 className="stuRegHeader">Manage Student Payments</h1>
                <div className="reg_buttons">
                    <Link className="linkbutton" to="/payments/pendingReceipts">View Pending List</Link>
                    <Link className="linkbutton" to="/payments/verifiedPayments">View Verified List</Link>
                    <Link className="linkbutton" to="/payments/rejectedPayments">View Rejected List</Link>
                    <Link className="linkbutton" to="/supportingStaffHome/dashboard">Back to Dashboard</Link>
                </div>
            </div>
        </div>
    );
}

export default StaffManagePayments;