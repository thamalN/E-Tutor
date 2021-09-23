import Sidebar from "../Sidebar";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useHistory } from "react-router";

const StuAddQuiz = () => {
    const history = useHistory()

    const addAnswer = (questionParent) => {
        const answerParent = document.createElement("div")
        answerParent.setAttribute("class", "answerParent")

        const newAnswer = document.createElement("input")
        newAnswer.setAttribute("class", "answerInput")
        newAnswer.type = "text"
        newAnswer.placeholder = "Type an answer..."
        newAnswer.name = "answer"

        const correctAns = document.createElement("input")
        correctAns.type = "checkbox"
        correctAns.name = "correct"

        const deleteAnswer = document.createElement("button");
        deleteAnswer.innerHTML = "Delete"
        deleteAnswer.setAttribute("type", "button")
        deleteAnswer.id = "deleteAnswer"
        deleteAnswer.onclick = (() => answerParent.remove())

        questionParent.insertAdjacentElement('beforeend', answerParent)
        answerParent.insertAdjacentElement('afterbegin', newAnswer)
        newAnswer.insertAdjacentElement('afterend', correctAns)
        correctAns.insertAdjacentElement('afterend', deleteAnswer)
    }

    const addQuestion = () => {
        const questionBorder = document.createElement("hr")

        const questionParent = document.createElement("div");
        questionParent.setAttribute("class", "questionParent")

        const inputParent = document.createElement("div")
        inputParent.setAttribute("class", "inputParent")

        const newQuestion = document.createElement("input");
        newQuestion.setAttribute("class", "questionInput")
        newQuestion.type = "text"
        newQuestion.placeholder = "Type a question..."
        newQuestion.name = "question"

        const deleteQuestion = document.createElement("button");
        deleteQuestion.innerHTML = "Delete"
        deleteQuestion.setAttribute("type", "button")
        deleteQuestion.id = "deleteQuestion"
        deleteQuestion.onclick = (() => {
            questionParent.remove()
            questionBorder.remove()
        })

        const ansBtnParent = document.createElement("div");
        ansBtnParent.setAttribute("class", "ansBtnParent")

        const newAnswer = document.createElement("label")
        newAnswer.appendChild(document.createTextNode("Add Answer"));

        const ansBtn = document.createElement("button")
        ansBtn.innerHTML = "Add"
        ansBtn.setAttribute("type", "button")
        ansBtn.onclick = (() => addAnswer(questionParent));
        ansBtn.id = "addanswer"

        const addBtn = document.getElementById("question-label");

        addBtn.insertAdjacentElement('afterend', questionBorder)
        questionBorder.insertAdjacentElement('afterend', questionParent)
        questionParent.insertAdjacentElement('afterbegin', inputParent)
        inputParent.insertAdjacentElement('afterbegin', newQuestion)
        newQuestion.insertAdjacentElement('afterend', deleteQuestion)
        inputParent.insertAdjacentElement('afterend', ansBtnParent)
        ansBtnParent.insertAdjacentElement('afterbegin', newAnswer)
        newAnswer.insertAdjacentElement('afterend', ansBtn)
    }

    const handleSubmit = ((e) => {
        e.preventDefault()

        var values = {
            course_id: JSON.parse(localStorage.getItem('course'))[0].course_id,
            name: "",
            questions: [{
                question: "",
                answers: [{
                    answer: "",
                    correct: false
                }]
            }]
        }

        values.name = document.querySelector("[name='quizName']").value

        var parent = document.getElementsByClassName("questionParent")

        for (var i = 0; i < parent.length; i++) {
            var question = parent[i].querySelector("[name='question']")

            values.questions[i] = { question: question.value, answers: [] }

            var answers = parent[i].querySelectorAll("[name='answer']")
            var correct = parent[i].querySelectorAll("[name='correct']")

            for (var j = 0; j < answers.length; j++) {
                values.questions[i].answers.push({answer: answers[j].value, correct: correct[j].checked })
            }
        }

        let url = "https://etutor-backend.herokuapp.com/StudentCourses/StuaddQuiz"

        fetch(url, {
            credentials: 'include',
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify(values)
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                history.goBack()
            })
    })

    return (
        <div>
            <Sidebar />
            <div className="homeContent">
                <div className="addContent">
                    <form id="quiz-form" className="quiz-form" onSubmit={handleSubmit}>

                        <div className="Row">
                            <label>Quiz Name</label>
                            <input
                                name="quizName"
                                type="text"
                            />
                        </div>

                        <div className="questionLabel" id="question-label">
                            <label>Add Question</label>
                            <button id="addquestion" type="button" onClick={addQuestion}><AddCircleOutlineIcon /></button>
                        </div>

                        <button className="course-btn" type="submit">Add Quiz</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default StuAddQuiz;