module.exports = function (app, db) {
    app.get("/allCourses", (req, res) => {
        
     const query = "SELECT * FROM course;";
    
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