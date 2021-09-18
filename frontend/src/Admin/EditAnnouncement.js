import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Sidebar from "../Sidebar";

const EditAnnouncement = () => {
    const history = useHistory()

    const user = JSON.parse(localStorage.getItem('user'));
    const results = JSON.parse(localStorage.getItem('announce'));
    const [data, setData] = useState({
        announcement_id: results.announcement_id,
        topic: results.topic,
        description: results.description,
        file_name: results.file_name,
        attachment: results.attachment,
        user_id: user.user_id
    }
    );

    useEffect(() => {
        if (data.file_name !== "") {
            document.getElementById("attachment").required = true
        }
        else {
            document.getElementById("attachment").required = false
        }
    })

    const toggleDisable = () => {

        const file = document.getElementById("attachment")
        const options = document.getElementById("options")

        if(options.value === "replace" || (options.value === "options" && results.attachment)) {
            document.getElementById("file_name").required = true
        } else {
            document.getElementById("file_name").required = false
        }

        if (options.value === "replace") {
            file.disabled = false
            file.required = true
        } else {
            file.disabled = true
            file.required = false
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = "http://localhost:3001/editAnnouncement"

        const formData = new FormData(document.getElementById("discussion-form"))
        formData.append("user_id", data.user_id)
        formData.append("announcement_id", data.announcement_id)
        formData.set("old_file_link", results.attachment)

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(data => {
                alert("Announcement edited Successfully!")
                history.push("/adminHome/announcements")
            })
    }

    return (
        <div>
            <Sidebar />
            <div className="homeContent">

                <div className="form-signup">
                    <h1 className="h3 mb-3 fw-normal">Edit Announcement</h1>
                    <form onSubmit={handleSubmit} className="row g-3" encType="multipart/form-data" id="discussion-form" onChange={toggleDisable}>

                        <div className="col-12">
                            <label htmlFor="topic" className="mt-2">Topic</label>
                            <input
                                type="text"
                                className="form-control"
                                id="topic"
                                name="topic"
                                value={data.topic}
                                onChange={(e) => setData({ ...data, topic: e.target.value })}
                                required
                            />
                        </div>

                        <div className="col-12">
                            <label htmlFor="description" className="mt-2">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={data.description}
                                onChange={(e) => setData({ ...data, description: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-12" id="file_link">
                            <label htmlFor="existing_file" className="mt-2">Current File</label>
                            {results.attachment ? (
                                <a href={results.attachment} target="_blank" rel="noreferrer">
                                    <div>{results.file_name}</div>
                                </a>
                            ) : <div><small><i>No file attached</i></small></div>}

                        </div>

                        <div>
                            <select name="options" id="options">
                                <option value="options">Options</option>
                                <option value="replace">Add/Replace File</option>
                                <option value="remove" disabled={!results.attachment}>Remove Existing File</option>
                            </select>
                        </div>

                        <div className="col-12">
                            <label htmlFor="file_name" className="mt-2">File Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="file_name"
                                name="file_name"
                                value={data.file_name}
                                onChange={(e) => setData({ ...data, file_name: e.target.value })}
                                
                            />
                        </div>

                        <div className="col-12" id="attach">
                            <label htmlFor="attachment" className="mt-2">Attachments</label>
                            <input
                                type="file"
                                className="form-control"
                                id="attachment"
                                onChange={(e) => setData({ ...data, attachment: e.target.value })}
                                name="file"
                                disabled
                            />
                        </div>

                        <div className="col-12 mt-4">
                            <input type="submit" className="btn btn-dark add-btn" value="Edit Announcement" />
                        </div>
                    </form>
                </div>
            </div>
        </div>);
}

export default EditAnnouncement;