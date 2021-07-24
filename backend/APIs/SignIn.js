const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require('./JWT')



module.exports = function (app, db) {
    app.post("/signIn", (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        bcrypt.hash(password, 10).then(hash => {
            console.log(hash)
        })

        const query = "SELECT user_id,user_flag,fname,lname, password FROM user WHERE username=?;";

        db.query(query, username, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {

                console.log(result[0].password)
                bcrypt.compare(password, result[0].password, (error, response) => {
                    console.log(response)
                    if (response) {
                        const accessToken = createTokens(result[0])

                        res.cookie("access-token", accessToken, {
                            maxAge: 60 * 60 * 24 * 1000,
                            // httpOnly: true
                        });

                        res.json(result[0])
                    }
                    else {
                        res.status(422).send("User doesn't exist");
                    }

                })
                // console.log(hash)
                // console.log(result[0].password)
                // const id = result[0].user_id;
                // const token = jwt.sign({id}, "jwtSecret")
            }
            else {
                res.status(422).send("wrong");
            }

        })

    })
};