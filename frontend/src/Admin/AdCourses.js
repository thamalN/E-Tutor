import Sidebar from "../Sidebar";
import { Link, Route } from 'react-router-dom';

const AdCourses = () => {
    return (
        <div>
            <Sidebar/>
            <div className="homeContent">
            <h1>Courses</h1>
            <div className="reg_buttons">
            <Link to="/adminHome/allCourses"><button >View All Courses</button></Link>
            <Link to="/adminHome/addCourse"><button >Add a new Course</button></Link>
            <Link to="/adminHome"><button >Back to Dashboard</button></Link>
        </div>
        </div>
        </div>
        
      );
}
 
export default AdCourses;