module.exports = function (app, db, upload) {

    app.post("/teacherCourses", (req, res) => {
        const teacherId = req.body.id;

        const query = "SELECT * FROM course WHERE teacher_id=?;";

        db.query(query, teacherId, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })

    app.get("/teacherCourses/:id", (req, res) => {
        const courseId = req.params.id;
        const query = "SELECT course.course_id,course.teacher_id, course.course_name, course.year, course.description, lesson.lesson_id, lesson.topic, content.content_id, content.content_name, content.content FROM ((course RIGHT JOIN lesson ON course.course_id = lesson.course_id) LEFT JOIN content ON lesson.lesson_id = content.lesson_id) WHERE course.course_id=?;";

        db.query(query, courseId, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })

    app.post("/teacherCourses/add", upload.any(), (req, res) => {

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