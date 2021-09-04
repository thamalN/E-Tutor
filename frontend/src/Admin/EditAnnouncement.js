import { useState } from "react";
import { useHistory } from "react-router";
const EditAnnouncement = () => {
    const history = useHistory()

    const user = JSON.parse(localStorage.getItem('user'));
    const results = JSON.parse(localStorage.getItem('announce'));
    const [data, setData] = useState({
        topic: results.topic,
        description: results.description,
        file_name: results.file_name,
        attachment: results.attachment,
        user_id: user.user_id
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = "http://localhost:3001/editAnnouncement"

        const formData = new FormData(document.getElementById("content-form"))
        formData.append("user_id", data.user_id)

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then((res) => {
                return res.json()
            })
            .then((data => {
                alert("Announcement edited Successfully!")
                history.push("/adminHome/announcements")
            }))
    }

    return (
    <div className="form-signup">
        <h1 className="h3 mb-3 fw-normal">Edit Announcement</h1>
    <form onSubmit = { handleSubmit } className="row g-3"  encType="multipart/form-data" id="content-form">
            
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
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={data.description}
                        onChange={(e) => setData({ ...data, description: e.target.value })}
                        required
                    />
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

                <div className="col-12">
                    <label htmlFor="attachment" className="mt-2">Attachments</label>
                    <input
                        type="file"
                        className="form-control"
                        id="attachment"
                        onChange={(e) => setData({ ...data, attachment: e.target.value })}
                        name="file"
                        
                    />
                    <a href={data.attachment} target="_blank" rel="noreferrer">
                                    
                                    {data.attachment && <div>{data.file_name}</div>}
                                        
                                        </a>
                </div>

            <div className="col-12 mt-4">
        <input type="submit" className="btn btn-dark" value="Add Announcement"/>
        </div>
    </form>
</div>  );
}
 
export default EditAnnouncement;