import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StudentNotification = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const dueDate = true;
    // let monthNumber = new Date();
    // console.log(monthNumber.getMonth());
    const id = { id: user.user_id };
    const url = "http://localhost:3001/StudentNotification";
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(id)
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                setNotifications(data)
            })

    }, [url])


    return (

        <div>
            <Sidebar></Sidebar>
            <div className="homeContent">
                {notifications.map((value, key) => (
                    <a href={value.content} target="_blank" rel="noreferrer">
                        <div className="course-card" key={key} >
                            <p>Notification</p>
                            {value.event === "content" && <h2>New content has been added on {value.course_name} {value.year}</h2>}
                        </div>
                    </a>
                ))}


            </div>
        </div>


    );
}

export default StudentNotification;