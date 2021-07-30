module.exports = function (app, db, upload) {
    
    app.post("/createAnnouncement", upload.any(), (req, res) => {
        console.log(req.body)
        console.log(req.files)
        const user_id = req.body.user_id;
        const topic = req.body.topic;
        const description = req.body.description;
        const file_name = req.body.file_name;
        const content_path = "http://127.0.0.1:8887/" + req.files[0].path;
    
        const query = "INSERT INTO announcement (user_id, topic, description, file_name, attachment, date_time) VALUES  (?,?,?,?,?,now());";
    
        db.query(query, [user_id, topic, description, file_name, content_path], (err, result) => {
            if (err) throw err;
            res.json(result.insertId)
            console.log(result.insertId)
            
            });
        
    })

    app.get("/viewPreviousAnnouncements", (req, res) => {
        const query = "SELECT announcement_id, topic, description, file_name, attachment, date_time, fname, lname  FROM announcement LEFT JOIN user on announcement.user_id=user.user_id  ;";

        db.query(query, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })
};

