import Sidebar from "../Sidebar";
import { Link } from 'react-router-dom';

const stuFeedback = () => {
    return (
        <div>
            <Sidebar/>
            <div className="homeContent">
            <h1>Announcements</h1>
            <div className="reg_buttons">
            <Link to="/studentHome/CreateStuFeedback"><button >Add new Feedback</button></Link>
            <Link to="/studentHome/PreviousFeedback"><button >View previous Feedback</button></Link>
            <Link to="/adminHome/dashboard"><button >Back to Dashboard</button></Link>
        </div>
        </div>
        </div>
        
      );
}
 
export default stuFeedback;