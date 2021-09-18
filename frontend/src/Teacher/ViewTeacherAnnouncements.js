import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link, Route } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const PreviousAnnouncements = () => {

    const [data, setData] = useState([])
    const [del, setDel] = useState([])
    const history = useHistory()

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
    }, [del])

    const handleEdit = (announcement) => {
        console.log(announcement.attachment)
        localStorage.setItem('announce', JSON.stringify(announcement))
        history.push("/teacher/announcements/editAnnouncement")

    }

    const handleDelete = (key) => {
        if (window.confirm("Are you sure you want to delete announcement id " + key + "?")) {
            const id = { id: key }
            const url3 = "http://localhost:3001/deleteAnnouncement"

            fetch(url3, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(id)
            })
                .then((res => {
                    return res.json()
                }))
                .then((data => {

                    if (data.status === "ok") {
                        setDel(data)
                        alert("Announcement deleted Successfully!")
                        history.push("/teacher/announcements/viewTeacherAnnouncements")

                    }
                    else {
                        alert("Sorry the task couldn't be completed");
                        history.push("/teacher/announcements/viewTeacherAnnouncements")

                    }

                }))
        }


    }
    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <h1>Previous Announcements</h1>
                <div className="courses">
                    {data.map(announcement => (
                        <div key={announcement.announcement_id} className="display-card" >
                            <div className="display-card-container">
                                <div className="n-card-container">
                                    <div className="download_icons">
                                        {announcement.added_by === user.user_id && (
                                            <div>
                                                <button className="btnnew" onClick={() => handleEdit(announcement)}> Edit<EditIcon style={{ color: "green" }} /></button>
                                                <button className="btnnew" onClick={() => handleDelete(announcement.announcement_id)}> Delete<DeleteIcon style={{ color: "red" }} /></button>
                                            </div>
                                        )}

                                    </div>

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