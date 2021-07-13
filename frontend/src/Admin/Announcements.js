import Sidebar from "../Sidebar";
import { Link } from 'react-router-dom';

const Announcements = () => {
    return (
        <div>
            <Sidebar/>
            <h1 style={{marginLeft: "250px"}}>Announcements</h1>
            <div className="reg_buttons">
            <Link to="/adminHome/createAnnouncement"><button >Add new Announcement</button></Link>
            <Link to="/adminHome/previousAnnouncements"><button >View previous Announcements</button></Link>
            <Link to="/adminHome"><button >Back to Dashboard</button></Link>
        </div>
        </div>
        
      );
}
 
export default Announcements;