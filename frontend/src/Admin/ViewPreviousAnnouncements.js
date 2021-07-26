import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";
import { Link, Route } from 'react-router-dom';

const PreviousAnnouncements = () => {

    const [data, setData] = useState([])

    const user = JSON.parse(localStorage.getItem('user'))

    const url = "http://localhost:3001/viewPreviousAnnouncements"

    useEffect(() => {
        fetch(url)
            .then((res => {
                return res.json()
            }))
            .then((data => {
                setData(data)
            }))
    }, [url])

    return (
        <div>
            <Sidebar/>
            <div className="homeContent">
            <h1>Previous Announcements</h1>
            <div className="courses">
                    {data.map(announcement => (
                        <div key={announcement.announcement_id} className="course-card" >
                            <div className="course-card-container">
                                <div className="card-container">
                                    <h1>{announcement.topic}</h1><br></br>
                                    <p>{announcement.description}</p><br></br>
                                    
                                    <a href={announcement.attachment} target="_blank" rel="noreferrer">
                                    <ul>
                                    {announcement.attachment && <li>{announcement.file_name}</li>}
                                        </ul>
                                        </a>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            
        </div>
        </div>
        
      );
}
 
export default PreviousAnnouncements;