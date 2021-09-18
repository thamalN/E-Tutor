import Sidebar from "../Sidebar";
import { Link } from 'react-router-dom';

const Payments = () => {
    return (
        <div>
            <Sidebar/>
            <div className="homeContent">
            <h1>Payments</h1>
            <div className="reg_buttons">
            <Link to="/payments/studentPayments"><button >Student Payments</button></Link>
            <Link to="/adminHome/payments/teacherPayments"><button >Teacher Payments</button></Link>
        </div>
        </div>
        </div>
        
      );
}
 
export default Payments;