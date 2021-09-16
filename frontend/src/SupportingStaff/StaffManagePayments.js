import Sidebar from "../Sidebar";
import { Link, Route } from 'react-router-dom';

const StaffManagePayments = () => {
    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <h1 className="stuRegHeader">Manage Student Payments</h1>
                <div className="reg_buttons">
                    <Link className="linkbutton" to="/pendingReceipts"><button>View Pending List</button></Link>
                    <Link className="linkbutton" to="/verifiedPayments"><button>View Verified List</button></Link>
                    <Link className="linkbutton" to="/rejectedPayments"><button>View Rejected List</button></Link>
                    <Link className="linkbutton" to="/supportingStaffHome/dashboard"><button>Back to Dashboard</button></Link>
                </div>
            </div>
        </div>
    );
}

export default StaffManagePayments;