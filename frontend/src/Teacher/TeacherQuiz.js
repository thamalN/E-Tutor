import { useParams, useHistory } from "react-router";
import Sidebar from "../Sidebar";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DoneIcon from '@material-ui/icons/Done';
import TeacherQuizEdit from "./TeacherQuizEdit";
import { Link } from "react-router-dom";

const TeacherQuiz = () => {

    const history = useHistory()

    let { id } = useParams()
    id = id - 1

    var radio;
    const answerType = (arr = []) => {
        let noCorrect = arr.filter((value, key) => (
            value.correct === 1  || value.correct === true
        ))

        if (noCorrect.length === 1)
            radio = 1
        else
            radio = 0
        return radio
    }

    // const addAnswer = (key) => {
    //     document.getElementById("editmode").style.display = "block"
    //     document.getElementById("readmode").style.display = "none"
    //     type = 1

    //     const answerParent = document.createElement("div")
    //     answerParent.setAttribute("class", "ansParent")
    //     answerParent.setAttribute("id", "answerId")

    //     const newAnswer = document.createElement("input")
    //     newAnswer.type = "text"
    //     newAnswer.name = "addedAnswer"
    //     newAnswer.required = true

    //     const correct = document.createElement("input")
    //     correct.type = "checkbox"
    //     correct.name = "addedCorrect"

    //     const questionNo = document.getElementById(key)

    //     questionNo.insertAdjacentElement('beforeend', answerParent)
    //     answerParent.insertAdjacentElement('afterbegin', correct)
    //     correct.insertAdjacentElement('afterend', newAnswer)
    // }

    // const editQuestion = (key) => {
    //     document.getElementById("editmode").style.display = "block"
    //     document.getElementById("readmode").style.display = "none"
    //     type = 2

    //     const question = document.getElementById("question" + key)

    //     editList = question.querySelectorAll("h4, label")

    //     console.log(editList)

    //     for (var i = 0; i < editList.length; i++) {
    //         var input = document.createElement("input")
    //         input.type = "text"
    //         input.setAttribute("value", editList[i].textContent)
    //         editList[i].replaceWith(input)
    //         // input.focus()

    //         inputs.push(input)
    //     }


    // }

    // const saveChanges = (key) => {
    //     document.getElementById("editmode").style.display = "none"
    //     document.getElementById("readmode").style.display = "block"
    //     if (type === 1) {
    //         var answerParent = document.getElementsByClassName("ansParent")

    //         for (var i = 0; i < answerParent.length; i++) {
    //             var quiz = JSON.parse(localStorage.getItem('quiz'))
    //             var answers = {}

    //             let addedAnswer = answerParent[i].querySelector("[name='addedAnswer']")
    //             let addedCorrect = answerParent[i].querySelector("[name='addedCorrect']")

    //             if (!addedAnswer.checkValidity()) {
    //                 alert("fill")
    //                 break
    //             }

    //             answers.answer = addedAnswer.value
    //             answers.correct = (addedCorrect.checked) ? 1 : 0

    //             quiz[id].questions[key].answers.push(answers)

    //             localStorage.setItem('quiz', JSON.stringify(quiz))

    //             history.go(0)
    //         }
    //     } else if (type === 2) {
    //         for (var i = 0; i < editList.length; i++) {
    //             var previous = document.createElement(editList[i].tagName.toLowerCase())
    //             // previous.onclick(editQuestion(key))
    //             previous.textContent = inputs[i].value
    //             inputs[i].replaceWith(previous)
    //         }
    //         history.go(0)
    //     }
    // }

    const quiz = JSON.parse(localStorage.getItem('quiz'))
    console.log(quiz[id])
    console.log(id)

    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <div className="quiz-details">
                    <div className="quiz-header">
                        <h1 className="quiz-name">{quiz[id].quiz_name}</h1>
                        <Link to={window.location.pathname + "/edit"} className="quiz-icons">
                            <EditIcon style={{ color: "green" }} />
                        </Link>
                    </div>

                    <div>

                        {quiz[id].questions.map((value, key) => (
                            <div className="quiz-questions" id={"question" + key} key={key}>
                                <h4>{key + 1}) {value.question}</h4>

                                {answerType(value.answers) ? (
                                    <div className="quiz-answers" id={key}>
                                        {value.answers.map((value, i) => (
                                            <div id="answerId" key={i}>
                                                <input type="radio" value={value.answer_id} name={value.answer_id} checked={value.correct} readOnly/>
                                                <label>{value.answer}</label>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="quiz-answers" id={key}>
                                        {value.answers.map((value, i) => (
                                            <div key={i}>
                                                <input type="checkbox" value={value.answer_id} name={value.answer_id} checked={value.correct} readOnly/>
                                                <label >{value.answer}</label>
                                            </div>
                                        ))}
                                    </div>
                                )}


                                {/* <div className="quiz-icons" id="editmode">
                                    <div onClick={() => saveChanges(key)}>
                                        <DoneIcon />
                                    </div>
                                </div>

                                <div className="quiz-icons" id="readmode">
                                    <div onClick={() => addAnswer(key)}>
                                        <AddCircleOutlineIcon />
                                    </div>
                                    <div onClick={() => editQuestion(key)}>
                                        <EditIcon style={{ color: "green" }} />
                                    </div>
                                    <div>
                                        <DeleteIcon style={{ color: "red" }} />
                                    </div>
                                </div> */}


                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherQuiz;