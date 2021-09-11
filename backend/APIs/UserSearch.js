module.exports = function (app, db) {
    app.post("/searchUser", (req, res) => {
        let searchstring = req.body.search_string;
        const flag_user = req.body.user;
        const province = req.body.province;
        const gender = req.body.gender;
        const grade = req.body.grade;

        let criteria = []
        for (var key in req.body) {
            if (req.body[key] === true) {
                criteria.push(key)
            }


        }
        console.log(criteria)
        console.log(province)
        console.log(gender)
        console.log(grade)
        console.log(searchstring)

        const str = searchstring.split(/\s+/);
        var search_str = str.join("','") + "'";
        console.log(str)

        query1 = "SELECT * FROM user";
        let inserts = []
        if (flag_user != 1) {
            const tab = (flag_user == 2 ? "staff" : (flag_user == 3 ? "teacher" : "student"))
            query1 += " INNER JOIN " + tab + " ON user.user_id=" + tab + "." + tab + "_id"
            query1 += " WHERE user_flag=" + flag_user + " AND"

        }
        else {
            query1 += " WHERE";
        }

        if (province.length != 0) {
            query1 += " province IN (?) AND"
            inserts.push(province)
        }
        if (gender != "" && gender != "all") {
            query1 += " gender IN (?) AND"
            inserts.push(gender)
        }
        if (grade.length != 0) {
            query1 += " grade IN (?) AND"
            inserts.push(grade)
        }
        if (criteria.length != 0) {

            for (i = 0; i < criteria.length; i++) {
                query1 += " " + criteria[i] + " IN ('" + search_str + ") AND"
            }

        }
        query1 = query1.substring(0, query1.lastIndexOf(" "));
        query1 += ";"



        db.query(query1, inserts, (err, result) => {
            if (err) throw err;
            console.log(result)
            console.log(query1)
            res.json(result)
        })

    })

    app.post("/searchStudent", (req, res) => {
        let searchstring = req.body.search_string;
        const flag_user = req.body.user;
        const province = req.body.province;
        const gender = req.body.gender;
        const grade = req.body.grade;

        const tmp = searchstring.toString().split(/["|"]/)
        console.log(tmp)

        let criteria = []
        let criterias = []
        for (var key in req.body) {
            if (req.body[key] === true) {
                criteria.push(key)
                criterias.push(key)
            } else if(req.body[key] === false) {
                criterias.push(key)
            }
        }

         //console.log(criteria)
        // console.log(province)
        // console.log(gender)
        // console.log(grade)
        // console.log(searchstring)

        const str = searchstring.split(/\s+/);
        const splitSearch = tmp.map(element => {
            return element.trimEnd().trimStart()
        });

        var search_str = splitSearch.join("','") + "'";
        console.log(search_str)

        query1 = "SELECT * FROM student INNER JOIN user ON user.user_id = student.student_id WHERE";
        let inserts = []

        if (province.length != 0) {
            query1 += " province IN (?) AND"
            inserts.push(province)
        } else {
            criterias.push("province")
        }

        if (gender != "" && gender != "all") {
            query1 += " gender IN (?) AND"
            inserts.push(gender)
        } else {
            criterias.push("gender")
        }

        if (grade.length != 0) {
            query1 += " grade IN (?) AND"
            inserts.push(grade)
        } else {
            criterias.push("grade")
        }
        
        if (criteria.length != 0) {
            for (i = 0; i < criteria.length; i++) {
                if(i === 0) query1 += " ("
                query1 += " " +  criteria[i] + " IN ('" + search_str + ") OR"
                if(i === criteria.length-1) {
                    query1 = query1.substring(0, query1.lastIndexOf(" "));
                    query1 += ") "
                }
            }
        } else {
            for (i = 0; i < criterias.length; i++) {
                if(i === 0) query1 += " ("
                query1 += " " +  criterias[i] + " IN ('" + search_str + ") OR"
                if(i === criterias.length-1) {
                    query1 = query1.substring(0, query1.lastIndexOf(" "));
                    query1 += ") "
                }
            }
        }

        //console.log(criterias)

        query1 = query1.substring(0, query1.lastIndexOf(" "));
        query1 += ";"

        db.query(query1, inserts, function (err, result) {
            if (err) throw err;
            console.log(this.sql)


            // const fields = result.map((item => {
            //     return Object.values(item)
            // }))
            // console.log(fields)

            // const tmp2 = tmp.map(i => i.trimEnd().trimStart().toLowerCase())

            // const keywords = fields.map(i => {
            //     return i.filter(j => tmp2.includes(j.toString().toLowerCase()))
            // })

            res.json(result)
        })

    })
};