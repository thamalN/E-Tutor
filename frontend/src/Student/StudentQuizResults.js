import { useParams, useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import Valid from '@material-ui/icons/CheckCircle';
import Invalid from '@material-ui/icons/Cancel';

const StudentQuizResults = () => {

    const location = useLocation()
    const marks = location.state.marks
    const correct = location.state.correct
    const values = location.state.values

    const quiz = JSON.parse(localStorage.getItem('quiz')).find((item) => item.quiz_id === parseInt(location.state.quiz_id))

    const submittedAnswers = (question_id, answer_id) => {
        const question = values.find(i => i.question_id === question_id)
        const answer = question.answers.find(j => j.answer_id === answer_id)

        const questionIdx = values.findIndex(i => i.question_id === question_id)

        const valid = document.getElementById(answer_id + "-valid")
        const invalid = document.getElementById(answer_id + "-invalid")

        if (correct[questionIdx].correct.includes(answer.answer_id)) {
            if (valid && invalid) {
                valid.style.display = "inline"
                invalid.style.display = "valid"
            }
        } else {
            if (valid && invalid) {
                valid.style.display = "none"
                invalid.style.display = "inline"
            }
        }

        return answer.correct
    }

    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <div className="quiz-details">
                    <div className="quiz-header">
                        <div>
                            <h3 className="quiz-name-1">Quiz Name </h3>
                            <h3 className="quiz-name-2"> - {quiz.quiz_name}</h3>
                        </div>

                        <div>
                            <h3 className="quiz-name-1">Marks </h3>
                            <h3 className="quiz-name-2"> - {marks}</h3>
                        </div>

                    </div>
                    <div>

                        {quiz.questions && quiz.questions.map((value, key) => (
                            <div className="quiz-questions" id={value.question_id} key={key}>
                                <h4>{key + 1}) {value.question}</h4>

                                <div className="quiz-answers" id={key}>
                                    {value.answers && value.answers.map((ans, i) => (
                                        <div className="answerId" key={i}>
                                            <input id={ans.answer_id} name="answers" type="checkbox" checked={submittedAnswers(value.question_id, ans.answer_id)} readOnly />
                                            <label>{ans.answer}</label>
                                            <Valid fontSize="small" className="valid" id={ans.answer_id + "-valid"} style={{ display: "none" }} />
                                            <Invalid fontSize="small" className="invalid" id={ans.answer_id + "-invalid"} style={{ display: "none" }} />

                                        </div>
                                    ))}
                                </div>

                            </div>
                        ))}

                    </div>
                </div>

                <Link to={"/studentHome/studentQuizAttempts/" + quiz.quiz_id}><button className="course-btn">Back</button></Link>
            </div>
        </div>
    );
}

export default StudentQuizResults;