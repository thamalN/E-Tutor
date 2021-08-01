import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Chatroom from "../Chatroom";
import Sidebar from "../Sidebar";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const CourseDetails = () => {

    const { id } = useParams()
    const [content, setContent] = useState([])
    const [quiz, setQuiz] = useState([])

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
            .then((res => {
                return res.json()
            }))
            .then((data => {
                setQuiz(data)
            }))
    }, [quizUrl])

    if (quiz) {
        localStorage.setItem('quiz', JSON.stringify(quiz))
        console.log(quiz)
    }


    return (
        <div>

            <Sidebar />
            {content[0] && (
                <div className="homeContent">
                    <div className="course-details">
                        <h1>{content[0].course_name} {content[0].year}</h1>
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
                                    filtered.content && <div className="content-name" key={j}>
                                        <a href={filtered.content} target="_blank" rel="noreferrer">
                                            <ul>
                                                <li key={filtered.course_id}>{filtered.content_name}</li>
                                            </ul>
                                        </a>
                                        <EditIcon style={{ color: "green" }} /><DeleteIcon style={{ color: "red" }} />
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
                            {quiz.map((value, key) => (
                                <div className="content-name" key={key}>
                                    <Link to={`/teacher/courses/quiz/${value.quiz_id}`}>
                                        <ul>
                                            <li key={value.quiz_id}>{value.quiz_name}</li>
                                        </ul>
                                    </Link>
                                    <EditIcon style={{ color: "green" }} /><DeleteIcon style={{ color: "red" }} />
                                </div>
                            ))}

                        </div>
                    </div>

                    <hr />
                    <div className="course-discn">
                        <div className="content-add">
                            <h4>Discussions</h4>
                            <Link to="/teacher/addContent">
                                <button className="course-btn">
                                    <AddCircleOutlineIcon /> Add Discussion
                                </button>
                            </Link>
                        </div>
                    </div>

                    <hr />

                    <Chatroom />
                </div>
            )}
        </div>
    );
}

export default CourseDetails;