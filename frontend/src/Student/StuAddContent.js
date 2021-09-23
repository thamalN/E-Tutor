import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { useHistory } from "react-router";

const StuAddContent = () => {

    const history = useHistory()

    const courses = JSON.parse(localStorage.getItem('course'))

    const [data, setData] = useState(
        {
            topic: "new",
            name: "",
            content: "",
            fileName: "",
            lesson_id: "",
            course_id: courses[0].course_id
        }
    );

    useEffect(() => {
        if (data.topic !== "new") {
            document.getElementById("newTopic").required = false
            document.getElementById("newTopic").style.display = "none"
            document.getElementById("content").required = true
            
        } else {
            document.getElementById("newTopic").style.display = "block"
            document.getElementById("content").required = false
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = "https://etutor-backend.herokuapp.com/teacherCourses/addContent"

        const formData = new FormData(document.getElementById("content-form"))
        formData.append("lesson_id", data.lesson_id)
        formData.append("course_id", data.course_id)

        fetch(url, {
            credentials: 'include',
            method: 'POST',
            body: formData,
            credentials: 'include'
        })
            .then((res) => {
                return res.json()
            })
            .then((data => {
                console.log(data)
                history.push("/teacher/courses/" + courses[0].course_id)
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
                <div className="addContent">
                    <form onSubmit={handleSubmit} encType="multipart/form-data" id="content-form">
                        <div className="nameRow">

                            <div className="Row">
                                <div>
                                    <label>Topic</label>
                                    <select
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

                            <div id="newTopic" className="Row">
                                <label>New Topic</label>
                                <input
                                    name="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                />
                            </div>

                            <div className="Row">
                                <label>File Name</label>
                                <input
                                    name="fileName"
                                    type="text"
                                    value={data.fileName}
                                    onChange={(e) => setData({ ...data, fileName: e.target.value })}
                                // required
                                />
                            </div>

                            <div className="Row">
                                <label>Content</label>
                                <input
                                    type="file"
                                    value={data.content}
                                    onChange={(e) => setData({ ...data, content: e.target.value })}
                                    id="content"
                                    name="file"
                                />
                            </div>

                        </div>

                        <input type="submit" value="Add Content" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default StuAddContent;