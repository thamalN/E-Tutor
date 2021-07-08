module.exports = function (app, db) {
    
    app.post("/createTeacherAcc", (req, res) => {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const street_no = req.body.street_no;
        const street = req.body.street;
        const city = req.body.city;
        const province = req.body.province;
        const email = req.body.email;
        const contact = req.body.contact;
        const birthday = req.body.birthday;
        const gender = req.body.gender;
        // const nic = req.body.nic;
        // const school = req.body.school;
        // const reg_date = req.body.reg_date;
        // const qualifications = req.body.qualifications;
        const username = req.body.username;
        const password = req.body.password;
    
         const query = "InSERT INTO user (firstname, lastname, street_no, street, city, province, email, contact, birthday, gender, username, password, user_flag) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,2);";
    
        db.query(query, [firstname, lastname, street_no, street, city, province, email, contact, birthday, gender, username, password], (err, result) => {
            if (err) throw err;
            res.json(result[0])
            console.log(result)
        })
    })
};

