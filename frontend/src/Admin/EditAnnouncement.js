import { useState, useEffect } from "react";
import { useHistory } from "react-router";
const EditAnnouncement = () => {
    const history = useHistory()

    const user = JSON.parse(localStorage.getItem('user'));
    const results = JSON.parse(localStorage.getItem('announce'));
    const [data, setData] = useState({
        opt: "",
        announcement_id: results.announcement_id,
        topic: results.topic,
        description: results.description,
        file_name: results.file_name,
        attachment: results.attachment,
        user_id: user.user_id
        }
    );
        console.log(data.announcement_id)
    useEffect(() => {
        if (results.attachment === "") {
            setData({ ...data, opt: "empty" })
            document.getElementById("opt").required = false
            document.getElementById("opt").style.display = "none"
            document.getElementById("file_link").style.display = "none"
            
        }
    },[])

    useEffect(() => {
        if (data.opt === "exist") {
            document.getElementById("attachment").required = false
            document.getElementById("attachment").style.display = "none"
            document.getElementById("file_link").style.display = "block"
            
        } else if(data.opt === "new"){
            document.getElementById("attachment").required = true
            document.getElementById("attachment").style.display = "block"
            document.getElementById("file_link").style.display = "none"
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = "http://localhost:3001/editAnnouncement"

        const formData = new FormData(document.getElementById("content-form"))
        formData.append("user_id", data.user_id)
        formData.append("announcement_id", data.announcement_id)
        formData.append("opt", data.opt)

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

                <a href={data.attachment} id="file_link" target="_blank" rel="noreferrer">
                                    
                                    {data.attachment && <div >{data.file_name}</div>}
                                        
                                        </a>

                <select name="opt" id="opt"
                                        value={data.opt}
                                        onChange={(e) => {
                                            setData({ ...data, opt: e.target.value})
                                        }} required>
                    <option value="" hidden selected> -- Select an option -- </option>                        
                    <option value="exist">Keep existing file</option>
                    <option value="new">Add new file</option>
                                    </select>
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
                    
                </div>

            <div className="col-12 mt-4">
        <input type="submit" className="btn btn-dark" value="Add Announcement"/>
        </div>
    </form>
</div>  );
}
 
export default EditAnnouncement;