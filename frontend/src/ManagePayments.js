import Sidebar from "./Sidebar";
import { Link, Route } from 'react-router-dom';

const ManagePayments = () => {
    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <h1 className="stuRegHeader">Manage Payments</h1>
                <div className="reg_buttons">
                    <Link className="linkbutton" to="/payments/pendingReceipts">View Pending List</Link>
                    <Link className="linkbutton" to="/payments/verifiedPayments">View Verified List</Link>
                    <Link className="linkbutton" to="/payments/rejectedPayments">View Rejected List</Link>
                </div>
            </div>
        </div>
    );
}

export default ManagePayments;