module.exports = function (app, db, upload) {

    app.get("/studentHome/StudentDetails/:id", (req, res) => {
        const studentId = req.params.id;

        const query = "SELECT fname,lname,username,street_no,street,city,province,contact,birthday,gender FROM user WHERE user_id= ? ;";
        db.query(query, studentId, (err, result) => {
            if (err) throw err;
            console.log(err)
            res.json(result[0])
        })
    })



}