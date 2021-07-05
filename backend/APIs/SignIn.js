module.exports = function (app, db) {
    app.post("/signIn", (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
    
         const query = "SELECT user_id,user_flag FROM user WHERE username=? AND password=?;";
    
        db.query(query, [username, password], (err, result) => {
            if (err) throw err;
            res.json(result[0])
            console.log(result)
        })
    })
};