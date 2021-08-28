const nodemailer = require("nodemailer")
module.exports = function (app, db) {
    app.post("/feedbackReply", (req, res) => {

      const feedback_id = req.body.feedback_id;
      const remarks = req.body.remarks;
      const handled_by = req.body.handled_by;
       

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
            to: req.body.email,
            subject: req.body.subject,
            text: req.body.message
           };
          
           

           const query = "UPDATE feedback SET remarks=?, handled_by=?, handled=1 WHERE feedback_id= ?;";
    
              db.query(query, [remarks, handled_by, feedback_id], (err, result) => {
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
     
    })

    app.get("/viewFeedback", (req, res) => {
      const query = "SELECT feedback_id, feedback.user_id, topic, description, date_time, fname, lname, email  FROM feedback LEFT JOIN user ON feedback.user_id=user.user_id  ;";

      db.query(query, (err, result) => {
          if (err) throw err;
          res.json(result)
      })
  })
};