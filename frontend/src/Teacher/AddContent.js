import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { useHistory } from "react-router";

const AddContent = () => {

    const history = useHistory()

    const courseInfo = JSON.parse(localStorage.getItem('courseInfo'))
    const courses = JSON.parse(localStorage.getItem('course'))

    const [data, setData] = useState(
        {
            topic: "new",
            name: "",
            content: "",
            fileName: "",
            lesson_id: "",
            course_id: courseInfo.course_id
        }
    );

    useEffect(() => {
        if (data.topic !== "new") {
            document.getElementById("newTopic").previousSibling.style.display = "none"
            document.getElementById("newTopic").required = false
            document.getElementById("newTopic").style.display = "none"
            document.getElementById("content").required = true 
            document.getElementById("file-name").required = true 
            
        } else {
            document.getElementById("newTopic").previousSibling.style.display = "block"
            document.getElementById("newTopic").style.display = "block"
            document.getElementById("newTopic").required = true
            document.getElementById("file-name").required = false
            document.getElementById("content").required = false
            if(document.getElementById("file-name").value !== "")
                document.getElementById("content").required = true
            if(document.getElementById("content").value !== "")
                document.getElementById("file-name").required = true
        }
    })


    const handleSubmit = (e) => {
        e.preventDefault();

        const url = "http://localhost:3001/teacherCourses/addContent"

        const formData = new FormData(document.getElementById("content-form"))
        formData.append("lesson_id", data.lesson_id)
        formData.append("course_id", data.course_id)

        //console.log(formData)

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then((res) => {
                return res.json()
            })
            .then((data => {
                console.log(data)
                history.push("/teacher/courses/" + courseInfo.course_id)
            }))
    }

    const getLessonId = (e) => {
        const filterd = courses.filter(course => (course.topic === e.target.value))
        if (filterd.length !== 0) {
            return filterd[0].lesson_id
        }
        return ""
    }

    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <div className="form-signup">
                <h1 className="h3 mb-3 fw-normal">Add Content</h1>

                    <form onSubmit={handleSubmit} encType="multipart/form-data" id="content-form" className="row g-3">

                            <div className="Row col-12">
                                <div>
                                    <label className="mt-2">Topic</label>
                                    <select
                                        className="form-control"
                                        name="topic"
                                        value={data.topic}
                                        onChange={(e) => {
                                            setData({ ...data, topic: e.target.value, lesson_id: getLessonId(e) })
                                        }}
                                    >
                                        {courses.map((course, i) => (
                                            <option>{course.topic}</option>
                                        ))}
                                        <option value="new">Add New Topic</option>
                                    </select>
                                </div>
                            </div>

                            <div className="Row col-12">
                                <label className="mt-2">New Topic</label>
                                <input
                                    id="newTopic"
                                    className="form-control"
                                    name="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="Row col-12">
                                <label className="mt-2">File Name</label>
                                <input
                                    id="file-name"
                                    className="form-control"
                                    name="fileName"
                                    type="text"
                                    value={data.fileName}
                                    onChange={(e) => setData({ ...data, fileName: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="Row col-12">
                                <label className="mt-2">Content</label>
                                <input
                                    className="form-control"
                                    type="file"
                                    value={data.content}
                                    onChange={(e) => setData({ ...data, content: e.target.value })}
                                    id="content"
                                    name="file"
                                    accept="application/vnd.openxmlformats-officedocument.presentationml.presentation,
                                    application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                                    application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
                                    application/pdf,
                                    audio/*,
                                    video/*"
                                    required
                                />
                            </div>

                            

                        <input type="submit" value="Add Content" className="btn btn-dark add-btn"/>
                        
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddContent;