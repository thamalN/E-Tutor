import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Chatroom from "../Chatroom";
import Sidebar from "../Sidebar";

const MyCourseDetails = () => {

    const { id } = useParams()
    const [data, setData] = useState([])

    const user = JSON.parse(localStorage.getItem('user'))

    const url = "http://localhost:3001/studentCourses/" + id

    useEffect(() => {
        fetch(url)
            .then((res => {
                return res.json()
            }))
            .then((data => {
                setData(data)
            }))
    }, [url])

    if (data) {
        var unique = [...new Map(data.map(item => [item['lesson_id'], item])).values()];
        localStorage.setItem('course', JSON.stringify(unique))
        console.log(unique)
    }


    return (
        <div>

            <Sidebar />
            {data[0] && (
                <div className="homeContent">
                    <div className="course-details">
                        <h1>{data[0].course_name} {data[0].year}</h1>
                        <h5>Conducted by: {data[0].fname} {data[0].lname}</h5>
                        <p>{data[0].description}</p>
                    </div>
                    <hr />
                    <div className="course-content">
                        <h4>Course Content</h4>


                        {unique.map((lesson, i) => (
                            <div className="lesson">
                                <h5 key={i}>{lesson.topic}</h5>
                                {data.filter(content => (content.lesson_id === lesson.lesson_id)).map((filtered) => (
                                    <a href={filtered.content} target="_blank" rel="noreferrer">
                                        <ul>
                                            {filtered.content && <li key={filtered.course_id}>{filtered.content_name}</li>}
                                        </ul>
                                    </a>
                                ))}

                            </div>
                        ))}

                    </div>

                    <hr />
                    <div className="course-quiz">
                        <h4>Quizzes</h4>
                    </div>
                    
                    <hr />
                    <div className="course-discn">
                        <h4>Discussion</h4>
                    </div>

                    <hr />

                    <Chatroom />
                </div>
            )}
        </div>
    );
}

export default MyCourseDetails;