const nodemailer = require("nodemailer")
const { validateToken, requiresAdminStaff } = require('./JWT')
module.exports = function (app, db) {
  app.get("/pendingReceipts", requiresAdminStaff, (req, res) => {

    const query = "SELECT payment.payment_id, payment.payment_method, payment.student_id, payment.course_id, payment.date_time, payment.amount, payment.month, payment.verified, payment.payment_slip, user.fname, user.lname, user.email, user.contact FROM payment INNER JOIN user ON payment.student_id=user.user_id WHERE payment.verified=0;";

    db.query(query, (err, result) => {
      if (err) throw err;
      res.json(result)
    })
  })

  app.get("/verifiedPayments", requiresAdminStaff, (req, res) => {

    const query = "SELECT payment.payment_id, payment.payment_method, payment.student_id, payment.course_id, payment.date_time, payment.amount, payment.month, payment.verified, payment.payment_slip, user.fname, user.lname, user.email, user.contact FROM payment INNER JOIN user ON payment.student_id=user.user_id WHERE payment.verified=1 AND payment.month=MONTHNAME(NOW()) AND payment_method='Bank Slip';";

    db.query(query, (err, result) => {
      if (err) throw err;
      res.json(result)
    })
  })

  app.get("/totalPayments", validateToken, (req, res) => {

    const query = "SELECT p.course_id, SUM(p.amount) AS sum, p.month, c.course_name, c.year, u.fname, u.lname FROM payment AS p INNER JOIN course AS c INNER JOIN user AS u ON p.course_id = c.course_id AND c.teacher_id = u.user_id WHERE p.verified=1 AND p.month=MONTHNAME(NOW()) GROUP BY course_id ORDER BY course_id;";

    db.query(query, (err, result) => {
      if (err) throw err;
      res.json(result)
    })
  })

  app.get("/rejectedPayments", requiresAdminStaff, (req, res) => {

    const query = "SELECT payment.payment_id, payment.payment_method, payment.student_id, payment.course_id, payment.date_time, payment.amount, payment.month, payment.verified, payment.payment_slip, user.fname, user.lname, user.email, user.contact FROM payment INNER JOIN user ON payment.student_id=user.user_id WHERE payment.verified=2;";

    db.query(query, (err, result) => {
      if (err) throw err;
      res.json(result)
    })
  })

  app.post("/requiresAdminStaff", validateToken, (req, res) => {
    const verifyflag = req.body.verifyflag;
    const payment_id = req.body.payment_id;
    const student_id = req.body.student_id;
    const course_id = req.body.course_id;
    const month = req.body.month;
    const email = req.body.email;

    var access;
    var today = new Date();

    var today_month = today.toLocaleString('default', { month: 'long' });
    var day = today.getDate();
    console.log(today_month);
    console.log(day);

    var current = new Date();
    current.setMonth(current.getMonth() - 1);
    const previousMonth = current.toLocaleString('default', { month: 'long' });
    console.log(previousMonth);

    const msg = "Your payment for month " + month + " for course id " + course_id + " has been rejected. Contact ETutor administration for more information.";

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
    
    let mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Regarding course payments - ETutor",
      text: msg
    };

    const query = "SELECT access FROM enroll WHERE student_id= ? AND course_id=?;";
    const query2 = "UPDATE payment, enroll INNER JOIN payment AS pay ON pay.student_id = enroll.student_id SET pay.verified=?, enroll.access=? WHERE pay.payment_id= ? AND enroll.student_id= ? AND enroll.course_id=?;";
    const query3 = "UPDATE payment SET verified=? WHERE payment_id=?;";
    const query4 = "INSERT INTO enroll (student_id, course_id, access) VALUES (?,?,?);";


    db.query(query, [student_id, course_id], (err, result) => {
      if (err) throw err;
      else {
        console.log(result[0])
        
        if(result[0] !== undefined){
        access = result[0].access;
        if (verifyflag === 1) {
          if (access === 0) {
            if (month === today_month || (month === previousMonth && day < 14)) {
              db.query(query2, [verifyflag, 1, payment_id, student_id, course_id], (err, result) => {
                if (err) throw err;
                res.json({
                  status: "verified",
                });


              });
            }
            else {
              db.query(query3, [verifyflag, payment_id], (err, result) => {
                if (err) throw err;
                res.json({
                  status: "verified",
                });


              });
            }

          }
          else if (access === 1) {
            db.query(query3, [verifyflag, payment_id], (err, result) => {
              if (err) throw err;
              res.json({
                status: "verified",
              });


            });
          }
        }
        else if (verifyflag === 2) {
          if (access === 0) {
            db.query(query3, [verifyflag, payment_id], (err, result) => {
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
                      status: "rejected",
                    });


                  }
                });
              }


            });

          }
          else if (access === 1) {
            db.query(query2, [verifyflag, 0, payment_id, student_id, course_id], (err, result) => {
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
                      status: "rejected",
                    });


                  }
                });
              }


            });
          }

        }
      }
      else{
        if (verifyflag === 1) {
        db.query(query4, [student_id, course_id, 1], (err, result) => {
          if (err) throw err;
          else{
            db.query(query3, [verifyflag, payment_id], (err, result) => {
              if (err) throw err;
              res.json({
                status: "verified&enrolled",
              });


            });
          }
        
        });
      }
      else if(verifyflag === 2){
        db.query(query3, [verifyflag, payment_id], (err, result) => {
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
                  status: "rejected",
                });


              }
            });
          }
      });
      }
      }
      }

    });
  })

};