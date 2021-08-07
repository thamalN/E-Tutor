import Sidebar from "../Sidebar"
import { useParams, useHistory } from "react-router";
import { useState } from "react";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';

const TeacherQuizEdit = () => {
    let { id } = useParams()
    id = id - 1
    const history = useHistory()

    var quiz = JSON.parse(localStorage.getItem('quiz'))

    const [data, setData] = useState(quiz[id])

    console.log(data.questions[0].answers)

    var radio

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

    const addAnswer = (key) => {
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

        // const deleteAnswer = document.createElement("div")
        // deleteAnswer.innerHTML = ""

        const questionNo = document.getElementById(key)

        questionNo.insertAdjacentElement('beforeend', answerParent)
        answerParent.insertAdjacentElement('afterbegin', correct)
        correct.insertAdjacentElement('afterend', newAnswer)

    }

    const saveChanges = (key) => {
        var valid = true
        var answerParent = document.getElementsByClassName("ansParent")
        
        console.log(data)
        quiz[id] = data
        localStorage.setItem('quiz', JSON.stringify(quiz))

        for (var i = 0; i < answerParent.length; i++) {
            //var quiz = JSON.parse(localStorage.getItem('quiz'))
            var answers = {}

            let addedAnswer = answerParent[i].querySelector("[name='addedAnswer']")
            let addedCorrect = answerParent[i].querySelector("[name='addedCorrect']")

            //console.log(addedCorrect)

            answers.answer = addedAnswer.value
            answers.correct = (addedCorrect.checked) ? 1 : 0

            quiz[id].questions[key].answers.push(answers)

            localStorage.setItem('quiz', JSON.stringify(quiz))
        }

        let inputs = document.querySelectorAll("[type='text']")

        console.log(inputs)
        for (var i = 0; i < inputs.length; i++) {
            if (!inputs[i].checkValidity()) {
                alert("fill")
                valid = false
                break
            }
        };
            

        if(valid)
            history.replace("/teacher/courses/quiz/" + (++id))
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
                    </div>

                    <div>

                        {data.questions && data.questions.map((value, key) => (
                            <div className="quiz-questions" id={"question" + key} key={key}>
                                <input
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
                                        {value.answers.map((value, i) => (
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
                                                <div>
                                                    <DeleteIcon style={{ color: "red" }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="quiz-answers" id={key}>
                                        {value.answers.map((value, i) => (
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
                                                <div>
                                                    <DeleteIcon style={{ color: "red" }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div onClick={() => saveChanges(key)}>
                                    <DoneIcon />
                                </div>
                                <div onClick={() => addAnswer(key)} className="quiz-icons">
                                    <AddCircleOutlineIcon />
                                </div>
                            </div>
                        ))}

                    </div>
                </form>
            </div>
        </div>
    );
}

export default TeacherQuizEdit;