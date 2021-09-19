module.exports = function (app, db, stripe, uuid, upload) {

  app.get("/paymentStudent", (req, res) => {
    res.send("Add your Stripe Secret Key to the .require('stripe') statement!");
  });

  app.post("/paymentStudent", async (req, res) => {
    console.log("Request:", req.body);
    const student_id = req.body.student_id;
      const course_id = req.body.course_id;
      const amount = req.body.amount;

    let error;
    let status;
    try {
      const token = req.body.token;

      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
      });

      const idempotency_key = uuid();
      const charge = await stripe.charges.create(
        {
          amount: amount * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          //   description: `Purchased the ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              line2: token.card.address_line2,
              city: token.card.address_city,
              country: token.card.address_country,
              postal_code: token.card.address_zip
            }
          }
        },
        {
          idempotency_key
        }
      );
      console.log("Charge:", { charge });
      status = "success";
      
      console.log(amount)
      const payment_method = "Card";
      const verified = 1;
      const today = new Date();
      const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

      const month = monthNames[today.getMonth()];


      const query = "INSERT INTO payment (student_id, course_id, payment_method, amount, month, date_time, verified) VALUES  (?,?,?,?,?,now(),?);";

      db.query(query, [student_id, course_id, payment_method,  amount, month, verified], (err, result) => {
          if (err) throw err;
          res.json(result.insertId)
          console.log(result.insertId)
          
          });
      
    } catch (error) {
      console.error("Error:", error);
      status = "failure";
      res.json({ error, status });
    }

   
  });




  

  app.post("/paymentUpdate", (req, res) => {
    console.log(req.body)
    console.log(req.files)
    const user_id = req.body.student_id;
    const course_id = req.body.course_id;
    const payment_method = req.body.payment_method;
    const amount = req.body.amount;
    const month = req.body.month;

    const query = "INSERT INTO payment (student_id, course_id, payment_method, amount, month, date_time) VALUES  (?,?,?,?,?,now());";

    db.query(query, [user_id, course_id, payment_method,  amount, month], (err, result) => {
        if (err) throw err;
        res.json(result.insertId)
        console.log(result.insertId)
        
        });
    
})

app.post("/allPayments", (req, res) => {
  const studentId = req.body.id;

  const query = "SELECT payment.payment_id, payment.payment_method, payment.date_time, payment.amount, payment.month, course.course_name, course.year, course.description, course.price FROM payment INNER JOIN course ON course.course_id = payment.course_id WHERE payment.student_id=?;";

  db.query(query, studentId, (err, result) => {
      if (err) throw err;
      res.json(result)
  })
})

app.post("/uploadPayslip", upload.single('file'), (req, res) => {
  console.log(req.body)
  console.log(req.file)
  const student_id = req.body.student_id;
  const course_id = req.body.course_id;
  const amount = req.body.amount;
  const payment_method = "Bank Slip";
  const verified = 0;
  const today = new Date();
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const month = monthNames[today.getMonth()];
  let content_path;
  
  if(req.file !== undefined){
      content_path = "http://127.0.0.1:8887/" + req.file.path;

  }
  else{
      content_path = null
  }
  
  // const query = "INSERT INTO announcement (user_id, topic, description, file_name, attachment, date_time, modified_at) VALUES  (?,?,?,?,?,now(),now());";
  const query = "INSERT INTO payment (student_id, course_id, payment_method, date_time, amount, month, verified, payment_slip) VALUES  (?,?,?,now(),?,?,?,?);";


  db.query(query, [student_id, course_id, payment_method, amount, month , verified, content_path], (err, result) => {
      if (err) throw err;
      res.json(result.insertId)
      console.log(result.insertId)
      
      });
  
})




}

// module.exports = function (app, db, upload) {

//   app.post("/studentCourses", (req, res) => {
//       const studentId = req.body.id;

//       const query = "SELECT * FROM course WHERE course_id IN( SELECT course_id FROM enroll WHERE student_id=?);";

//       db.query(query, studentId, (err, result) => {
//           if (err) throw err;
//           res.json(result)
//       })
//   })

//   app.get("/studentCourses/:id", (req, res) => {
//       const courseId = req.params.id;
//       const query = "SELECT course.course_id,course.teacher_id, course.course_name, course.year, course.description, lesson.lesson_id, lesson.topic, content.content_id, content.content_name, content.content, user.fname, user.lname FROM (((course INNER JOIN user ON course.teacher_id = user.user_id )RIGHT JOIN lesson ON course.course_id = lesson.course_id) LEFT JOIN content ON lesson.lesson_id = content.lesson_id) WHERE course.course_id=?;";

//       db.query(query, courseId, (err, result) => {
//           if (err) throw err;
//           res.json(result)
//       })
//   })

// };
