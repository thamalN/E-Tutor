import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Chatroom from "../Chatroom";
import Sidebar from "../Sidebar";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PeopleIcon from '@material-ui/icons/People';
import { useHistory } from "react-router";

const CourseDetails = () => {

    const history = useHistory()

    const { id } = useParams()
    const [content, setContent] = useState([])
    const [quiz, setQuiz] = useState([])
    const [discussion, setDiscussion] = useState([])

    const [edited, setEdited] = useState(0)

    const user = JSON.parse(localStorage.getItem('user'))

    const contentUrl = "http://localhost:3001/teacherCourses/content/" + id

    useEffect(() => {
        fetch(contentUrl)
            .then((res => {
                return res.json()
            }))
            .then((data => {
                setContent(data)
            }))
    }, [contentUrl])

    if (content) {
        var unique = [...new Map(content.map(item => [item['lesson_id'], item])).values()];
        localStorage.setItem('course', JSON.stringify(unique))
    }

    const quizUrl = "http://localhost:3001/teacherCourses/quiz/" + id

    useEffect(() => {
        fetch(quizUrl)
            .then(res => {
                return res.json()
            })
            .then(data => {
                //console.log(data)
                setQuiz(data)
            })
    }, [quizUrl])

    if (quiz) {
        //console.log(quiz)
        localStorage.setItem('quiz', JSON.stringify(quiz))
        var quizDetails = [...new Map(quiz.map(item => [item['quiz_id'], item])).values()];
    }

    const discussionUrl = "http://localhost:3001/teacherCourses/discussion/" + id

    useEffect(() => {
        fetch(discussionUrl)
            .then(res => {
                return res.json()
            })
            .then(data => {
               // console.log(data)
                setDiscussion(data)
            })
    }, [discussionUrl])

    if (discussion) {
        localStorage.setItem('discussion', JSON.stringify(discussion))
        var uniqueDisc = [...new Map(discussion.map(item => [item['discussion_id'], item])).values()];
    }

    //console.log(quiz)

    const editContent = (id) => {
        const updatedFile = document.getElementById("edit-content")
        updatedFile.click()

        console.log(updatedFile)

        if (updatedFile.value !== "") {
            const formData = new FormData(document.getElementById("edit-content-form"))
            formData.append("content_id", id)

            if (window.confirm("Confirm update")) {
                console.log(formData)
                fetch("http://localhost:3001/teacherCourses/editContent", {
                    method: 'POST',
                    body: formData
                }).then(data => console.log(data))
            }
        }
    }

    const deleteContent = (id, path) => {

        const relativePath = path.toString().split("/").pop()

        const url = "http://localhost:3001/teacherCourses/deleteContent/"

        if (window.confirm("Confirm Delete")) {
            fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content_id: id, content_path: relativePath })
            })
                .then((data) => {
                    history.go(0)
                })
        }
    }

    const editDetails = (e) => {

        const details = document.querySelector(".course-details")
        const editBtn = details.childNodes[1]
        editBtn.style.display = "none"

        const heading = details.childNodes[0]

        const headingInput = document.createElement("input");
        headingInput.setAttribute("value", heading.textContent);
        headingInput.style.marginBottom = "5px"
        headingInput.style.padding = "5px"
        headingInput.style.width = "100%"
        headingInput.style.fontWeight = "bold"
        headingInput.style.fontSize = "25px"
        heading.replaceWith(headingInput);

        const description = details.childNodes[3]

        const descriptionInput = document.createElement("textarea");
        descriptionInput.innerHTML = description.textContent;
        description.replaceWith(descriptionInput);
        descriptionInput.style.width = "100%"
        descriptionInput.rows = 5

        const saveBtn = document.createElement("button");
        saveBtn.setAttribute("class", "course-edit-btn")
        saveBtn.innerHTML = "Save Changes"

        descriptionInput.insertAdjacentElement('afterend', saveBtn)


        const save = function () {
            let year = headingInput.value.toString().slice(-4)
            let courseName = headingInput.value.toString().replace(year, '').trim()
            const edited = { course_id: parseInt(id), course_name: courseName, year: parseInt(year), description: descriptionInput.value.toString() }

            const url = "http://localhost:3001/teacherCourses/editCourseDetails"
            fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(edited)
            }).then(data => {
                history.go(0)
            })
        };

        saveBtn.onclick = save

    }

    const deleteQuiz = (id) => {
        if (window.confirm("Confirm Delete")) {
            fetch("http://localhost:3001/teacherCourses/deleteQuiz/" + id)
                .then((data) => {
                    history.go(0)
                })
        }
    }

    return (
        <div>

            <Sidebar />
            {content[0] && (
                <div className="homeContent">
                    <div className="course-details">
                        <h1 style={{ display: "inline" }}>{content[0].course_name} {content[0].year}</h1>
                        <button className="edit-btn" style={{ float: "right" }} onClick={editDetails}>
                            <EditIcon style={{ color: "#3ca730" }} fontSize="large" />
                        </button>
                        <h5>Conducted by: {user.fname} {user.lname}</h5>
                        <p>{content[0].description}</p>
                    </div>
                    <hr />
                    <div className="course-content">
                        <div className="content-add">
                            <h4>Course Content</h4>
                            <Link to="/teacher/addContent">
                                <button className="course-btn">
                                    <AddCircleOutlineIcon /> Add Content
                                </button>
                            </Link>
                        </div>

                        {unique.map((lesson, i) => (
                            <div className="lesson" key={i}>
                                <h5>{lesson.topic}</h5>
                                {content.filter(content => (content.lesson_id === lesson.lesson_id)).map((filtered, j) => (
                                    filtered.content && <div className="content-name" key={j} id={filtered.content_id}>
                                        <a href={filtered.content} target="_blank" rel="noreferrer" className="name-sub">
                                            <ul>
                                                <li key={filtered.course_id}>{filtered.content_name}</li>
                                            </ul>
                                        </a>
                                        {/* <button onClick={() => editContent(filtered.content_id)} type="button" title="Edit Content"> */}
                                        <EditIcon style={{ color: "green" }} />
                                        {/* </button> */}
                                        <form encType="multipart/form-data" id="edit-content-form" hidden>
                                            <input
                                                type="file"
                                                id="edit-content"
                                                name="file"
                                            />
                                        </form>
                                        <Link to="#" onClick={() => deleteContent(filtered.content_id, filtered.content)} className="delete-quiz">
                                            <DeleteIcon style={{ color: "red" }} />
                                        </Link>
                                    </div>
                                ))}

                            </div>
                        ))}

                    </div>

                    <hr />
                    <div className="course-quiz">
                        <div className="content-add">
                            <h4>Quizzes</h4>
                            <Link to="/teacher/addQuiz">
                                <button className="course-btn">
                                    <AddCircleOutlineIcon /> Add Quiz
                                </button>
                            </Link>
                        </div>

                        <div className="quiz">
                            {quizDetails.map((value, key) => (
                                <div className="content-name" key={key}>
                                    <Link to={`/teacher/courses/quiz/${value.quiz_id}`} className="name-sub">
                                        <ul>
                                            <li key={value.quiz_id}>{value.quiz_name}</li>
                                        </ul>
                                    </Link>
                                    <Link to={window.location.pathname.replace(id, "quiz/" + value.quiz_id + "/edit")} className="edit-quiz">
                                        <EditIcon style={{ color: "green" }} />
                                    </Link>
                                    <Link to="#" onClick={() => deleteQuiz(value.quiz_id)} className="delete-quiz">
                                        <DeleteIcon style={{ color: "red" }} />
                                    </Link>
                                </div>
                            ))}

                        </div>
                    </div>

                    <hr />
                    <div className="course-discn">
                        <div className="content-add">
                            <h4>Discussions</h4>
                            <Link to="/teacher/addDiscussion">
                                <button className="course-btn">
                                    <AddCircleOutlineIcon /> Add Discussion
                                </button>
                            </Link>
                        </div>

                        <div className="quiz">
                            {uniqueDisc.map((value, key) => (
                                <div className="discn-name" key={key}>
                                    <Link to={`/teacher/courses/discussion/${value.discussion_id}`}>
                                        <ul>
                                            <li key={value.discussion_id}>{value.topic}</li>
                                        </ul>
                                    </Link>
                                    <span>
                                        <sub>by </sub>
                                        <b>{value.post_fname} {value.post_lname}</b>
                                        <sub> on </sub>
                                        <i>{value.post_datetime.slice(0, 16).replace(' ', ', ')}</i>
                                    </span>
                                    <EditIcon style={{ color: "green" }} /><DeleteIcon style={{ color: "red" }} />
                                </div>
                            ))}

                        </div>
                    </div>

                    <hr />

                    <Link to="/teacher/meeting">
                        <div className="meeting-toggle" title="New Meeting">
                            <PeopleIcon fontSize="medium" style={{ color: "white" }} className="meeting-icon" />
                        </div>

                    </Link>

                    <div title="Chat Room">
                        <Chatroom />
                    </div>
                </div>
            )}
        </div>
    );
}

export default CourseDetails;