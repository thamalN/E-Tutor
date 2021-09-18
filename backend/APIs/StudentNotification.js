module.exports = function (app, db, MySQLEvents, schedule) {

    const instance = new MySQLEvents(db, {
        startAtEnd: true
    });

    instance.start();

    var notifications = []

    instance.addTrigger({
        name: 'INSERT CONTENT',
        expression: 'etutor.content',
        statement: MySQLEvents.STATEMENTS.INSERT,
        onEvent: (event) => {
            console.log(event);
            let lesson_id = event.affectedRows[0].after.lesson_id
            let content = event.affectedRows[0].after.content

            const query = "SELECT DISTINCT course.course_name, course.year FROM ((course RIGHT JOIN lesson ON course.course_id = lesson.course_id) LEFT JOIN content ON lesson.lesson_id = content.lesson_id) WHERE lesson.lesson_id=?;"

            db.query(query, lesson_id, (err, result) => {
                if (err) throw err;
                console.log(result)
                notifications.push({ event: "content", content: content, course_name: result[0].course_name, year: result[0].year })
            })

        },
    });

    let dueStudents = []

    const date = new Date(2021, 08, 04, 11, 02, 30);

    const job = schedule.scheduleJob(date, function () {

        const query = "SELECT payment.student_id, course.course_name, course.year from payment INNER JOIN course ON payment.course_id=course.course_id WHERE month != MONTHNAME(NOW()) GROUP BY payment.student_id, payment.course_id, payment.month;"

        db.query(query, (err, result) => {
            if (err) throw err;
            console.log(result)
            dueStudents = JSON.parse(JSON.stringify(result))
        })

    });

    app.post("/StudentNotification", (req, res) => {
        let notifications;
        const user_id = req.body.id;

        const payments = dueStudents.filter((student) => user_id === student.student_id)
        notifications = { payments: payments }
        
        res.json(notifications)

    })




};


