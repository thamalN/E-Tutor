import { useParams, useHistory } from "react-router";
import Sidebar from "../Sidebar";
import EditIcon from '@material-ui/icons/Edit';
import { Link } from "react-router-dom";
import { useEffect } from "react";


const StuQuiz = () => {
    let { id } = useParams()

    const quiz = JSON.parse(localStorage.getItem('quiz')).find((item) => item.quiz_id === parseInt(id))

    const user = JSON.parse(localStorage.getItem("user"))




    // const timer=()=>{
    //     {setInterval(updateCountdown,1000)};


    // }

    // const updateCountdown = () => {
    //     let countdownEl = document.getElementById('countdown');
    //     // setInterval(updateCountdown,1000);
    //     const minutes = Math.floor(time / 60);
    //     let seconds = time % 60;
    //     if (countdownEl)
    //         countdownEl.innerHTML = `${minutes}: ${seconds}`;
    //     time--;
    //     // console.log("alert");
    // }

    // setInterval(updateCountdown, 1000)

    useEffect(() => {
        startTimer(quiz.duration)
    })

    function startTimer(duration) {

        const display = document.getElementById("demo")
        var tmp = duration.split(":")

        var timer = parseInt(tmp[0]) * 3600 + parseInt(tmp[1]) * 60 + parseInt(tmp[2]), hours, minutes, seconds;

        var x = setInterval(function () {

            hours = parseInt(timer / 3600, 10);
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = "- " + hours + ":" + minutes + ":" + seconds + " / " + quiz.duration;

            if (--timer < 0) {
                clearInterval(x);
                display.innerText = "- 00:00:00 / " + quiz.duration;
            }

            // if(timer < 10)
            //     display.style.color = "red"
        }, 1000);
    }

    const handleSubmit = () => {

        if (window.confirm("Confirm Submit")) {

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

                let answers = question.querySelectorAll("input[name=answers]:checked")
                answers = [...answers]
                tmp.correct = answers.map(answer => parseInt(answer.id))
                values.questions.push(tmp)
            })

            console.log(values)

            fetch("http://localhost:3001/submitQuiz/", {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify(values)
            }).then(res => 
                res.json()
            ).then(data => {
                console.log(data)
            })
        }

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

                <button className="course-btn" onClick={handleSubmit}>Submit</button>
            </div>

        </div>
    );
}

export default StuQuiz;