import Sidebar from "../Sidebar"
import { useParams, useHistory } from "react-router";
import { useState } from "react";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const TeacherQuizEdit = () => {
    let { id } = useParams()

    const history = useHistory()

    var quiz = JSON.parse(localStorage.getItem('quiz'))

    const course_id = JSON.parse(localStorage.getItem('course'))[0].course_id

    const [data, setData] = useState(quiz.filter((item) => item.quiz_id === parseInt(id))[0])

    var radio, originalIcons

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

    const addQuestion = () => {
        const questionParent = document.createElement("div");
        questionParent.setAttribute("class", "quiz-questions")

        const newQuestion = document.createElement("input");
        newQuestion.type = "text"
        newQuestion.name = "question"
        newQuestion.required = true

        const icons = document.createElement("div");
        icons.setAttribute("class", "quiz-icons-edit")

        if (originalIcons === undefined)
            originalIcons = document.getElementsByClassName("quiz-icons-edit")[0]

        icons.innerHTML = originalIcons.innerHTML

        const newAnswers = document.createElement("div")
        newAnswers.setAttribute("class", "quiz-answers")

        const Questions = document.getElementsByClassName("quiz-questions")

        var questionID, lastQuestion

        if (Questions.length !== 0) {
            lastQuestion = Questions[Questions.length - 1]
            questionID = lastQuestion.getAttribute("id")
            questionID = parseInt(questionID.slice(8))
        } else {
            questionID = -1
        }

        questionParent.setAttribute("id", "question" + (++questionID).toString())
        newAnswers.setAttribute("id", questionID.toString())

        icons.getElementsByClassName("quiz-icons-add")[0].onclick = function () { addAnswer(questionID) }
        icons.getElementsByClassName("quiz-icons-delete")[0].onclick = function () { deleteQuestion(questionID) }

        if (Questions.length !== 0)
            lastQuestion.insertAdjacentElement('afterend', questionParent)
        else {
            lastQuestion = document.getElementById("quiz-body")
            lastQuestion.insertAdjacentElement('afterbegin', questionParent)
        }

        questionParent.insertAdjacentElement('afterbegin', newQuestion)
        newQuestion.insertAdjacentElement('afterend', newAnswers)
        newAnswers.insertAdjacentElement('afterend', icons)

        questionParent.scrollIntoView()
    }

    const addAnswer = (key) => {
        const questionNo = document.getElementById(key)

        const answerParent = document.createElement("div")
        answerParent.setAttribute("class", "ansParent")
        answerParent.setAttribute("id", "answerId")

        const correct = document.createElement("input")
        correct.type = "checkbox"
        correct.name = "addedCorrect"

        const newAnswer = document.createElement("input")
        newAnswer.type = "text"
        newAnswer.name = "addedAnswer"
        newAnswer.required = true

        const deleteAnswers = document.createElement("div");
        deleteAnswers.setAttribute("class", "delete-icon")

        const deleteIcon = document.getElementById("remove-icon")

        deleteAnswers.innerHTML = deleteIcon.outerHTML
        deleteAnswers.childNodes[0].removeAttribute("style")
        deleteAnswers.onclick = function (e) { deleteAnswer(key, e) }

        questionNo.insertAdjacentElement('beforeend', answerParent)
        answerParent.insertAdjacentElement('afterbegin', correct)
        correct.insertAdjacentElement('afterend', newAnswer)
        newAnswer.insertAdjacentElement('afterend', deleteAnswers)
    }

    const saveChanges = () => {
        let valid = true

        const values = {
            course_id: course_id,
            quiz_id: data.quiz_id,
            quiz_name: data.quiz_name,
            duration: data.duration,
            max_attempts: data.max_attempts,
            deadline: data.deadline,
            questions: []
        }

        let inputs = document.querySelectorAll("[type='text'], [type='date']")

        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].parentNode.style.display !== "none") {
                if (!inputs[i].checkValidity()) {
                    alert("Please fill out all fields")
                    valid = false
                    break
                }
            }
        };

        if (valid) {
            const questions = document.querySelectorAll(".quiz-questions")

            questions.forEach(question => {
                    let questionName = question.childNodes[0].value

                    let questionObj = { question_id: question.getAttribute("questionid"), question: questionName, deleted: question.getAttribute("deleted"), answers: [] }

                    let answers = question.querySelectorAll(".ansParent")
                    answers.forEach(answer => {
                        let answerName = answer.childNodes[1].value
                        let checked = (answer.childNodes[0].checked) ? 1 : 0
                        questionObj.answers.push({ answer_id: answer.getAttribute("answerid"), answer: answerName, correct: checked, deleted: answer.getAttribute("deleted") })
                    })

                    values.questions.push(questionObj)
                
            })

            console.log(values)

            fetch('http://localhost:3001/teacherCourses/editQuiz/', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            }).then(data => {
                history.push("/teacher/courses/" + course_id)
                //history.goBack()
            })

        }

    }

    const deleteQuestion = (key) => {
        const questionNo = document.getElementById("question" + key)
        if (window.confirm("Confirm delete")) {

            if (questionNo.getAttribute("deleted")) {
                questionNo.setAttribute("deleted", 1)
                questionNo.style.display = "none"
            } else {
                questionNo.remove()
            }
        }
    }

    const deleteAnswer = (key, i) => {
        var parent = (i.target !== undefined) ? i.target.parentNode.parentNode.parentNode : undefined

        const questionNo = document.getElementById(key)

        if (window.confirm("Confirm delete")) {
            if (parent !== undefined) {
                if (i.target.tagName === 'svg')
                    parent = i.target.parentNode.parentNode
                parent.remove()
            } else {
                questionNo.childNodes[i].setAttribute("deleted", 1)
                questionNo.childNodes[i].style.display = "none"
            }
        }
    }

    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <form className="quiz-details">
                    <div className="quiz-header">
                        <div>
                            <h3 className="quiz-name-1">Quiz Name</h3>
                            <input
                                type="text"
                                className="quiz-name-2"
                                value={data.quiz_name}
                                onChange={(e) => setData({ ...data, quiz_name: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <h3 className="quiz-name-1">Duration</h3>
                            <input
                                type="text"
                                className="quiz-name-2"
                                value={data.duration}
                                onChange={(e) => setData({ ...data, duration: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <h3 className="quiz-name-1">Max Attempts</h3>
                            <input
                                type="text"
                                className="quiz-name-2"
                                value={data.max_attempts}
                                onChange={(e) => setData({ ...data, max_attempts: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <h3 className="quiz-name-1">Deadline</h3>
                            <input
                                type="date"
                                className="quiz-name-2"
                                value={data.deadline}
                                onChange={(e) => setData({ ...data, deadline: e.target.value })}
                                required
                            />
                        </div>


                        <button onClick={saveChanges} type="button" className="quiz-icons" title="Save Changes">
                            <CheckCircleIcon fontSize="large" />
                        </button>

                    </div>



                    <div className="quiz-body" id="quiz-body" style={{ overflow: "auto" }}>

                        {data.questions && data.questions.map((value, key) => (
                            <div className="quiz-questions" id={"question" + key} key={key} questionid={value.question_id} deleted="0">
                                <input
                                    className="quiz-questions-input"
                                    type="text"
                                    name="question"
                                    value={value.question}
                                    onChange={(e) => {
                                        let dataCopy = { ...data }
                                        dataCopy.questions[key].question = e.target.value
                                        setData(dataCopy)
                                    }}
                                    required
                                />

                                {answerType(value.answers) ? (
                                    <div className="quiz-answers" id={key}>
                                        {value.answers && value.answers.map((value, i) => (
                                            <div id="answerId" key={i} className="ansParent" answerid={value.answer_id} deleted="0">
                                                <input
                                                    type="radio"
                                                    checked={value.correct}
                                                    onChange={(e) => {
                                                        let dataCopy = { ...data }
                                                        dataCopy.questions[key].answers[i].correct = e.target.checked
                                                        setData(dataCopy)
                                                    }}
                                                />

                                                <input
                                                    type="text"
                                                    value={value.answer}
                                                    onChange={(e) => {
                                                        let dataCopy = { ...data }
                                                        dataCopy.questions[key].answers[i].answer = e.target.value
                                                        setData(dataCopy)
                                                    }}
                                                    required
                                                />

                                                <div className="delete-icon" title="Delete Answer" onClick={() => deleteAnswer(key, i)}>
                                                    <CancelOutlinedIcon />
                                                </div>


                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="quiz-answers" id={key}>
                                        {value.answers && value.answers.map((value, i) => (
                                            <div id="answerId" key={i} className="ansParent" answerid={value.answer_id} deleted="0">
                                                <input
                                                    type="checkbox"
                                                    checked={value.correct}
                                                    onChange={(e) => {
                                                        let dataCopy = { ...data }
                                                        dataCopy.questions[key].answers[i].correct = e.target.checked
                                                        setData(dataCopy)
                                                    }}
                                                />

                                                <input
                                                    type="text"
                                                    value={value.answer}
                                                    onChange={(e) => {
                                                        let dataCopy = { ...data }
                                                        dataCopy.questions[key].answers[i].answer = e.target.value
                                                        setData(dataCopy)
                                                    }}
                                                    required
                                                />

                                                <div className="delete-icon" title="Delete Answer" onClick={() => deleteAnswer(key, i)}>
                                                    <CancelOutlinedIcon />
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="quiz-icons-edit">

                                    <div onClick={() => addAnswer(key)} className="quiz-icons-add" title="Add Answer">
                                        <AddCircleOutlineIcon />
                                    </div>
                                    <div onClick={() => deleteQuestion(key)} className="quiz-icons-delete" title="Delete Question">
                                        <DeleteIcon style={{ color: "red" }} />
                                    </div>

                                </div>
                            </div>
                        ))}

                        <button className="course-btn" onClick={addQuestion} type="button" style={{ float: "right" }}>
                            <AddCircleOutlineIcon /> Add Question
                        </button>

                    </div>
                </form>
            </div>

            <div className="quiz-icons-edit" style={{ display: "none" }} id="edit-icons">

                <div className="quiz-icons-add" title="Add Answer">
                    <AddCircleOutlineIcon />
                </div>
                <div className="quiz-icons-delete" title="Delete Question">
                    <DeleteIcon style={{ color: "red" }} />
                </div>

            </div>

            <CancelOutlinedIcon id="remove-icon" style={{ display: "none" }} />

        </div>
    );
}

export default TeacherQuizEdit;