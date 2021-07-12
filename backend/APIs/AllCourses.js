module.exports = function (app, db) {
    app.get("/allCourses", (req, res) => {
        
     const query = "SELECT * FROM course;";
    
        db.query(query, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })
};