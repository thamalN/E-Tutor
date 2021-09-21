import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import data from "@iconify-icons/akar-icons/plus";
import Notifications from "@material-ui/icons/Notifications";

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
            credentials: 'include',
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
                {/* {notifications.payments.map(course => (
                    <div>
                        <h1>{course.course_name} </h1>
                    </div>
                ))} */}

            </div>
        </div>


    );
}

export default StudentNotification;