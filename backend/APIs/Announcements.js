module.exports = function (app, db, upload, fs) {
    
    app.post("/createAnnouncement", upload.single('file'), (req, res) => {
        console.log(req.body)
        console.log(req.file)
        const user_id = req.body.user_id;
        const topic = req.body.topic;
        const description = req.body.description;
        let file_name;
        
        let content_path;
        
        if(req.file !== undefined){
            content_path = "http://127.0.0.1:8887/" + req.file.path;
            file_name = req.body.file_name;
        }
        else{
            content_path = null
            file_name = null
        }
        
        
    
        const query = "INSERT INTO announcement (user_id, topic, description, file_name, attachment, date_time, modified_at) VALUES  (?,?,?,?,?,now(),now());";
    
        db.query(query, [user_id, topic, description, file_name, content_path], (err, result) => {
            if (err) throw err;
            res.json(result.insertId)
            console.log(result.insertId)
            
            });
        
    })

    app.get("/viewPreviousAnnouncements", (req, res) => {
        const query = "SELECT announcement_id, topic, description, file_name, attachment, date_time, modified_at, user.user_id AS added_by, fname, lname  FROM announcement LEFT JOIN user on announcement.user_id=user.user_id  ORDER BY announcement.modified_at DESC;";

        db.query(query, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })

    app.post("/editAnnouncement", upload.single('file'), (req, res) => {
        console.log(req.body)
        const announcement_id = req.body.announcement_id;
        const opt = req.body.opt;
        const user_id = req.body.user_id;
        const topic = req.body.topic;
        const description = req.body.description;
        const old_file_link = req.body.old_file_link
        const old_path = decodeURI(old_file_link).toString().split("/").pop()
        console.log(old_path)
        let file_name;
        let content_path;

        if(req.file !== undefined){
            file_name = req.body.file_name;
            content_path = "http://127.0.0.1:8887/" + req.file.path;
            if(opt ==="empty"){
                
                console.log("new file")
            }
            else{
                fs.unlink(old_path, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })
                console.log("remove and add new file")
            }
            content_path = "http://127.0.0.1:8887/" + req.file.path;
        }
        else{
            if(opt ==="remove"){
                content_path = null
                file_name = null
                console.log("remove file")
                fs.unlink(old_path, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })
            }
            else{
                if(opt==="empty"){
                    content_path = null
                    file_name = null
                    console.log("empty")
                }
                else{content_path = old_file_link;
                    file_name = req.body.file_name;
                    console.log("existing file")
                }
                
                
            }
            
        }
        // if(req.files.length===0 && opt ==="empty"){
        //     content_path = ""
        //     console.log("empty")
        // }

        // else if(req.files.length===0 && opt ==="exist"){
        //     content_path = req.body.attachment
        //     console.log("existing file")
        // }

        // else if(req.files.length===0 && opt ==="remove"){
        //     content_path = ""
        //     console.log("remove file")
        // }
        // else if(opt ==="empty"){
        //     content_path = "http://127.0.0.1:8887/" + req.files[0].path;
        //     console.log("new file")
        // }
        // else{
        //     content_path = "http://127.0.0.1:8887/" + req.files[0].path;
        //     console.log("remove and add new file")
        // }
        
    
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
        const contentPath = req.body.content_path
        
    
        const query = "DELETE from announcement WHERE announcement_id=?;";
    
        db.query(query, [announcement_id], (err, result) => {
            if (err) throw err;

            if(contentPath!==null){
            fs.unlink(contentPath, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        }
            res.json({
                status: "ok",
              });
            
            });
        
    })
};

