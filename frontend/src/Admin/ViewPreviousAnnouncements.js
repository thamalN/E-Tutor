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
                        <div key={announcement.announcement_id} className="display-card" >
                            <div className="display-card-container">
                                <div className="n-card-container">
                                    <h1>{announcement.topic}</h1>
                                    <h6> By {announcement.fname} {announcement.lname} {announcement.date_time}</h6>
                                    <div><p>{announcement.description}</p></div>
                                    
                                    <a href={announcement.attachment} target="_blank" rel="noreferrer">
                                    
                                    {announcement.attachment && <div>{announcement.file_name}</div>}
                                        
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