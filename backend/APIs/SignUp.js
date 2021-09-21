const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer")
module.exports = function (app, db) {
    
    app.post("/signUp", (req, res) => {
        const flag = req.body.user_type;
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

        bcrypt.hash(password, 10).then((hash) => {

            const query = "INSERT INTO user (fname, lname, street_no, street, city, province, email, contact, birthday, gender, username, password, regDate, user_flag) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,now(),4);";
            const query2 = " INSERT INTO student (student_id, grade, school, guardian_contact) VALUES (?,?,?,?);";

            if(flag == 0){
                db.query(query, [firstname, lastname, street_no, street, city, province, email, contact, birthday, gender, username, hash], (err, result) =>{
                    if (err) throw err;
                    let user_id = result.insertId;
                    console.log(user_id);
                        
            
                        db.query(query2, [user_id, grade, school, guardian_contact], (err, result) => {
                            res.json(result.insertId);
                            
                        });
                    });
            }
            else{

                const msg = "Your Etutor student account has been created successfully. Your account username is " + username + " and password is " + password + ".";
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    
                    auth: {
                      type: 'OAuth2',
                      user: process.env.EMAIL,
                      pass: process.env.PASS,
                      clientId: process.env.OAUTH_CLIENTID,
                      clientSecret: process.env.OAUTH_CLIENT_SECRET,
                      refreshToken: process.env.OAUTH_REFRESH_TOKEN
                      
                      
                    }
                  })
                  console.log(msg)
                  let mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Registration in ETutor",
                    text: msg
                   };
                db.query(query, [firstname, lastname, street_no, street, city, province, email, contact, birthday, gender, username, hash], (err, result) =>{
                    if (err) throw err;
                    let user_id = result.insertId;
                    console.log(user_id);
                        
            
                        db.query(query2, [user_id, grade, school, guardian_contact], (err, result) => {
                            if (err) throw err;
                            else{
                                transporter.sendMail(mailOptions, function (err, data) {
                        
                                  if (err) {
                                      console.log(err);
                                      res.json({
                                          status: "fail",
                                        });
                                  } else {
                                    console.log("== Message Sent ==");
                                        res.json({
                                          status: "success",
                                        });
                                      
                                      
                                  }
                                 });
                              }
                            
                        });
                    });
            }
         
    
        
        })
    
         
            
    })

    app.get("/getAllUsernames", (req, res) =>{

        const query = "SELECT username, email FROM user";

        db.query(query, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })

    app.get("/getOtherUsernames/:id", (req, res) =>{

        const user_id = req.params.id

        const query = "SELECT username FROM user WHERE user_id != ?";

        db.query(query, user_id, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })
};

