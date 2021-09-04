import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Sidebar from "../Sidebar"
import { useHistory } from "react-router";
import DeleteIcon from '@material-ui/icons/Delete';

const AllCourses = () => {
    const [data, setData] = useState([])
    const [delcourse, setDelCourse] = useState([])
    const history = useHistory()
    const url = "http://localhost:3001/AllCourses"



    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setData(data)
                console.log(data)
            })

        }, [delcourse])

        const handleDelete = (key) => {
            if (window.confirm("Are you sure you want to delete the course with course id " + key + "?")) {
                const id = { id: key }
            const url3 = "http://localhost:3001/deleteCourse"
        
                fetch(url3, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(id)
            })
                    .then((res => {
                        return res.json()
                    }))
                    .then((data => {
        
                        if (data.status === "ok") {
                            setDelCourse(data)
                            alert("Course deleted Successfully!")
                            history.push("/adminHome/allCourses")
                            
                          } 
                          else {
                            alert("Sorry the task couldn't be completed");
                            history.push("/adminHome/allCourses")
                            
                          }
                        
                    }))
                }
                
            
        }


    return (
        <div>

            <Sidebar />
            <div className="homeContent">
                <div className="courses">
                    {data.map(course => (
                        <div key={course.course_id} className="course-card" >
                            
                            <Link to={`/teacher/courses/${course.course_id}`} className="course-card-container">
                                <div className="card-container">
                                
                                <h1>{course.course_name} {course.year}</h1>
                                    <p>{course.description}</p>
                                    
                                </div>
                            </Link>
                            <div  className="download_icons">
                                <button className="btnnew"   onClick={() => handleDelete(course.course_id)}> Delete<DeleteIcon style={{ color: "red" }}/></button>
                                </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>);

}

export default AllCourses;