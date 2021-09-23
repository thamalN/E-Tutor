import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";
import { Link, Route } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const Feedback = () => {

    const [data, setData] = useState([])
    const history = useHistory()

    const user = JSON.parse(localStorage.getItem('user'))

    const url = "https://etutor-backend.herokuapp.com/viewFeedback"

    useEffect(() => {
        fetch(url, {
            credentials: 'include'
        })
            .then((res => {
                return res.json()
            }))
            .then((data => {
                setData(data)
            }))
    }, [url])

    function saveFeedback(feedback){
        console.log(feedback)
        localStorage.setItem('feedback', JSON.stringify(feedback))
        history.push(`/adminHome/feedback/reply/${feedback.feedback_id}`)
    }

    return (
        <div>
            <Sidebar/>
            <div className="homeContent">
            <h1>User Feedback</h1>
            <div className="courses">
                    {data.map((feedback, i) => (
                         <div className="course-card-container" key={i}>
                        <div key={feedback.feedback_id} className="display-card" >
                            <div className="display-card-container">
                                <div className="n-card-container">
                                    <h1>{feedback.topic}</h1>
                                    <h6> By {feedback.fname} {feedback.lname} {feedback.date_time}</h6>
                                    <div><p>{feedback.description}</p></div>
                                    <a href={feedback.attachment} target="_blank" rel="noreferrer">

                                        {feedback.attachment && <div>{feedback.file_name}</div>}

                                    </a>
                                    <button onClick={() => saveFeedback(feedback)} className="btn-small">
                                     Manage
                                    </button>
                                </div>
                            </div>

                        </div>
                        </div>

                       
                    ))}
                </div>
            
        </div>
        </div>
        
      );
}
 
export default Feedback;