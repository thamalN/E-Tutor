const { requiresStudent } = require('./JWT')
module.exports = function (app, db, upload) {
    
   

    app.get("/studentAnnouncements", requiresStudent, (req, res) => {
        const query = "SELECT announcement_id, topic, description, file_name, attachment, date_time, modified_at, fname, lname  FROM announcement LEFT JOIN user on announcement.user_id=user.user_id  ORDER BY announcement.modified_at DESC;";

        db.query(query, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })

    
};

