module.exports = function (app, db) {
    
    app.post("/CreateStuFeedback",(req, res) => {

        const user_id = req.body.user_id
        const topic = req.body.topic;
        const description = req.body.description;
    
        const query = "INSERT INTO feedback (user_id, topic, description) VALUES  (?,?,?);";
    
        db.query(query, [user_id, topic, description], (err, result) => {
            if (err) throw err;
            });

        res.send("ok")

    })

    app.get("/PreviousFeedback/:id", (req, res) => {
         const StudentId= req.params.id;

         const query = "SELECT topic, description, date_time,feedback_id From feedback WHERE user_id=4 ORDER BY feedback_id DESC;";

        db.query(query, StudentId, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })

};

