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
        
    useEffect(() => {
        if (results.attachment === null) {
            console.log("no file")
            setData({ ...data, opt: "empty" })
            document.getElementById("replace-file").disabled = true
            document.getElementById("replace-file").required = false
            document.getElementById("check").style.display = "none"
            document.getElementById("file_link").style.display = "none"
            
        }
    },[])


    useEffect(() => {
        const replace = document.getElementById("replace-file")
        const file = document.getElementById("attachment")
        const attach_div = document.getElementById("attach")
        const link =  document.getElementById("file_link")
        if (replace.checked) {
            setData({ ...data, opt: "remove" })
            setData({ ...data, file_name: "" })
            file.disabled = false
            file.style.display = "block"
            attach_div.style.display = "block"
            link.style.display = "none"
            console.log(data.opt)
        } else if(results.attachment !== null){
            setData({ ...data, opt: "exist" })
            setData({ ...data, file_name: results.file_name })
            file.disabled = true
            file.required = false
            file.style.display = "none"
            attach_div.style.display = "none"
            link.style.display = "block"
            

        }
        // if (data.opt === "exist") {
        //     document.getElementById("attach").required = false
        //     document.getElementById("attach").disabled = true
        //     document.getElementById("attach").style.display = "none"
        //     document.getElementById("file_link").style.display = "block"
            
        // } if(data.opt === "remove"){
        //     setData({ ...data, file_name: "" })
        //     document.getElementById("attach").required = false
        //     document.getElementById("attach").disabled = false
        //     document.getElementById("file_name").required = false
        //     document.getElementById("attach").style.display = "block"
        //     document.getElementById("file_link").style.display = "none"
        // }
        // console.log(data.file_name)
    },[data.opt])

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = "http://localhost:3001/editAnnouncement"

        const formData = new FormData(document.getElementById("content-form"))
        formData.append("user_id", data.user_id)
        formData.append("announcement_id", data.announcement_id)
        formData.set("opt", data.opt)
        formData.set("old_file_link", results.attachment)
        console.log(data.opt)

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
                <div className="col-12" id="file_link">
                <label htmlFor="existing_file" className="mt-2">Current File</label>
                <a href={results.attachment} target="_blank" rel="noreferrer">
                                    
                                    {<div >{results.file_name}</div>}
                                    
                                        
                                        </a>
                </div>

                <div id="check" onChange={(e) => setData({ ...data, opt: e.target.value })}>
                            <label htmlFor="replace-file">Replace File</label>
                            <input type="hidden" name="check[0]" value="exist" />
                            <input type="checkbox" id="replace-file" value="remove"/>
                        </div>                    

                {/* <select name="opt" id="opt"
                                        value={data.opt}
                                        onChange={(e) => {
                                            setData({ ...data, opt: e.target.value})
                                        }} required>
                    <option value="" hidden selected> -- Select an option -- </option>                        
                    <option value="exist">Keep existing file</option>
                    <option value="remove">Remove existing file</option>
                                    </select> */}
                
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
                        
                    />
                    
                </div>

            <div className="col-12 mt-4">
        <input type="submit" className="btn btn-dark" value="Edit Announcement"/>
        </div>
    </form>
</div>  );
}
 
export default EditAnnouncement;