module.exports = function (app, db,upload,fs) {
    
    app.post("/CreateStuFeedback",upload.single('file'),(req, res) => {
        // console.log(req.body.user_id);
        // const StudentId= req.params.id;
        // console.log(req.params.id);
        const user_id =req.body.user_id;
        // console.log(user_id);
        const topic = req.body.topic;
        const description = req.body.description;
        let file_name;

        let content_path;

        
        if (req.file !== undefined) {
            content_path = "http://127.0.0.1:8887/" + req.file.path;
            file_name = req.body.file_name;
        }
        else {
            content_path = null
            file_name = null
        }

        const query = "INSERT INTO feedback (user_id, topic, description, date_time, file_name, attachment) VALUES (?,?,?,now(),?,?);";
        // const query = "INSERT INTO feedback (user_id, topic, description) VALUES  (?,?,?);";
    
        db.query(query, [user_id, topic, description,file_name,content_path], (err, result) => {
            if (err) throw err;
            res.send("ok")
            });

       

    })

    app.get("/PreviousFeedback/:id", (req, res) => {
         const StudentId= req.params.id;

         const query = "SELECT topic, description, date_time,feedback_id,file_name,attachment From feedback WHERE user_id=? ORDER BY feedback_id DESC;";

        db.query(query, StudentId, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })

};

