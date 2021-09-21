import { useLocation } from "react-router";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";

const MyStudents = () => {

    const location = useLocation()
    const students = location.state.state
    console.log(students)

    return (
        <div>
            <Sidebar />
            <div className="homeContent">

                <div className="form-signup">
                    <h1 className="h3 mb-3 fw-normal">My Students</h1>
                    <table className="table table2">
                        <thead className="thead-dark">
                            <tr>
                                <th>Course ID</th>
                                <th>Course</th>
                                <th>Year</th>
                                <th>Student Name</th>
                            </tr>
                        </thead>

                        <tbody>
                            {students && students.map((student, i) => (
                                <tr key={i}>
                                    {(i !== 0 && students[i].course_id === students[i - 1].course_id) ? <></> : <td rowSpan={students.filter(i => i.course_id === student.course_id).length}>{student.course_id}</td>}
                                    {(i !== 0 && students[i].course_id === students[i - 1].course_id) ? <></> : <td rowSpan={students.filter(i => i.course_id === student.course_id).length}>{student.course_name}</td>}
                                    {(i !== 0 && students[i].course_id === students[i - 1].course_id) ? <></> : <td rowSpan={students.filter(i => i.course_id === student.course_id).length}>{student.year}</td>}
                                    <td><Link className="dropdown-item" to={{
                                        pathname: "/viewUser",
                                        state: {
                                            userId: student.user_id,
                                            userFlag: student.user_flag
                                        }
                                    }}>
                                        {student.fname} {student.lname}
                                    </Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MyStudents;