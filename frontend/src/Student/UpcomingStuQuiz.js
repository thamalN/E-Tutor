import { useLocation } from "react-router";
import Sidebar from "../Sidebar";

const UpcomingStuQuiz = () => {

    const location = useLocation()
    const quizzes = location.state.state

    return (
        <div>
            <Sidebar />
            <div className="homeContent">

                <div className="form-signup">
                    <h1 className="h3 mb-3 fw-normal">Upcoming Quizzes</h1>
                    <table className="table table2">
                        <thead className="thead-dark">
                            <th>Course ID</th>
                            <th>Course</th>
                            <th>Year</th>
                            <th>Quiz Name</th>
                            <th>Deadline</th>
                        </thead>

                        <tbody>
                            {quizzes && quizzes.map((quiz, i) => (
                                <tr>
                                    {(i !== 0 && quizzes[i].course_id === quizzes[i - 1].course_id) ? <></> : <td rowSpan={quizzes.filter(i => i.course_id === quiz.course_id).length}>{quiz.course_id}</td>}
                                    {(i !== 0 && quizzes[i].course_id === quizzes[i - 1].course_id) ? <></> : <td rowSpan={quizzes.filter(i => i.course_id === quiz.course_id).length}>{quiz.course_name}</td>}
                                    {(i !== 0 && quizzes[i].course_id === quizzes[i - 1].course_id) ? <></> : <td rowSpan={quizzes.filter(i => i.course_id === quiz.course_id).length}>{quiz.year}</td>}
                                    <td>{quiz.quiz_name}</td>
                                    <td>{quiz.deadline}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UpcomingStuQuiz;