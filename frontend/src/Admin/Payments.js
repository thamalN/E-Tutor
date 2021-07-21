import Sidebar from "../Sidebar";
import { Link } from 'react-router-dom';

const Payments = () => {
    return (
        <div>
            <Sidebar/>
            <div className="homeContent">
            <h1>Payments</h1>
            <div className="reg_buttons">
            <Link to="/adminHome/allCourses"><button >Student Payments</button></Link>
            <Link to="/adminHome/addCourse"><button >Teacher Payments</button></Link>
            <Link to="/adminHome"><button >Pending Payments</button></Link>
        </div>
        </div>
        </div>
        
      );
}
 
export default Payments;