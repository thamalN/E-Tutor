module.exports = function (app, db,upload) {
    
    app.post("/CreateStuFeedback",(req, res) => {
        // console.log(req.body.user_id);
        // const StudentId= req.params.id;
        // console.log(req.params.id);
        const user_id =4;
        // console.log(user_id);
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

