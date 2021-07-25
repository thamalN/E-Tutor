import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";

const Notification = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    const dueDate = true ; 
    // let monthNumber = new Date();
    // console.log(monthNumber.getMonth());
    const id = { id: user.user_id };
    const url = "http://localhost:3001/StudentNotification" ;
    const [data, setData] = useState([]);

    useEffect(() => {

        fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(id)
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setData(data)
                console.log(data)
            })

    }, [url])


    return (
        
        <div>
            <Sidebar></Sidebar>
            <div className="homeContent">
                <div className="course-card">
                    <p>Notification</p>
                {dueDate&&<h2>Hellow {user.fname} , I am the notification</h2>}
                </div>
                
            </div>
        </div>


    );
}

export default Notification;