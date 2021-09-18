import Sidebar from "../Sidebar";
import { Link, Route } from 'react-router-dom';

const AdCourses = () => {
    return (
        <div>
            <Sidebar/>
            <div className="homeContent">
            <h1>Courses</h1>
            <div className="reg_buttons">
            <Link to="/adminHome/courses/allCourses"><button >View All Courses</button></Link>
            <Link to="/adminHome/courses/addNewCourse"><button >Add a new Course</button></Link>
            <Link to="/adminHome/dashboard"><button >Back to Dashboard</button></Link>
        </div>
        </div>
        </div>
        
      );
}
 
export default AdCourses;