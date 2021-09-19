const { validateToken } = require('./JWT')
module.exports = function (app, db) {
    app.get("/StudentAllCourses", validateToken, (req, res) => {
        
     const query = "SELECT course.course_id, course.teacher_id, course.course_name, course.year, course.description, course.price, course.image, user.fname, user.lname FROM course INNER JOIN user ON user.user_id = course.teacher_id;";
    
        db.query(query, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })
};