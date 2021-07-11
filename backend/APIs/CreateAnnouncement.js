module.exports = function (app, db) {
    
    app.post("/createAnnouncement", (req, res) => {
        const user_id = req.body.user_id;
        const topic = req.body.topic;
        const description = req.body.description;
    
        const query = "INSERT INTO announcement (user_id, topic, description, date_time) VALUES  (?,?,?,now());";
    
        db.query(query, [user_id, topic, description], (err, result) => {
            if (err) throw err;
            res.json(result.insertId)
            console.log(result.insertId)
            
            });
            
        
    


        
    })
};

