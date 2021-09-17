// const PDFDocument = require('pdfkit');
const nodemailer = require("nodemailer");
var fonts = {
  Roboto: {
    normal: './pdfmake/fonts/Roboto/Roboto-Regular.ttf',
    bold: './pdfmake/fonts/Roboto/Roboto-Medium.ttf',
    italics: './pdfmakefonts/Roboto/Roboto-Italic.ttf',
    bolditalics: './pdfmakefonts/Roboto/Roboto-MediumItalic.ttf'
  }
};
var PdfPrinter = require('pdfmake');
var printer = new PdfPrinter(fonts);
var fs = require('fs');
var Roboto = require('../pdfmake/fonts/Roboto');



module.exports = function (app, db, MySQLEvents, schedule) {
//   const pdfMake = require('../pdfmake/pdfmake');
// const vfsFonts = require('../pdfmake/vfs_fonts');
// pdfMake.vfs = vfsFonts.vfs;

    let teacherPayments = []
    let paymentArray = []

    // const date = new Date(2021, 08, 11, 19, 11, 20);

    // function groupBy(objectArray, property) {
    //     return objectArray.reduce(function (acc, obj) {
    //       let key = obj[property]
    //       if (!acc[key]) {
    //         acc[key] = []
    //       }
    //       acc[key].push(obj)
    //       return acc
    //     }, {})
    //   }

    const job = schedule.scheduleJob("22 11 14 * *", function () {

        const query = "SELECT course.*, teacher.*, user.fname, user.lname, user.email, user.contact, user.street_no, user.street, user.city, user.province, SUM(payment.amount)*0.6 AS amount_payable FROM course RIGHT JOIN teacher ON teacher.teacher_id=course.teacher_id  LEFT JOIN user ON user.user_id=teacher.teacher_id LEFT JOIN payment ON payment.course_id=course.course_id AND payment.verified=1 AND payment.month=MONTHNAME(NOW()) GROUP BY course.course_id HAVING course.course_id IS NOT NULL;"

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
        // let file_name;
        // let pathname;
        // let email_address;
        // let message;
        
        

        db.query(query, (err, result) => {
            if (err) throw err;
            // console.log(result)
            teacherPayments = JSON.parse(JSON.stringify(result))
            paymentArray = teacherPayments.reduce(function(acc, obj) {
              let key = obj.teacher_id
              if(!acc.find(i => i.property === key)) {
                  acc.push( { property: key, details: [] } )
              }
              var tmp = acc.find(i => i.property === key)
              tmp.details.push(obj)
              return acc
          }, [])
          

          const Tpay = paymentArray.map(pay => {
            let amount = pay.details.reduce(function(acc, obj){
                return acc + obj.amount_payable
            }, 0)
            let payments = {teacher_id: pay.property, total_amount: amount, fname:pay.details[0].fname, lname:pay.details[0].lname, email:pay.details[0].email, contact:pay.details[0].contact}
            
            var today = new Date();
          var this_month = today.toLocaleString('default', { month: 'long' });
          var rows = [];
          rows.push(['Course ID', 'Course', 'Amount Payable(LKR)']);

          pay.details.map(item => {
          rows.push([item.course_id, item.course_name + ' - ' + item.year, (item.amount_payable ? item.amount_payable : 0)]);
        })
        var dd = {
              content: [
              {text: 'ETutor - Teacher Payment Info - '+ this_month, style: 'header'},
              {text: 'Teacher Info', style: 'subheader'},
              
              {text: payments.fname+ ' ' + payments.lname},
              {text: payments.contact},
              {text: payments.email, lineHeight: 2},
                {text: 'Your total monthly payment for '+ this_month + ' has been listed below ', lineHeight: 2,},
                {
                  style: 'tableExample',
                  table: {
                    body: rows,
                    headerRows: 1,
                    widths: [ '*', 'auto', '*' ],
                  }
                },
                'Total Amount(LKR) ='+ (amount ? amount: 0)
              ],
              styles: {
                header: {
                  fontSize: 22,
                  bold: true
                },
                tableExample: {
                  margin: [0, 5, 0, 15]
                },
                subheader: {
                  fontSize: 16,
                  color: 'white',
                  background: 'darkblue',
                }
              }
              
            }

            let mailOptions = {
              from: process.env.EMAIL,
              to: payments.email,
              subject: 'Regarding Teacher Payments',
              text: 'Your total monthly payment details for '+ this_month + ' has been attached herewith. Thank You.',
              attachments: [{
                filename: payments.teacher_id+'.pdf',
                path: 'content/' +payments.teacher_id+'.pdf',
                contentType: 'application/pdf'
              }]
             };
            
            var pdfDoc = printer.createPdfKitDocument(dd);

            // var fs = require('fs');
            pdfDoc.pipe(fs.createWriteStream('content/' +payments.teacher_id+'.pdf'));
            pdfDoc.end();

            transporter.sendMail(mailOptions, function (err, data) {
            
              if (err) {
                  console.log(err);
                  
              } else {
                console.log("== Message Sent ==");
                       
              }
             });
        return payments
        
        })
            console.log(paymentArray)

            
            // pdfDoc.getBase64((data)=>{
            //   result.writeHead(200,
            //     {
            //       'Content-Type': 'application/pdf'
                
            //     });
            //     const download = Buffer.from(data.String('utf-8'), 'base64')
            // })
//             const doc = new PDFDocument();
//             doc.pipe(fs.createWriteStream('output.pdf'));

// // Embed a font, set the font size, and render some text
//         doc
//           .fontSize(25)
//           .text('E-Tutor', 100, 100);
//           doc.end();
                })

    });

};


