module.exports = function (app, db) {
    app.get("/getAllTeachers", (req, res) =>{

        const query = "SELECT teacher.teacher_id, user.fname, user.lname FROM teacher INNER JOIN user ON teacher.teacher_id=user.user_id";

        db.query(query, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })

    app.get("/getTeacherPayments", (req, res) =>{

        let teacherPayments = []
        let paymentArray = []

        const query = "SELECT course.*, teacher.*, user.fname, user.lname, user.email, user.contact, user.street_no, user.street, user.city, user.province, SUM(payment.amount)*0.6 AS amount_payable FROM course RIGHT JOIN teacher ON teacher.teacher_id=course.teacher_id  LEFT JOIN user ON user.user_id=teacher.teacher_id LEFT JOIN payment ON payment.course_id=course.course_id AND payment.verified=1 AND payment.month='August' GROUP BY course.course_id HAVING course.course_id IS NOT NULL;"
        
        // function groupBy(objectArray, property) {
        //     return objectArray.reduce(function (acc, obj) {
        //       let key = obj[property]
        //       console.log(key)
              
        //       if (!acc[key]) {
        //         acc[key] = []
        //       }
        //       acc[key].push(acc[key])
        //       console.log(acc)
        //       console.log(key)
        //       return acc
        //     }, {})
        //   }

        //   function groupBy(objectArray) {
        //     return objectArray.reduce(function(acc, obj) {
        //         let key = obj.teacher_id
        //         if(!acc.find(i => i.property === key)) {
        //             acc.push( { property: key, details: [] } )
        //         }
        //         var tmp = acc.find(i => i.property === key)
        //         tmp.details.push(obj)
        //         return acc
        //     }, [])
        // }

        db.query(query, (err, result) => {
            if (err) throw err;
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
            console.log(paymentArray)
            res.json(paymentArray)
        })
    })
};