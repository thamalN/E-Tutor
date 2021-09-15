module.exports = function (app, db) {
    
    app.post("/CreateStuFeedback", (req, res) => {
        console.log(req.body)
        // console.log(req.files)
        const user_id = req.body.user_id;
        const topic = req.body.topic;
        const description = req.body.description;
        // const file_name = req.body.file_name;
    
        const query = "INSERT INTO stuEvent ( topic, description) VALUES  (?,?);";
    
        db.query(query, [topic, description], (err, result) => {
            if (err) throw err;
            res.json(result.insertId)
            console.log(result.insertId)
            console.log(user_id)
            
            });


        
    })


    
    app.get("/PreviousFeedback", (req, res) => {
        const query = "SELECT topic, description, date_time From feedback WHERE  user_id=4;";

        db.query(query, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })


};

