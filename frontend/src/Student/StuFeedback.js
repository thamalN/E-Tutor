import Sidebar from "../Sidebar";
import { Link } from 'react-router-dom';

const stuFeedback = () => {
    return (
        <div>
            <Sidebar/>
            <div className="homeContent">
            <h1>FeedBacks</h1>
            <div className="reg_buttons">
            <Link to="/studentHome/CreateStuFeedback">Add new Feedback</Link>
            <Link to="/studentHome/PreviousFeedback">View previous Feedback</Link>
            <Link to="/studentHome">Back to Home</Link>
        </div>
        </div>
        </div>
        
      );
}
 
export default stuFeedback;