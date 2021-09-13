module.exports = function (app, db) {
    
    app.post("/stuFeedback", (req, res) => {
       
        console.log(req.body)
        
        const username = req.body.username;
        const coursename = req.body.coursename;
        const topic= req.body.topic;
        const description = req.body.description;
        
       
         const query = "INSERT INTO StuEvent (username,coursename,topic, description) VALUES (?,?,?,?);";
    
        db.query(query, [username,coursename,topic,description], (err, result) =>{
            if (err) throw err;
            let user_id = result.insertId;
            console.log(user_id);
                    
            });        
            
    })

};

