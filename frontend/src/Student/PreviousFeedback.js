import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const PreviousFeedback = () => {

    const [data, setData] = useState([])

    const user = JSON.parse(localStorage.getItem('user'))

    const url = "http://localhost:3001/PreviousFeedback/" + user.user_id

    useEffect(() => {
        fetch(url)
            .then((res => {
                return res.json()
            }))
            .then((data => {
                setData(data)
                console.log(data)
            }))
    }, [])

    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <h1>Previous Feedbacks</h1>
                <div className="courses">
                    {data.map(feedback => (
                        <div key={feedback.feedback_id} className="display-card" >
                            <div className="display-card-container">
                                <div className="n-card-container">
                                    <div className="download_icons">
                                    </div>

                                    <h1>{feedback.topic}</h1>
                                    <h6> Created date: {feedback.date_time}</h6>
                                    <div><p>{feedback.description}</p></div>

                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>

    );
}

export default PreviousFeedback;