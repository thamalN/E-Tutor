import { useParams, useHistory } from "react-router";
import Sidebar from "../Sidebar";
import { useEffect } from "react";


const StuQuiz = () => {
    let { id } = useParams()

    const history = useHistory()

    const quiz = JSON.parse(localStorage.getItem('quiz')).find((item) => item.quiz_id === parseInt(id))

    const user = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        startTimer(quiz.duration)
    })

    var time, startTime, startString, currentTime

    function startTimer(duration) {
        startTime = new Date()
        startString = startTime.getHours() + ":" + startTime.getMinutes() + ":" + startTime.getSeconds()

        const display = document.getElementById("demo")
        var tmp = duration.split(":")

        var timer = parseInt(tmp[0]) * 3600 + parseInt(tmp[1]) * 60 + parseInt(tmp[2]), hours, minutes, seconds;
        var tmp = timer

        var x = setInterval(function () {

            hours = parseInt(timer / 3600, 10);
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = "- " + hours + ":" + minutes + ":" + seconds + " / " + quiz.duration;

            currentTime = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)

            currentTime = tmp - currentTime

            time = parseInt(currentTime / 3600, 10) + ":" + parseInt(currentTime / 60, 10) + ":" + parseInt(currentTime % 60, 10)

            if (--timer < 0) {
                clearInterval(x);
                display.innerText = "- 00:00:00 / " + quiz.duration;
                time = duration
                //handleSubmit(true)
            }

        }, 1000);
    }

    const handleSubmit = (timeout) => {

        const fetchData = () => {
            let values = {
                quiz_id: quiz.quiz_id,
                student_id: user.user_id,
                questions: []
            }

            const questionsHTML = document.getElementsByClassName("quiz-questions")
            const questions = [...questionsHTML]

            questions.forEach(question => {
                let tmp = {}
                tmp.question_id = parseInt(question.id)

                let answers = question.querySelectorAll("input[name=answers]")
                answers = [...answers]
                tmp.answers = answers.map(answer => {
                    return { answer_id: parseInt(answer.id), correct: answer.checked ? 1 : 0 }

                })
                values.questions.push(tmp)
            })

            fetch("http://localhost:3001/submitQuiz/", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
                credentials: 'include'
            }).then(res =>
                res.json()
            ).then(data => {
                evaluate(values.questions, data)
            })
        }


        if (timeout) {
            alert("Your time is up!")
            fetchData()

        } else {
            if (window.confirm("Confirm Submit")) {
                fetchData()
            }
        }

    }

    const evaluate = (values, data) => {

        const marks = values.map((i, idx) => {
            var correctAns = []
            var incorrectAns = []
            i.answers.forEach((j, idx2) => {
                if (j.correct === data[idx].answers[idx2].correct) {
                    correctAns.push(j.answer_id)
                } else {
                    incorrectAns.push(j.answer_id)
                }
            })
            return { correct: correctAns, incorrect: incorrectAns }
        })


        var totalMarks = 0

        marks.forEach(i => {
            totalMarks += (i.correct.length / parseFloat(i.correct.length + i.incorrect.length))
        })

        totalMarks *= 100 / parseFloat(marks.length)

        fetch("http://localhost:3001/attemptQuiz", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ student_id: user.user_id, quiz_id: quiz.quiz_id, start_time: startString, duration: time, marks: totalMarks }),
            credentials: 'include'
        })
            .then(
                history.replace("/studentHome/studentQuizResults/", { quiz_id: quiz.quiz_id, correct: marks, values: values, marks: totalMarks })
            )

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
                            <h3 className="quiz-name-1">Time Left </h3>
                            <h3 className="quiz-name-2" id="demo">- {quiz.duration} / {quiz.duration}</h3>
                        </div>

                    </div>
                    <div>

                        {quiz.questions && quiz.questions.map((value, key) => (
                            <div className="quiz-questions" id={value.question_id} key={key}>
                                <h4>{key + 1}) {value.question}</h4>

                                <div className="quiz-answers" id={key}>
                                    {value.answers && value.answers.map((value, i) => (
                                        <div className="answerId" key={i}>
                                            <input id={value.answer_id} name="answers" type="checkbox" />
                                            <label>{value.answer}</label>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        ))}

                    </div>
                </div>

                <button className="course-btn" onClick={() => handleSubmit(false)}>Submit</button>
            </div>

        </div>
    );
}

export default StuQuiz;