import Sidebar from "../Sidebar";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { useHistory } from "react-router";

const AddQuiz = () => {
    const history = useHistory()

    const addAnswer = (questionID) => {
        const questionNo = document.getElementById(questionID)

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
        newAnswer.placeholder = "Type an answer..."
        newAnswer.classList.add("add-quiz-inputs")

        const deleteAnswers = document.createElement("div");
        deleteAnswers.setAttribute("class", "delete-icon")

        const deleteIcon = document.getElementById("remove-icon")

        deleteAnswers.innerHTML = deleteIcon.outerHTML
        deleteAnswers.childNodes[0].removeAttribute("style")
        deleteAnswers.onclick = function (e) { deleteAnswer(e) }

        questionNo.insertAdjacentElement('beforeend', answerParent)
        answerParent.insertAdjacentElement('afterbegin', correct)
        correct.insertAdjacentElement('afterend', newAnswer)
        newAnswer.insertAdjacentElement('afterend', deleteAnswers)
    }

    const addQuestion = () => {
        const questionBorder = document.createElement("hr")

        const questionParent = document.createElement("div");
        questionParent.setAttribute("class", "quiz-questions")

        const newQuestion = document.createElement("input");
        newQuestion.type = "text"
        newQuestion.name = "question"
        newQuestion.required = true
        newQuestion.placeholder = "Type a question..."
        newQuestion.classList.add("add-quiz-inputs")

        const editIcons = document.getElementById("edit-icons")

        const icons = document.createElement("div");
        icons.setAttribute("class", "quiz-icons-edit")

        icons.innerHTML = editIcons.innerHTML
        icons.removeAttribute("style")

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
            lastQuestion.insertAdjacentElement('afterend', questionBorder)
        else {
            lastQuestion = document.getElementById("quiz-deadline")
            lastQuestion.insertAdjacentElement('afterend', questionBorder)
        }

        questionBorder.insertAdjacentElement('afterend', questionParent)
        questionParent.insertAdjacentElement('afterbegin', newQuestion)
        newQuestion.insertAdjacentElement('afterend', newAnswers)
        newAnswers.insertAdjacentElement('afterend', icons)

        questionParent.scrollIntoView()
    }

    const deleteQuestion = (questionID) => {
        const questionNo = document.getElementById("question" + questionID)
        if (window.confirm("Confirm delete")) {
            let tmp = questionNo.previousSibling
            console.log(tmp.tagName)
            if(tmp.tagName === "HR")
                tmp.remove()
            questionNo.remove()
        }
    }

    const deleteAnswer = (e) => {
        var parent = e.target.parentNode.parentNode.parentNode

        if (window.confirm("Confirm delete")) {
            if (e.target.tagName === 'svg')
                parent = e.target.parentNode.parentNode
            parent.remove()

        }
    }

    const handleSubmit = ((e) => {
        e.preventDefault()

        var values = {
            course_id: JSON.parse(localStorage.getItem('course'))[0].course_id,
            name: "",
            duration: 0,
            attempts: 0,
            deadline: null,
            questions : []
        }

        values.name = document.querySelector("[name='quizName']").value
        values.duration = document.querySelector("[name='duration']").value
        values.attempts = document.querySelector("[name='attempts']").value
        values.deadline = document.querySelector("[name='deadline']").value

        var parent = document.getElementsByClassName("quiz-questions")

        for (var i = 0; i < parent.length; i++) {
            var question = parent[i].querySelector("[name='question']")

            values.questions.push( { question: question.value, answers: [] } )

            var answers = parent[i].querySelectorAll("[name='addedAnswer']")
            var correct = parent[i].querySelectorAll("[name='addedCorrect']")

            for (var j = 0; j < answers.length; j++) {
                values.questions[i].answers.push({ answer: answers[j].value, correct: correct[j].checked })
            }
        }

        let url = "http://localhost:3001/teacherCourses/addQuiz"

        fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values)
        })
            .then(data => {
                history.goBack()
            })
    })

    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <div className="form-signup">
                    <h1 className="h3 mb-3 fw-normal">Add Quiz</h1>

                    <form id="quiz-form" className="quiz-form" onSubmit={handleSubmit} className="row g-3" style={{flexDirection:"column"}}>

                        <div className="Row col-12" id="quiz-name">
                            <label>Quiz Name</label>
                            <input
                                className="form-control"
                                name="quizName"
                                type="text"
                                required
                            />
                        </div>

                        <div className="Row col-12" id="quiz-duration">
                            <label>Duration (in minutes)</label>
                            <input
                                className="form-control"
                                name="duration"
                                type="text"
                                required
                            />
                        </div>

                        <div className="Row col-12" id="quiz-attempts">
                            <label>Max Attempts</label>
                            <input
                                className="form-control"
                                name="attempts"
                                type="text"
                                required
                            />
                        </div>

                        <div className="Row col-12" id="quiz-deadline">
                            <label>Deadline</label>
                            <input
                                className="form-control"
                                name="deadline"
                                type="date"
                                required
                            />
                        </div>

                        <button className="add-question-btn" onClick={addQuestion} type="button">
                            <AddCircleOutlineIcon /> Add Question
                        </button>

                        <button className="btn btn-dark add-btn" type="submit">Add Quiz</button>
                    </form>

                </div>
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

export default AddQuiz;