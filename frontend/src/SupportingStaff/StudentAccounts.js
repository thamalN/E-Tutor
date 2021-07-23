import Sidebar from "../Sidebar";
import { Link, Route } from 'react-router-dom';

const StudentAccounts = () => {
    return (
        <div>
            <Sidebar />
            <h1 className="stuRegHeader">Student Accounts</h1>
            <div className="reg_buttons">
                <Link className="linkbutton" to="/signUp"><button>Create Student Accounts</button></Link>
                <Link className="linkbutton" to="/supportingStaffHome/searchToUpdate"><button>Update Student Accounts</button></Link>
                <Link className="linkbutton" to="/deleteStudentAccs"><button>Delete Student Account</button></Link>
            </div>
        </div>

    );
}

export default StudentAccounts;

