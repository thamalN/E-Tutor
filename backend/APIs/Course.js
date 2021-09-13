module.exports = function (app, db, upload, fs) {

    app.post("/teacherCourses", (req, res) => {
        const teacherId = req.body.id;

        const query = "SELECT * FROM course WHERE teacher_id=?;";

        db.query(query, teacherId, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })

    app.get("/teacherCourses/:id", (req, res) => {
        const course_id = req.params.id

        const query = "SELECT course.course_id, course.teacher_id, course.course_name, course.year, course.description, user.fname, user.lname, user.contact FROM course INNER JOIN user ON course.teacher_id = user.user_id WHERE course.course_id=?"

        db.query(query, course_id, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })

    app.post("/teacherCourses/editCourseDetails", (req, res) => {
        const course_id = req.body.course_id
        const course_name = req.body.course_name
        const year = req.body.year
        const description = req.body.description

        const query = "UPDATE course SET course_name = ?, year = ?, description = ? WHERE course_id=?;";

        db.query(query, [course_name, year, description, course_id], (err, result) => {
            if (err) throw err;
            res.send("ok")
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

        const query1 = "select * from quiz where course_id=?"
        db.query(query1, courseId, (err, result) => {
            if (err) throw err;

            values = JSON.parse(JSON.stringify(result))

            const query2 = "select * from question where quiz_id IN (?)"

            let questions = []

            if (values.length !== 0) {
                values.map((value, key) => {
                    questions[key] = value.quiz_id
                })


                db.query(query2, [questions], (err, result) => {
                    if (err) throw err;

                    questions = JSON.parse(JSON.stringify(result))

                    const query3 = "select * from answer where question_id IN (?)"

                    let answers = []

                    if (questions.length !== 0) {

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
                    } else
                        res.json(values)

                })
            } else
                res.json(values)

        })
    })

    app.get("/teacherCourses/discussion/:id", (req, res) => {
        const courseId = req.params.id;
        const query = "SELECT discussion.discussion_id, discussion.course_id, discussion.topic, discussion.post, discussion.date_time AS post_datetime, user.fname AS post_fname, user.lname AS post_lname, user.user_id AS post_user_id, reply.reply_id, reply.user_id AS reply_user_id, reply_user.fname AS reply_fname, reply_user.lname AS reply_lname, reply.reply, reply.date_time AS reply_date_time, reply.parent_reply FROM discussion INNER JOIN user ON discussion.user_id = user.user_id LEFT JOIN reply ON reply.discussion_id = discussion.discussion_id LEFT JOIN user as reply_user ON reply.user_id = reply_user.user_id WHERE course_id = ?;";

        db.query(query, courseId, (err, result) => {
            if (err) throw err;

            res.json(result)
        })
    })

    app.post("/teacherCourses/addContent", upload.single('file'), (req, res) => {

        var topic = req.body.topic;
        var lesson_id = parseInt(req.body.lesson_id)
        const course_id = parseInt(req.body.course_id)

        let query1 = "INSERT INTO lesson (course_id,topic) VALUES (?,?);"

        if (!req.body.topic.localeCompare("new")) {

            topic = req.body.name;

            db.query(query1, [course_id, topic], (err, result) => {
                if (err) throw err;
                lesson_id = result.insertId

                if (req.file !== undefined) {

                    const content_name = req.body.fileName
                    const content_path = "http://127.0.0.1:8887/" + req.file.path
                    const query2 = "INSERT INTO content (lesson_id, content_name, content) VALUES (?,?,?);";

                    db.query(query2, [lesson_id, content_name, content_path], (err, result) => {
                        if (err) throw err;
                        res.json("content added")
                    })

                } else
                    res.json("topic added")

            })

        } else {
            const content_name = req.body.fileName
            const content_path = "http://127.0.0.1:8887/" + req.file.path

            const query2 = "INSERT INTO content (lesson_id, content_name, content) VALUES (?,?,?);";

            db.query(query2, [lesson_id, content_name, content_path], (err, result) => {
                if (err) throw err;
                res.json("content added")
            })

        }

    })

    app.post("/teacherCourses/editLesson/", (req, res) => {
        const course_id = req.body.course_id
        const lesson_id = req.body.lesson_id
        const lesson = req.body.lesson

        const query = "UPDATE lesson SET topic=? WHERE course_id=? AND lesson_id=?"

        db.query(query, [lesson, course_id, lesson_id], (err, result) => {
            if (err) throw err;
            res.send("ok")
        })

    })

    app.post("/teacherCourses/deleteLesson/", (req, res) => {
        const course_id = req.body.course_id
        const lesson_id = req.body.lesson_id

        const query = "DELETE FROM lesson WHERE course_id=? AND lesson_id=?"

        db.query(query, [course_id, lesson_id], (err, result) => {
            if (err) throw err;
            res.send("ok")
        })

    })

    app.post("/teacherCourses/editContent", upload.single('file'), (req, res) => {

        const lesson_id = req.body.lesson_id
        const content_id = req.body.content_id
        const file_name = req.body.file_name

        console.log(req.body)
        console.log(req.file)

        if (req.file !== undefined) {
            const new_path = "http://127.0.0.1:8887/" + req.file.path
            const old_path = req.body.old_path

            const query1 = "UPDATE content SET content_name = ?, content = ? WHERE lesson_id = ? AND content_id = ?"

            db.query(query1, [file_name, new_path, lesson_id, content_id], (err, result) => {
                if (err) throw err;
            })

            fs.unlink(old_path, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })

        } else {
            const query2 = "UPDATE content SET content_name = ? WHERE lesson_id = ? AND content_id = ?"

            db.query(query2, [file_name, lesson_id, content_id], (err, result) => {
                if (err) throw err;
            })
        }

        res.send("ok")
    })

    app.post("/teacherCourses/deleteContent/", (req, res) => {
        const lessonId = req.body.lesson_id
        const contentId = req.body.content_id
        const contentPath = req.body.content_path

        const query = "DELETE FROM content WHERE lesson_id=? AND content_id=?"

        db.query(query, [lessonId, contentId], (err, result) => {
            if (err) throw err;
        })

        fs.unlink(contentPath, (err) => {
            if (err) {
                console.error(err)
                return
            }
        })

        res.send("ok")
    })

    app.post("/teacherCourses/addQuiz", (req, res) => {
        const quiz = req.body;

        const quizName = quiz.name
        const duration = quiz.duration
        const attempts = quiz.attempts
        const deadline = quiz.deadline
        const courseId = quiz.course_id

        const query1 = "INSERT INTO quiz (course_id, quiz_name, duration, max_attempts, deadline) VALUES (?, ?, ?, ?, ?);";

        db.query(query1, [courseId, quizName, duration, attempts, deadline], (err, result) => {
            if (err) throw err;

            let quiz_id = result.insertId

            if (quiz.questions.length !== 0) {

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
                            res.send("ok")
                        })

                    })
                })
            } else
                res.send("ok")
        })


    })

    app.post("/teacherCourses/editQuiz", (req, res) => {
        const quiz_id = req.body.quiz_id
        const course_id = req.body.course_id
        const quiz_name = req.body.quiz_name
        const duration = req.body.duration
        const attempts = req.body.max_attempts
        const deadline = req.body.deadline
        const questions = req.body.questions

        const query1 = "UPDATE quiz SET quiz_name = ?, duration = ?, max_attempts = ?, deadline = ? WHERE quiz_id = ? AND course_id = ?;";

        db.query(query1, [quiz_name, duration, attempts, deadline, quiz_id, course_id], (err, result) => {
            if (err) throw err;

            var queries = '';
            for (var i = 0; i < questions.length; i++) {
                if (questions[i].question_id === null)
                    queries += "INSERT INTO question (quiz_id, question) VALUES (" + quiz_id + ", \"" + questions[i].question + "\");"
                else if (questions[i].deleted === '1')
                    queries += "DELETE FROM question WHERE question_id = " + questions[i].question_id + " AND quiz_id = " + quiz_id + ";"
                else
                    queries += "UPDATE question SET question = \"" + questions[i].question + "\" WHERE question_id = " + questions[i].question_id + " AND quiz_id = " + quiz_id + ";"
            }

            db.query(queries, (err, result) => {
                if (err) throw err;

                if (result.length > 0) {
                    var insertedQuestion = result.filter((item) => item.insertId !== 0)
                }
                var k = 0;
                queries = '';

                for (i = 0; i < questions.length; i++) {
                    if (questions[i].answers !== undefined) {
                        for (var j = 0; j < questions[i].answers.length; j++) {
                            if (questions[i].answers[j].answer_id === null) {
                                if (questions[i].question_id === null) {
                                    queries += "INSERT INTO answer (question_id, answer, correct) VALUES (" + insertedQuestion[k].insertId + ", \"" + questions[i].answers[j].answer + "\", " + questions[i].answers[j].correct + ");"
                                } else
                                    queries += "INSERT INTO answer (question_id, answer, correct) VALUES (" + questions[i].question_id + ", \"" + questions[i].answers[j].answer + "\", " + questions[i].answers[j].correct + ");"
                            } else if (questions[i].answers[j].deleted === '1')
                                queries += "DELETE FROM answer WHERE answer_id = " + questions[i].answers[j].answer_id + " AND question_id = " + questions[i].question_id + ";"
                            else
                                queries += "UPDATE answer SET answer = \"" + questions[i].answers[j].answer + "\", correct = " + questions[i].answers[j].correct + " WHERE answer_id = " + questions[i].answers[j].answer_id + " AND question_id = " + questions[i].question_id + ";"
                        }
                        if (questions[i].question_id === null)
                            k++
                    }
                }

                console.log(queries)

                db.query(queries, (err, result) => {
                    if (err) throw err;
                })
            })
        })

        res.send("ok")
    })

    app.get("/teacherCourses/deleteQuiz/:id", (req, res) => {
        const quizId = req.params.id

        const query = "DELETE FROM quiz WHERE quiz_id=?"

        db.query(query, quizId, (err, result) => {
            if (err) throw err;
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

    app.post("/teacherCourses/editDiscussion", (req, res) => {
        const course_id = req.body.course_id
        const discussion_id = req.body.discussion_id
        const topic = req.body.topic
        const post = req.body.post

        const query = "UPDATE discussion SET topic = ?, post = ? WHERE course_id=? AND discussion_id=?;";

        db.query(query, [topic, post, course_id, discussion_id], (err, result) => {
            if (err) throw err;
            res.send("ok")
        })
    })

    app.post("/teacherCourses/editReply", (req, res) => {
        const reply_id = req.body.reply_id
        const discussion_id = req.body.discussion_id
        const reply = req.body.reply

        const query = "UPDATE reply SET reply = ? WHERE reply_id=? AND discussion_id=?;";

        db.query(query, [reply, reply_id, discussion_id], (err, result) => {
            if (err) throw err;
            res.send("ok")
        })
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