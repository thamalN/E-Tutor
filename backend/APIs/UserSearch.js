module.exports = function (app, db) {
    app.post("/searchUser", (req, res) => {
    var searchstring = req.body.searchstring;
    const flag_user = req.body.user_type;

    var arr = searchstring.split(/\s+/);
        
     const query1 = "SELECT * FROM user WHERE ?? IN ??;";
        if(flag_user === 1){
            db.query(query1, [], (err, result) => {
                if (err) throw err;
                res.json(result)
            })
        }
        else if(flag_user === 2){
            db.query(query2, (err, result) => {
                if (err) throw err;
                res.json(result)
            })
        }
        else if(flag_user === 3){
            db.query(query3, (err, result) => {
                if (err) throw err;
                res.json(result)
            })

        }
        else if(flag_user === 4){
            db.query(query4, (err, result) => {
                if (err) throw err;
                res.json(result)
            })

        }
        
    })
};