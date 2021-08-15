import Sidebar from "../Sidebar"
import { useParams, useHistory } from "react-router";
import { useState } from "react";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const TeacherQuizEdit = () => {
    let { id } = useParams()
    id = id - 1
    const history = useHistory()

    var quiz = JSON.parse(localStorage.getItem('quiz'))
    console.log(quiz)
    const course_id = JSON.parse(localStorage.getItem('course'))[0].course_id

    const [data, setData] = useState(quiz[id])

    var radio, originalIcons, deleteIcon

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

        if (deleteIcon === undefined)
            deleteIcon = document.getElementsByClassName("delete-icon")[0]

        deleteAnswers.innerHTML = deleteIcon.innerHTML

        deleteAnswers.onclick = function (e) { deleteAnswer(key, e) }

        questionNo.insertAdjacentElement('beforeend', answerParent)
        answerParent.insertAdjacentElement('afterbegin', correct)
        correct.insertAdjacentElement('afterend', newAnswer)
        newAnswer.insertAdjacentElement('afterend', deleteAnswers)
    }

    const saveChanges = () => {
        var valid = true
        var answerParent = document.getElementsByClassName("ansParent")

        quiz[id] = data

        //console.log(dataCopy)

        var quizAnswers = document.getElementsByClassName("quiz-answers")

        for (var i = 0; i < quizAnswers.length; i++) {
            var addedQuestion = quizAnswers[i].parentNode.querySelector("[name='question']")

            if (quizAnswers[i].children.length === 0 && addedQuestion !== null) {
                var dataCopy = { ...data }
                dataCopy.questions[quizAnswers[i].id] = { question: addedQuestion.value, answers: [] }
                setData(dataCopy)
                //console.log(dataCopy)
            }
        }

        //quiz[id] = data
        //console.log(dataCopy)

        for (var i = 0; i < answerParent.length; i++) {
            var answers = {}

            let addedAnswer = answerParent[i].querySelector("[name='addedAnswer']")
            let addedCorrect = answerParent[i].querySelector("[name='addedCorrect']")

            answers.answer = addedAnswer.value
            answers.correct = (addedCorrect.checked) ? 1 : 0

            let inputs = document.querySelectorAll("[type='text']")

            for (var j = 0; j < inputs.length; j++) {
                if (!inputs[j].checkValidity()) {
                    valid = false
                    break
                }
            };

            if (valid) {
                var parentID = answerParent[i].parentNode.id
                //console.log(dataCopy.questions[parentID])

                if (data.questions[parentID] === undefined) {
                    var addedQuestion = document.getElementById("question" + parentID)
                    var dataCopy = { ...data }
                    dataCopy.questions[parentID] = { question: addedQuestion.querySelector("[name='question']").value, answers: [] }
                    setData(dataCopy)
                    //question_id: parseInt(parentID) + 1,

                } else if (data.questions[parentID].answers === undefined)
                    data.questions[parentID].answers = []
                data.questions[parentID].answers.push(answers)

            } else
                break

        }

       // console.log(dataCopy)

        let inputs = document.querySelectorAll("[type='text']")

        for (var j = 0; j < inputs.length; j++) {
            if (!inputs[j].checkValidity()) {
                alert("Please fill out all fields")
                valid = false
                break
            }
        };

        if (valid) {
            quiz[id] = data
            //setData(dataCopy)
            fetch('http://localhost:3001/teacherCourses/editQuiz/', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(quiz[id])
            }).then(() => {
                localStorage.setItem('quiz', JSON.stringify(quiz))
                history.replace("/teacher/courses/" + course_id)
            })

        }


    }

    const deleteQuestion = (key) => {
        const questionNo = document.getElementById("question" + key)
        if (window.confirm("Confirm delete")) {
            //quiz[id].questions.splice(key, 1)
            quiz[id].questions[key].deleted = true
            questionNo.remove()
            console.log(quiz[id].questions)
            localStorage.setItem('quiz', JSON.stringify(quiz))
        }

    }

    const deleteAnswer = (key, i) => {
        var parent = (i.target !== undefined) ? i.target.parentNode.parentNode.parentNode : undefined

        const questionNo = document.getElementById(key)
        console.log(questionNo.childNodes)

        if (window.confirm("Confirm delete")) {
            if (parent !== undefined) {
                if (i.target.tagName === 'svg')
                    parent = i.target.parentNode.parentNode
                parent.remove()
            } else {
                questionNo.childNodes[i].remove()
                //console.log(i)
                //quiz[id].questions[key].answers.splice(i, 1)
                quiz[id].questions[key].answers[i].deleted = true
            }
        }

        console.log(quiz[id].questions[key].answers)
        localStorage.setItem('quiz', JSON.stringify(quiz))
    }

    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <form className="quiz-details">
                    <div className="quiz-header">
                        <input
                            type="text"
                            className="quiz-name"
                            value={data.quiz_name}
                            onChange={(e) => setData({ ...data, quiz_name: e.target.value })}
                            required
                        />

                        <button onClick={saveChanges} type="button" className="quiz-icons" title="Save Changes">
                            <CheckCircleIcon fontSize="large" />
                        </button>

                    </div>



                    <div className="quiz-body" id="quiz-body">

                        {data.questions && data.questions.map((value, key) => (
                            <div className="quiz-questions" id={"question" + key} key={key}>
                                <input
                                    className="quiz-questions-input"
                                    type="text"
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
                                            <div id="answerId" key={i}>
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
                                            <div id="answerId" key={i}>
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


                        <button className="course-btn" onClick={addQuestion} type="button">
                            <AddCircleOutlineIcon /> Add Question
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default TeacherQuizEdit;