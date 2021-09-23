const bcrypt = require('bcryptjs')
const nodemailer = require("nodemailer")
const { validateToken, requiresAdmin } = require('./JWT')

module.exports = function (app, db) {

  app.post("/createTeacherAcc", requiresAdmin, (req, res) => {
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

    const msg = "Your Etutor teacher account has been created successfully. Your account username is " + username + " and password is " + password + ".";

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



    bcrypt.hash(password, 10).then((hash) => {

      const query = "INSERT INTO user (fname, lname, street_no, street, city, province, email, contact, birthday, gender, username, password, user_flag, regDate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,3,now());";
      const query2 = " INSERT INTO teacher (teacher_id, nic, school, qualifications, joined_date) VALUES (?,?,?,?,?);";
      let user_id;

      db.query(query, [firstname, lastname, street_no, street, city, province, email, contact, birthday, gender, username, hash], (err, result) => {
        if (err) throw err;
        let user_id = result.insertId;
        console.log(user_id);


        db.query(query2, [user_id, nic, school, qualifications, joined_date], (err, result) => {
          if (err) throw err;
          else {
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
    })

  })

  app.post("/createSupStaffAcc", requiresAdmin, (req, res) => {
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

    const msg = "Your Etutor staff account has been created successfully. Your account username is " + username + " and password is " + password + ".";

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



    bcrypt.hash(password, 10).then((hash) => {

      const query = "INSERT INTO user (fname, lname, street_no, street, city, province, email, contact, birthday, gender, username, password, user_flag, regDate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,2,now());";
      const query2 = " INSERT INTO staff (staff_id, nic, joined_date) VALUES (?,?,?);";

      db.query(query, [firstname, lastname, street_no, street, city, province, email, contact, birthday, gender, username, hash], (err, result) => {
        if (err) throw err;
        let user_id = result.insertId;
        console.log(user_id);


        db.query(query2, [user_id, nic, joined_date], (err, result) => {
          if (err) throw err;
          else {
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
    })
  })

  app.get("/recentRegistrations", validateToken, (req, res) => {

    const query = "SELECT * FROM user where regDate BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND NOW();";

    db.query(query, (err, result) => {
      if (err) throw err;
      res.json(result)
    })
  })

  app.get("/recentStaffRegistrations", validateToken, (req, res) => {

    const query = "SELECT * FROM user where regDate BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND NOW();";

    db.query(query, (err, result) => {
      if (err) throw err;
      res.json(result)
    })
  })

  app.get("/mostRecentStaffRegistrations", validateToken, (req, res) => {

    const query = "SELECT * FROM user where regDate BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND NOW();";

    db.query(query, (err, result) => {
      if (err) throw err;
      res.json(result)
    })
  })

  app.get("/allStudents", validateToken, (req, res) => {

    const query = "SELECT * FROM student AS s INNER JOIN user AS u ON u.user_id = s.student_id;";

    db.query(query, (err, result) => {
      if (err) throw err;
      res.json(result)
    })
  })

  app.get("/allTeachers", validateToken, (req, res) => {

    const query = "SELECT * FROM teacher AS t INNER JOIN user AS u ON u.user_id = t.teacher_id;";

    db.query(query, (err, result) => {
      if (err) throw err;
      res.json(result)
    })
  })

  app.get("/allStaff", validateToken, (req, res) => {

    const query = "SELECT * FROM staff AS s INNER JOIN user AS u ON u.user_id = s.staff_id;";

    db.query(query, (err, result) => {
      if (err) throw err;
      res.json(result)
    })
  })
};

