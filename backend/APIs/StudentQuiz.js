module.exports = function (app, db) {

    app.post("/getQuizAttempts/", (req, res) => {
        const student_id = req.body.student_id
        const quiz_id = req.body.quiz_id

        const attempts = {}

        const query = "SELECT * FROM student_attempts_quiz WHERE student_id=? AND quiz_id=?"

        db.query(query, [student_id, quiz_id], (err, result) => {
            if (err) throw err

            attempts.attempts = [...result]

            const query2 = "SELECT * FROM quiz WHERE quiz_id=?"

            db.query(query2, quiz_id, (err, result2) => {
                if (err) throw err
                console.log(result2)
                attempts.quiz_id = result2[0].quiz_id
                attempts.quiz_name = result2[0].quiz_name
                attempts.deadline = result2[0].deadline
                attempts.duration = result2[0].duration
                attempts.max_attempts = result2[0].max_attempts

                res.json(attempts)
            })
        })
    })

    app.post("/submitQuiz/", (req, res) => {
        const student_id = req.body.student_id
        const quiz_id = req.body.quiz_id
        const questions = req.body.questions

        const query = "SELECT question.question_id, answer.answer_id FROM quiz INNER JOIN question ON quiz.quiz_id = question.quiz_id INNER JOIN answer ON question.question_id = answer.question_id WHERE quiz.quiz_id=? AND correct = 1"

        db.query(query, quiz_id, (err, result) => {
            if (err) throw err

            var tmp = []

            questions.forEach(i => {
                result.forEach(j => {
                    if(i.question_id === j.question_id) {
                        tmp = i.correct.map(k => {
                            if(k === j.answer_id) {
                                return {answer_id: k, correct: 1}
                            } else {
                                return {answer_id: k, correct: 0}
                            }
                        })
                        i.correct = tmp
                    }
                })
            })

            res.json(questions)

        })

        //calculate marks and insert student_attempt_quiz

    })

}