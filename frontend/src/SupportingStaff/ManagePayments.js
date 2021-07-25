import Sidebar from "../Sidebar";
import { Link, Route } from 'react-router-dom';

const ManagePayments = () => {
    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <h1 className="stuRegHeader">Manage Payments</h1>
                <div className="reg_buttons">
                    <Link className="linkbutton" to="/pendingReceipts"><button>View Pending List</button></Link>
                    <Link className="linkbutton" to="/verifiedReceipts"><button>View Verified List</button></Link>
                    <Link className="linkbutton" to="/rejectedReceipts"><button>View Rejected List</button></Link>
                    <Link className="linkbutton" to="/supportingStaffHome"><button>Back to Dashboard</button></Link>
                </div>
            </div>
        </div>
    );
}

export default ManagePayments;