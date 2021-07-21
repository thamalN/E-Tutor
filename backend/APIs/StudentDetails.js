module.exports = function (app, db, upload) {

    app.get("/studentHome/StudentDetails/:id", (req, res) => {
        const studentId = req.body.id;

        const query = "SELECT * firstname,lastname,username,school,grade,guardian_contact,street_no,street,city,province,contact,birthday,gender FROM user WHERE user_id=?;";

        db.query(query, studentId, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })



}