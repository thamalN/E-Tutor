import Sidebar from "../Sidebar";
import { Link } from 'react-router-dom';

const Announcements = () => {
    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <h1>Announcements</h1>
                <div className="reg_buttons">
                    <Link to="/teacher/announcements/createAnnouncement">Add new Announcement</Link>
                    <Link to="/teacher/announcements/viewTeacherAnnouncements"> View previous Announcements</Link>
                    <Link to="/teacher/teacherHome">Back to Dashboard</Link>
                </div>
            </div>
        </div>

    );
}

export default Announcements;