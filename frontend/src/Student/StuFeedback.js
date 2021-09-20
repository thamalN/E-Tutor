import Sidebar from "../Sidebar";
import { Link } from 'react-router-dom';

const stuFeedback = () => {
    return (
        <div>
            <Sidebar/>
            <div className="homeContent">
            <h1>FeedBack</h1>
            <div className="reg_buttons">
            <Link to="/studentHome/CreateStuFeedback">Add new Feedback</Link>
            <Link to="/studentHome/PreviousFeedback">View previous Feedback</Link>
        </div>
        </div>
        </div>
        
      );
}
 
export default stuFeedback;