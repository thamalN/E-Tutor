import { useParams, useHistory } from "react-router";
import Sidebar from "../Sidebar";
import EditIcon from '@material-ui/icons/Edit';
import { Link } from "react-router-dom";

const StuQuiz = () => {

    let { id } = useParams()
    //id = id - 1

    var radio;
    const answerType = (arr = []) => {
        let noCorrect = arr.filter((value, key) => (
            value.correct === 1 || value.correct === true
        ))

        if (noCorrect.length === 1)
            radio = 1
        else
            radio = 0
        return radio
    }

    const quiz = JSON.parse(localStorage.getItem('quiz')).find((item) => item.quiz_id === parseInt(id))

    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <div className="quiz-details">
                    <div className="quiz-header">
                        <div>
                            <h3 className="quiz-name-1">Quiz Name </h3>
                            <h3 className="quiz-name-2"> - {quiz.quiz_name}</h3>
                            <Link to={window.location.pathname + "/edit"} className="quiz-icons" title="Edit Quiz">
                                <EditIcon style={{ color: "#3ca730" }} fontSize="large" />
                            </Link>
                        </div>

                        <div>
                            <h3 className="quiz-name-1">Duration </h3>
                            <h3 className="quiz-name-2"> - {quiz.duration}</h3>
                        </div>

                        <div>
                            <h3 className="quiz-name-1">Max Attempts </h3>
                            <h3 className="quiz-name-2"> - {quiz.max_attempts}</h3>
                        </div>

                        <div>
                            <h3 className="quiz-name-1">Deadline </h3>
                            <h3 className="quiz-name-2"> - {quiz.deadline}</h3>
                        </div>
                    </div>

                    <div>

                        {quiz.questions && quiz.questions.map((value, key) => (
                            <div className="quiz-questions" id={"question" + key} key={key}>
                                <h4>{key + 1}) {value.question}</h4>

                                {answerType(value.answers) ? (

                                    <div className="quiz-answers" id={key}>
                                        {value.answers && value.answers.map((value, i) => (
                                            <div id="answerId" key={i}>
                                                <input type="radio" value={value.answer_id} name={value.answer_id} checked={value.correct} readOnly />
                                                <label>{value.answer}</label>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="quiz-answers" id={key}>
                                        {value.answers && value.answers.map((value, i) => (
                                            <div key={i}>
                                                <input type="checkbox" value={value.answer_id} name={value.answer_id} checked={value.correct} readOnly />
                                                <label >{value.answer}</label>
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default StuQuiz;