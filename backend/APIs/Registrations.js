const bcrypt = require('bcrypt')
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
        const joined_date = req.body.joined_date;
        const qualifications = req.body.qualifications;
        const username = req.body.username;
        const password = req.body.password;

        bcrypt.hash(password, 10).then((hash) => {
    
         const query = "INSERT INTO user (fname, lname, street_no, street, city, province, email, contact, birthday, gender, username, password, user_flag, regDate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,3,now());";
         const query2 = " INSERT INTO teacher (teacher_id, nic, school, qualifications, joined_date) VALUES (?,?,?,?,?);";
         let user_id;
    
        db.query(query, [firstname, lastname, street_no, street, city, province, email, contact, birthday, gender, username, hash], (err, result) =>{
            if (err) throw err;
            let user_id = result.insertId;
            console.log(user_id);
                
    
                db.query(query2, [user_id, nic, school, qualifications, joined_date], (err, result) => {
                    res.json(result.insertId);
                    
                });
            });
        })
            
    })

    app.post("/createSupStaffAcc", (req, res) => {
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
        const joined_date = req.body.joined_date;
        const username = req.body.username;
        const password = req.body.password;

        bcrypt.hash(password, 10).then((hash) => {
    
         const query = "INSERT INTO user (fname, lname, street_no, street, city, province, email, contact, birthday, gender, username, password, user_flag, regDate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,2,now());";
         const query2 = " INSERT INTO staff (staff_id, nic, joined_date) VALUES (?,?,?);";
    
        db.query(query, [firstname, lastname, street_no, street, city, province, email, contact, birthday, gender, username, hash], (err, result) =>{
            if (err) throw err;
            let user_id = result.insertId;
            console.log(user_id);
                
    
                db.query(query2, [user_id, nic, joined_date], (err, result) => {
                    res.json(result.insertId);
                    
                });
            });
        }) 
    })

    app.get("/recentRegistrations", (req, res) => {
        
        const query = "SELECT * FROM user where regDate BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND NOW();";
       
           db.query(query, (err, result) => {
               if (err) throw err;
               res.json(result)
           })
       })
};

