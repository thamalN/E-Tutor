import { useParams, useHistory } from "react-router";
import Sidebar from "../Sidebar";
import EditIcon from '@material-ui/icons/Edit';
import { Link } from "react-router-dom";


const  StuQuiz = () => {
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
    const startingMinutes=10;
    let time=startingMinutes*60;

    

// const timer=()=>{
//     {setInterval(updateCountdown,1000)};


// }

const updateCountdown=()=>{
    let countdownEl=document.getElementById('countdown');
    // setInterval(updateCountdown,1000);
    const minutes=Math.floor(time/60);
    let seconds=time%60;
    if(countdownEl)
        countdownEl.innerHTML=`${minutes}: ${seconds}`;
    time--;
    // console.log("alert");
}

setInterval(updateCountdown,1000)


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
                            <h3 className="quiz-name-1">Duration </h3>
                            <h3 className="quiz-name-2"> - {quiz.duration}</h3>
                        
                            <p id="countdown">10:00</p>
                            
                            
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
                                                <input type="radio"  />
                                                <label>{value.answer}</label>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="quiz-answers" id={key}>
                                        {value.answers && value.answers.map((value, i) => (
                                            <div key={i}>
                                                <input type="checkbox"  />
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