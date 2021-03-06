const { validateToken, requiresAdmin } = require('./JWT')
module.exports = function (app, db, fs) {
    app.get("/allCourses", validateToken, (req, res) => {
        
     const query = "SELECT course.*, user.fname, user.lname FROM course INNER JOIN user ON course.teacher_id=user.user_id;";
    
        db.query(query, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })

    app.get("/allCoursesList", validateToken, (req, res) => {
        
        const query = "SELECT e.course_id, COUNT(e.course_id) AS count, c.course_name, c.year, u.fname, u.lname FROM enroll AS e INNER JOIN course AS c INNER JOIN user AS u ON c.course_id = e.course_id AND c.teacher_id = u.user_id GROUP BY course_id ORDER BY course_id;";
       
           db.query(query, (err, result) => {
               if (err) throw err;
               res.json(result)
           })
       })

    app.post("/deleteCourse", requiresAdmin, (req, res) => {
        const course_id = req.body.id;
        let file_link;
    
        
        const query1 = "SELECT content FROM content LEFT JOIN lesson ON content.lesson_id=lesson.lesson_id WHERE lesson.course_id=?;";
        const query2 = "DELETE from course WHERE course_id=?;";
        db.query(query1, [course_id], (err, result) => {
            if (err) throw err;
            let content_urls = JSON.parse(JSON.stringify(result))
            
    
        db.query(query2, [course_id], (err, result) => {
            if (err) throw err;
            content_urls.map(links => {
                file_link = decodeURI(links.content).toString().split("/").pop()
            fs.unlink(file_link, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
            })
            res.json({
                status: "ok",
              });
            
            });

        });
        
    })

    app.get("/viewUnenrolledCourses", requiresAdmin, (req, res) => {
        
        const query = "SELECT course.*, user.fname, user.lname from course INNER JOIN user ON course.teacher_id=user.user_id WHERE course_id NOT IN (SELECT course_id FROM enroll);";
       
           db.query(query, (err, result) => {
               if (err) throw err;
               res.json(result)
           })
       })
};