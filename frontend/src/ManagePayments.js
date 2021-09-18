import Sidebar from "./Sidebar";
import { Link, Route } from 'react-router-dom';

const ManagePayments = () => {
    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <h1 className="stuRegHeader">Manage Payments</h1>
                <div className="reg_buttons">
                    <Link className="linkbutton" to="/payments/pendingReceipts"><button>View Pending List</button></Link>
                    <Link className="linkbutton" to="/payments/verifiedPayments"><button>View Verified List</button></Link>
                    <Link className="linkbutton" to="/payments/rejectedPayments"><button>View Rejected List</button></Link>
                </div>
            </div>
        </div>
    );
}

export default ManagePayments;