module.exports = function (app, db,upload) {
    
    app.post("/CreateStuFeedback",(req, res) => {
        console.log(req.body)
        // console.log(req.files)
        const user_id = req.body.user_id;
        const topic = req.body.topic;
        const description = req.body.description;
        // const file_name = req.body.file_name;
        // console.log(req.fil)
        let content_path;
        
        
    
        const query = "INSERT INTO feedback (user_id, topic, description) VALUES  (4,'topic','description');";
    
        db.query(query, [user_id, topic, description], (err, result) => {
            if (err) throw err;
            res.json(result.insertId)
            console.log(result.insertId)
            
            });


        
    })


    
    app.get("/PreviousFeedback", (req, res) => {
        // console.log(req.body.id)
        // const StudentId= req.body.id;
        // const query = "SELECT topic, description, date_time From feedback WHERE  StudentId=?;";
        const query = "SELECT topic, description, date_time From feedback WHERE  user_id=4;";

        db.query(query, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })


};

