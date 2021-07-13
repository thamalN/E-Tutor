module.exports = function (app, db) {
    app.post("/signIn", (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
    
         const query = "SELECT user_id,user_flag,fname,lname FROM user WHERE username=? AND password=?;";
    
        db.query(query, [username, password], (err, result) => {
            if (err) throw err;
            if(result.length === 0)
                res.json("wrong")
            res.json(result[0])
        })
    })
};