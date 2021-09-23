import Sidebar from "../Sidebar";
import { useLocation, useHistory } from "react-router";
import { useState } from "react";

const EditContent = () => {

    const history = useHistory()
    const location = useLocation()
    const contentInfo = location.state

    const fileName = decodeURI(contentInfo.contentPath).toString().split("\\").pop()
    const relativePath = decodeURI(contentInfo.contentPath).toString().split("/").pop()

    const [data, setData] = useState(contentInfo)

    const handleSubmit = (e) => {
        e.preventDefault()

        const form = document.getElementById("content-form")

        const url = "https://etutor-backend.herokuapp.com/teacherCourses/editContent"

        const formData = new FormData(form)
        formData.append('lesson_id', data.lessonId)
        formData.append('content_id', data.contentId)
        formData.append('old_path', relativePath)

        fetch(url, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        })
            .then((data => {
                history.goBack()
            }))


    }

    const toggleDisable = () => {
        const replace = document.getElementById("replace-file")
        const file = document.getElementById("file")

        if (replace.checked) {
            file.disabled = false
            file.required = true
        } else {
            file.disabled = true
            file.required = false
        }
    }

    return (
        <div>
            <Sidebar />
            <div className="homeContent">

                <div className="form-signup">
                    <h1 className="h3 mb-3 fw-normal">Edit Content</h1>
                    <form className="row g-3" encType="multipart/form-data" id="content-form" onChange={toggleDisable} onSubmit={handleSubmit}>

                        <div className="col-12">
                            <label htmlFor="file_name" className="mt-2">File Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="file_name"
                                name="file_name"
                                value={data.contentName}
                                onChange={(e) => {
                                    setData({ ...data, contentName: e.target.value })
                                }}
                                required
                            />
                        </div>

                        <a href={data.contentPath} target="_blank" rel="noreferrer">{fileName}</a>

                        <div >
                            <label htmlFor="replace-file">Replace File</label>
                            <input type="checkbox" id="replace-file" />
                        </div>

                        <div className="col-12">
                            <label htmlFor="attachment" className="mt-2">Content</label>
                            <input
                                type="file"
                                className="form-control"
                                id="file"
                                name="file"
                                accept="application/vnd.openxmlformats-officedocument.presentationml.presentation,
                                    application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                                    application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
                                    application/pdf,
                                    audio/*,
                                    video/*"
                                disabled
                            />

                        </div>

                        <input type="submit" className="btn btn-dark add-btn" value="Edit Content" />
                    </form>
                </div>

            </div>
        </div>
    );
}

export default EditContent;