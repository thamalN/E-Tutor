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
        const quiz_id = req.body.quiz_id
        const questions = req.body.questions

        const query = "SELECT question.question_id, answer.answer_id, answer.correct FROM quiz INNER JOIN question ON quiz.quiz_id = question.quiz_id INNER JOIN answer ON question.question_id = answer.question_id WHERE quiz.quiz_id=?"

        db.query(query, quiz_id, (err, result) => {
            if (err) throw err

            questions.forEach(i => {
                result.forEach(j => {
                    if (i.question_id === j.question_id) {
                        i.answers.forEach((k, index) => {
                            if (k.answer_id === j.answer_id) {
                                i.answers[index] = { answer_id: j.answer_id, correct: j.correct }
                            }
                        })
                    }
                })
            })

            res.json(questions)

        })
    })

    app.post("/attemptQuiz/", (req, res) => {
        const student_id = req.body.student_id
        const quiz_id = req.body.quiz_id
        const start_time = req.body.start_time
        const duration = req.body.duration
        const marks = req.body.marks

        const query = "SELECT attempt_no FROM student_attempts_quiz WHERE student_id=? AND quiz_id=? ORDER BY attempt_no DESC LIMIT 1"

        db.query(query, [student_id, quiz_id], (err, result) => {
            if (err) throw err

            const query2 = "INSERT INTO student_attempts_quiz (student_id, quiz_id, attempt_no, start_time, attempt_duration, marks) VALUES (?,?,?,?,?,?);"

            db.query(query2, [student_id, quiz_id, (result[0]) ? parseInt(result[0].attempt_no)+1 : 1, start_time, duration, marks], (err, result) => {
                if (err) throw err

                res.send("ok")
            })

        })

    })

}