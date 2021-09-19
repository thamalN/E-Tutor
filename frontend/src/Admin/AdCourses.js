import Sidebar from "../Sidebar";
import { Link, Route } from 'react-router-dom';

const AdCourses = () => {
    return (
        <div>
            <Sidebar/>
            <div className="homeContent">
            <h1>Courses</h1>
            <div className="reg_buttons">
            <Link to="/adminHome/courses/allCourses">View All Courses</Link>
            <Link to="/adminHome/courses/addNewCourse">Add a new Course</Link>
            <Link to="/adminHome/dashboard">Back to Dashboard</Link>
        </div>
        </div>
        </div>
        
      );
}
 
export default AdCourses;