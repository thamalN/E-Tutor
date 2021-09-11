import Sidebar from "../Sidebar";
import { Link } from 'react-router-dom';

const Announcements = () => {
    return (
        <div>
            <Sidebar/>
            <div className="homeContent">
            <h1>Announcements</h1>
            <div className="reg_buttons">
            <Link to="/teacher/announcements/createAnnouncement"><button >Add new Announcement</button></Link>
            <Link to="/teacher/announcements/viewTeacherAnnouncements"><button >View previous Announcements</button></Link>
            <Link to="/teacher/teacherHome"><button >Back to Dashboard</button></Link>
        </div>
        </div>
        </div>
        
      );
}
 
export default Announcements;