module.exports = function (app, db, upload) {
    
    app.post("/createAnnouncement", upload.any(), (req, res) => {
        console.log(req.body)
        console.log(req.files)
        const user_id = req.body.user_id;
        const topic = req.body.topic;
        const description = req.body.description;
        const file_name = req.body.file_name;
        console.log(req.files.length)
        let content_path;
        if(req.files.length===0){
            content_path = ""
        }
        else{
            content_path = "http://127.0.0.1:8887/" + req.files[0].path;
        }
        
        
    
        const query = "INSERT INTO announcement (user_id, topic, description, file_name, attachment, date_time, modified_at) VALUES  (?,?,?,?,?,now(),now());";
    
        db.query(query, [user_id, topic, description, file_name, content_path], (err, result) => {
            if (err) throw err;
            res.json(result.insertId)
            console.log(result.insertId)
            
            });
        
    })

    app.get("/viewPreviousAnnouncements", (req, res) => {
        const query = "SELECT announcement_id, topic, description, file_name, attachment, date_time, modified_at, fname, lname  FROM announcement LEFT JOIN user on announcement.user_id=user.user_id  ORDER BY announcement.modified_at DESC;";

        db.query(query, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })

    app.post("/editAnnouncement", upload.any(), (req, res) => {
        console.log(req.body)
        console.log(req.files)
        const announcement_id = req.body.announcement_id;
        const opt = req.body.opt;
        const user_id = req.body.user_id;
        const topic = req.body.topic;
        const description = req.body.description;
        const file_name = req.body.file_name;
        let content_path;
        if(req.files.length===0 && opt ==="empty"){
            content_path = ""
            console.log("empty")
        }

        else if(req.files.length===0){
            content_path = req.body.attachment
            console.log("existing file")
        }
        else{
            content_path = "http://127.0.0.1:8887/" + req.files[0].path;
        }
        console.log(announcement_id)
        console.log(req.files[0])
    
        const query = "UPDATE announcement SET topic=?, description=?, file_name=?, attachment=?, modified_by=?, modified_at=now() WHERE announcement_id=?;";
    
        db.query(query, [topic, description, file_name, content_path, user_id, announcement_id], (err, result) => {
            if (err) throw err;
            res.json(result.insertId)
            console.log(result.insertId)
            
            });
        
    })

    app.post("/deleteAnnouncement", (req, res) => {
        console.log( req.body)
        const announcement_id = req.body.id;
        
    
        const query = "DELETE from announcement WHERE announcement_id=?;";
    
        db.query(query, [announcement_id], (err, result) => {
            if (err) throw err;
            res.json({
                status: "ok",
              });
            
            });
        
    })
};

