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
        const nic = req.body.nic;
        const school = req.body.school;
        const reg_date = req.body.reg_date;
        const qualifications = req.body.qualifications;
        const username = req.body.username;
        const password = req.body.password;
    
         const query = "INSERT INTO user (fname, lname, street_no, street, city, province, email, contact, birthday, gender, regDate, username, password, user_flag) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,3);";
         const query2 = " INSERT INTO teacher (teacher_id, nic, school, qualifications) VALUES (?,?,?,?);";
         let user_id;
    
        db.query(query, [firstname, lastname, street_no, street, city, province, email, contact, birthday, gender, reg_date, username, password], (err, result) =>{
            if (err) throw err;
            let user_id = result.insertId;
            console.log(user_id);
                
    
                db.query(query2, [user_id, nic, school, qualifications], (err, result) => {
                    res.json(result.insertId);
                    
                });
            });
            
    })
};

