const nodemailer = require("nodemailer")
module.exports = function (app, db, transporter) {
    app.post("/feedbackReply", (req, res) => {
       

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
     
    })
};