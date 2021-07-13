module.exports = function (app, db) {
    
    app.post("/signUp", (req, res) => {
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
        const guardian_contact = req.body.guardian_contact;
        const school = req.body.school;
        const grade = req.body.grade;
        const username = req.body.username;
        const password = req.body.password;
    
         const query = "INSERT INTO user (fname, lname, street_no, street, city, province, email, contact, birthday, gender, username, password, regDate, user_flag) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,now(),4);";
         const query2 = " INSERT INTO student (student_id, grade, school, guardian_contact) VALUES (?,?,?,?);";
         
    
        db.query(query, [firstname, lastname, street_no, street, city, province, email, contact, birthday, gender, username, password], (err, result) =>{
            if (err) throw err;
            let user_id = result.insertId;
            console.log(user_id);
                
    
                db.query(query2, [user_id, grade, school, guardian_contact], (err, result) => {
                    res.json(result.insertId);
                    
                });
            });
            
    })
};

