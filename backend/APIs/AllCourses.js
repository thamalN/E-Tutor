const { validateToken } = require('./JWT')
module.exports = function (app, db) {
    app.get("/allCourses", validateToken, (req, res) => {
        
     const query = "SELECT * FROM course;";
    
        db.query(query, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })

    app.get("/allCoursesList", (req, res) => {
        
        const query = "SELECT e.course_id, COUNT(e.course_id) AS count, c.course_name, c.year, u.fname, u.lname FROM enroll AS e INNER JOIN course AS c INNER JOIN user AS u ON c.course_id = e.course_id AND c.teacher_id = u.user_id GROUP BY course_id ORDER BY course_id;";
       
           db.query(query, (err, result) => {
               if (err) throw err;
               res.json(result)
           })
       })

    app.post("/deleteCourse", (req, res) => {
        const course_id = req.body.id;
        
    
        const query = "DELETE from course WHERE course_id=?;";
    
        db.query(query, [course_id], (err, result) => {
            if (err) throw err;
            res.json({
                status: "ok",
              });
            
            });
        
    })
};