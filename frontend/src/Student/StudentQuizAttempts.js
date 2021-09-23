import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";

const StudentQuizAttempts = () => {

    const { id } = useParams()
    const user = JSON.parse(localStorage.getItem("user"));

    const [attempts, setAttempts] = useState({})

    const url = "https://etutor-backend.herokuapp.com/getQuizAttempts/"

    useEffect(() => {

        fetch(url, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ student_id: user.user_id, quiz_id: id }),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                setAttempts(data)
            })

    }, [url])

    if (attempts.attempts) {
        console.log(attempts)
        var currentAttempts = 0
        if (attempts.attempts.length !== 0) {
            currentAttempts = attempts.attempts.length
        }

        console.log( new Date(attempts.deadline))
        console.log(new Date())

        const attemptBtn = document.getElementById("attempt-btn")
        if(currentAttempts >= attempts.max_attempts || new Date(attempts.deadline) < new Date()) {
            attemptBtn.disabled = true
        } else {
            attemptBtn.disabled = false
        }
        
    }

    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <h1>{attempts.quiz_name}</h1>
                <h4>Duration - {attempts.duration}</h4>
                <h4>Deadline - {attempts.deadline}</h4>

                <table className="table table2">
                    <thead className="thead-dark">
                        <tr>
                            <th>Attempt No</th>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>Attempt Duration</th>
                            <th>Marks</th>
                        </tr>
                    </thead>

                    <tbody>
                        {attempts.attempts && attempts.attempts.map(i => (
                            <tr>
                                <td>{i.attempt_no}</td>
                                <td>{i.date}</td>
                                <td>{i.start_time}</td>
                                <td>{i.attempt_duration}</td>
                                <td>{i.marks}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Link to={`/studentHome/StuQuiz/${attempts.quiz_id}`}><button className="btn btn-outline-dark" id="attempt-btn">Attempt</button></Link>
            </div>
        </div>
    );

}

export default StudentQuizAttempts;