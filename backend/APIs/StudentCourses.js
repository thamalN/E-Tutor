const { requiresStudent } = require('./JWT')
module.exports = function (app, db, upload) {

    app.post("/studentCourses/", requiresStudent, (req, res) => {
        const studentId = req.body.id;

        // const query = "SELECT * FROM course WHERE course_id IN( SELECT course_id FROM enroll WHERE student_id=?);";
        const query = "select course.*, user.fname, user.lname, enroll.access from enroll INNER JOIN course ON course.course_id = enroll.course_id INNER JOIN user ON user.user_id = course.teacher_id where enroll.course_id not in (SELECT course_id from payment where month = MONTHNAME(NOW()) AND student_id=?) AND student_id=? ";
        // SELECT course.course_name, course.year from payment INNER JOIN course ON payment.course_id=course.course_id WHERE month != MONTHNAME(NOW()) WHERE student_id=?;

        db.query(query, [studentId, studentId], (err, result) => {
            if (err) throw err;
            console.log(result);
            res.json(result)
        })
    })

    app.post("/studentAllCourses", requiresStudent, (req, res) => {
        const studentId = req.body.id;

        const query = "select course.*, user.fname, user.lname, enroll.access from enroll INNER JOIN course ON course.course_id = enroll.course_id INNER JOIN user ON user.user_id = course.teacher_id where student_id=?";
        db.query(query, studentId, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.json(result)
        })
    })

    app.post("/unenrolledCourses", requiresStudent, (req, res) => {
        const studentId = req.body.id;
        // const query = "select course.*, user.fname, user.lname, enroll.access from enroll INNER JOIN course ON course.course_id = enroll.course_id INNER JOIN user ON user.user_id = course.teacher_id where student_id=?";
        // const query = "select course.*, user.fname, user.lname from course WHERE course_id NOT IN (SELECT course_id FROM enroll WHERE student_id = ?);"
        const query = "select course.*, user.fname, user.lname from course INNER JOIN user ON course.teacher_id = user.user_id WHERE course_id NOT IN (SELECT course_id FROM enroll WHERE student_id = ?);"
        db.query(query, studentId, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.json(result)
        })
    })

    app.get("/studentCourses/:id", requiresStudent, (req, res) => {
        const courseId = req.params.id;
        const query = "SELECT course.course_id,course.teacher_id, course.course_name, course.year, course.description, lesson.lesson_id, lesson.topic, content.content_id, content.content_name, content.content, user.fname, user.lname FROM (((course INNER JOIN user ON course.teacher_id = user.user_id )RIGHT JOIN lesson ON course.course_id = lesson.course_id) LEFT JOIN content ON lesson.lesson_id = content.lesson_id) WHERE course.course_id=?;";

        db.query(query, courseId, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })    
    
    app.get("/studentCourseDetails/:id", requiresStudent, (req, res) => {
        const course_id = req.params.id

        const query = "SELECT course.course_id, course.teacher_id, course.course_name, course.year, course.description, user.fname, user.lname, user.contact FROM course INNER JOIN user ON course.teacher_id = user.user_id WHERE course.course_id=?"

        db.query(query, course_id, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })

    app.post("/courseDetails", (req, res) => {
        const course_id = req.body.id;
        console.log(course_id);
        const query = "SELECT course_id, price,course_name,description,year FROM course WHERE course_id = ? ;";

        db.query(query, course_id, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })

    app.post("/deleteenrolledcourse", requiresStudent, (req,res)=>{
        console.log(req.body);
        const course_id=req.body.unenrolledcid;
    
        const student_id=req.body.id;

        const query="DELETE from enroll WHERE course_id=? AND student_id=?;";

        db.query(query,[course_id,student_id],(err,result)=>{
            if(err) throw err;
            res.json({
                status:"ok",
            });
        
        })
       
    })

};