module.exports = function (app, db, schedule) {

    const job = schedule.scheduleJob("00 24 14 * *", function () {

        const query = "select student_id, course_id from enroll where(student_id,course_id) not in (SELECT student_id,course_id from payment where month = MONTHNAME(NOW())) ORDER BY `enroll`.`student_id` ASC"

        db.query(query, (err, result) => {
            if (err) throw err

            let arr = result.map(i => {
                let tmp = [i.student_id, i.course_id]
                return tmp
            })

            const query2 = "UPDATE enroll SET access = 0 WHERE (student_id, course_id) IN (?)"

            db.query(query2, [arr], (err, result) => {
                if (err) throw err
            })
        })

    })
}