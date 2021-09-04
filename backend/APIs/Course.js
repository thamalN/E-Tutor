module.exports = function (app, db, upload) {

    app.post("/teacherCourses", (req, res) => {
        const teacherId = req.body.id;

        const query = "SELECT * FROM course WHERE teacher_id=?;";

        db.query(query, teacherId, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })

    app.get("/teacherCourses/content/:id", (req, res) => {
        const courseId = req.params.id;
        const query1 = "SELECT course.course_id,course.teacher_id, course.course_name, course.year, course.description, lesson.lesson_id, lesson.topic, content.content_id, content.content_name, content.content FROM ((course RIGHT JOIN lesson ON course.course_id = lesson.course_id) LEFT JOIN content ON lesson.lesson_id = content.lesson_id) WHERE course.course_id=?;";

        db.query(query1, courseId, (err, result) => {
            if (err) throw err;

            res.json(result)
        })
    })

    app.get("/teacherCourses/quiz/:id", (req, res) => {
        const courseId = req.params.id;
        // const query = "select quiz.quiz_id, quiz.quiz_name, question.question_id, question.question, answer.answer_id, answer.answer, answer.correct from quiz left join question on question.quiz_id = quiz.quiz_id left join answer on answer.question_id = question.question_id where course_id=?;";

        var values = []

        const query1 = "select quiz_id, quiz_name from quiz where course_id=?"
        db.query(query1, courseId, (err, result) => {
            if (err) throw err;

            values = JSON.parse(JSON.stringify(result))

            const query2 = "select * from question where quiz_id IN (?)"

            let questions = []

            values.map((value, key) => {
                questions[key] = value.quiz_id
            })

            db.query(query2, [questions], (err, result) => {
                if (err) throw err;

                questions = JSON.parse(JSON.stringify(result))

                const query3 = "select * from answer where question_id IN (?)"

                let answers = []

                questions.map((value, key) => {
                    answers[key] = value.question_id
                })

                db.query(query3, [answers], (err, result) => {
                    if (err) throw err;

                    answers = JSON.parse(JSON.stringify(result))

                    for (var i = 0; i < questions.length; i++) {
                        for (var j = 0; j < answers.length; j++) {
                            if (questions[i].question_id === answers[j].question_id) {
                                if (questions[i].answers == undefined)
                                    questions[i].answers = [{ answer_id: answers[j].answer_id, answer: answers[j].answer, correct: answers[j].correct }]
                                else
                                    questions[i].answers.push({ answer_id: answers[j].answer_id, answer: answers[j].answer, correct: answers[j].correct })
                            }
                        }
                    }

                    for (var i = 0; i < values.length; i++) {
                        for (var j = 0; j < questions.length; j++) {
                            if (values[i].quiz_id === questions[j].quiz_id) {
                                if (values[i].questions == undefined)
                                    values[i].questions = [{ question_id: questions[j].question_id, question: questions[j].question, answers: questions[j].answers }]
                                else
                                    values[i].questions.push({ question_id: questions[j].question_id, question: questions[j].question, answers: questions[j].answers })
                            }
                        }
                    }

                    res.json(values)

                })
            })
        })
    })

    app.get("/teacherCourses/discussion/:id", (req, res) => {
        const courseId = req.params.id;
        const query = "SELECT discussion.discussion_id, discussion.course_id, discussion.topic, discussion.post, discussion.date_time AS post_datetime, user.fname AS post_fname, user.lname AS post_lname, user.user_id AS post_user_id, reply.reply_id, reply.user_id AS reply_user_id, reply.reply, reply.date_time AS reply_date_time, reply.parent_reply FROM discussion INNER JOIN user ON discussion.user_id = user.user_id LEFT JOIN reply ON reply.discussion_id = discussion.discussion_id WHERE course_id = ?;";

        db.query(query, courseId, (err, result) => {
            if (err) throw err;

            res.json(result)
        })
    })

    app.post("/teacherCourses/addContent", upload.any(), (req, res) => {

        console.log(req.body)
        console.log(req.files)

        var topic = req.body.topic;
        var lesson_id = parseInt(req.body.lesson_id)
        const course_id = parseInt(req.body.course_id)

        let query1 = "INSERT INTO lesson (course_id,topic) VALUES (?,?);"

        if (!req.body.topic.localeCompare("new")) {
            console.log("new")

            topic = req.body.name;

            db.query(query1, [course_id, topic], (err, result) => {
                if (err) throw err;
                lesson_id = result.insertId

                if (req.files.length !== 0) {

                    const content_name = req.body.fileName
                    const content_path = "http://127.0.0.1:8887/" + req.files[0].path
                    const query2 = "INSERT INTO content (lesson_id, content_name, content) VALUES (?,?,?);";

                    db.query(query2, [lesson_id, content_name, content_path], (err, result) => {
                        if (err) throw err;
                        res.json("content added")
                    })

                } else
                    res.json("topic added")

            })

        } else {
            console.log("old")

            const content_name = req.body.fileName
            const content_path = "http://127.0.0.1:8887/" + req.files[0].path

            const query2 = "INSERT INTO content (lesson_id, content_name, content) VALUES (?,?,?);";

            db.query(query2, [lesson_id, content_name, content_path], (err, result) => {
                if (err) throw err;
                res.json("content added")
            })

        }

    })

    app.post("/teacherCourses/addQuiz", (req, res) => {
        const quiz = req.body;

        const quizName = quiz.name
        const courseId = quiz.course_id

        const query1 = "INSERT INTO quiz (course_id, quiz_name) VALUES (?, ?);";

        db.query(query1, [courseId, quizName], (err, result) => {
            if (err) throw err;

            let quiz_id = result.insertId

            const query2 = "INSERT INTO question (quiz_id, question) VALUES ?;";

            let questions = [];

            for (var i = 0; i < quiz.questions.length; i++) {
                questions[i] = [quiz_id, quiz.questions[i].question]
            }

            db.query(query2, [questions], (err, result) => {
                if (err) throw err;

                const query3 = "SELECT question_id FROM question WHERE quiz_id = ?;";

                db.query(query3, quiz_id, (err, result) => {
                    if (err) throw err;

                    let answers = []

                    var k = 0
                    for (var i = 0; i < quiz.questions.length; i++) {
                        for (var j = 0; j < quiz.questions[i].answers.length; j++) {
                            answers[k] = [result[i].question_id, quiz.questions[i].answers[j].answer, quiz.questions[i].answers[j].correct]
                            k++
                        }
                    }

                    const query4 = "INSERT INTO answer (question_id, answer, correct) VALUES ?;";

                    db.query(query4, [answers], (err, result) => {
                        if (err) throw err;
                        res.json(result)
                    })

                })
            })
        })


    })

    app.post("/teacherCourses/editQuiz", (req, res) => {
        const quiz_id = req.body.quiz_id
        const quiz_name = req.body.quiz_name
        const questions = req.body.questions

        const query1 = "UPDATE quiz SET quiz_name = ? WHERE quiz_id = ?;";

        db.query(query1, [quiz_name, quiz_id], (err, result) => {
            if (err) throw err;

            var queries = '';
            for (var i = 0; i < questions.length; i++) {
                if (questions[i].question_id === undefined)
                    queries += "INSERT INTO question (quiz_id, question) VALUES (" + quiz_id + ", \"" + questions[i].question + "\");"
                else if (questions[i].deleted !== undefined)
                    queries += "DELETE FROM question WHERE question_id = " + questions[i].question_id + " AND quiz_id = " + quiz_id + ";"
                else
                    queries += "UPDATE question SET question = \"" + questions[i].question + "\" WHERE question_id = " + questions[i].question_id + " AND quiz_id = " + quiz_id + ";"
            }

            console.log(queries)

            db.query(queries, (err, result) => {
                if (err) throw err;
                
                if (result.length > 0) {
                    var insertedQuestion = result.filter((item) => item.insertId !== 0)
                }
                var k = 0;
                queries = '';
                for (i = 0; i < questions.length; i++) {
                    for (var j = 0; j < questions[i].answers.length; j++) {
                        if (questions[i].answers[j].answer_id === undefined) {
                            if (questions[i].question_id === undefined) {
                                queries += "INSERT INTO answer (question_id, answer, correct) VALUES (" + insertedQuestion[k].insertId + ", \"" + questions[i].answers[j].answer + "\", " + questions[i].answers[j].correct + ");"
                            } else
                                queries += "INSERT INTO answer (question_id, answer, correct) VALUES (" + questions[i].question_id + ", \"" + questions[i].answers[j].answer + "\", " + questions[i].answers[j].correct + ");"
                        } else if (questions[i].answers[j].deleted !== undefined)
                            queries += "DELETE FROM answer WHERE answer_id = " + questions[i].answers[j].answer_id + " AND question_id = " + questions[i].question_id + ";"
                        else
                            queries += "UPDATE answer SET answer = \"" + questions[i].answers[j].answer + "\", correct = " + questions[i].answers[j].correct + " WHERE answer_id = " + questions[i].answers[j].answer_id + " AND question_id = " + questions[i].question_id + ";"
                    }
                    if(questions[i].question_id === undefined)
                        k++
                }

                console.log(queries)

                db.query(queries, (err, result) => {
                    if (err) throw err;
                })
            })
        })

        res.send("ok")
    })

    app.post("/teacherCourses/addDiscussion", (req, res) => {
        console.log(req.body)
        const course_id = req.body.course_id
        const user_id = req.body.user_id
        const topic = req.body.topic
        const post = req.body.post
        const date_time = req.body.date_time
        const query = "INSERT INTO discussion (course_id, user_id, topic, post, date_time) VALUES (?,?,?,?,?);";

        db.query(query, [course_id, user_id, topic, post, date_time], (err, result) => {
            if (err) throw err;
            console.log(result)
        })
        res.send("ok")
    })

    app.post("/teacherCourses/addReply", (req, res) => {
        console.log(req.body)

        const discussion_id = req.body.discussion_id
        const user_id = req.body.replied_by
        const reply = req.body.reply
        const date_time = req.body.reply_datetime
        const parent_reply = req.body.parent_reply
        const query = "INSERT INTO reply (discussion_id, user_id, reply, date_time, parent_reply) VALUES (?,?,?,?,?);";

        db.query(query, [discussion_id, user_id, reply, date_time, parent_reply], (err, result) => {
            if (err) throw err;
            console.log(result)
        })

        res.send("ok")
    })

    app.post("/addNewCourse", (req, res) => {
        console.log(req.body.teacher);
        const course_name = req.body.course_name;
        const user_id = req.body.user_id;
        const teacher = parseInt(req.body.teacher);
        const year = req.body.year;
        const description = req.body.description;
        const price = req.body.price;
        console.log(teacher);

        const query = "INSERT INTO course (course_name, added_by, teacher_id, year, description, price) VALUES (?,?,?,?,?,?);";

        db.query(query, [course_name, user_id, teacher, year, description, price], (err, result) => {
            if (err) throw err;
            res.json(result)
            console.log(result.insertId)
        })
    })


};