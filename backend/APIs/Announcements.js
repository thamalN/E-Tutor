const { validateToken, requiresAdminTeacher } = require('./JWT')
module.exports = function (app, db, upload, fs) {

    app.post("/createAnnouncement", requiresAdminTeacher, upload.single('file'), (req, res) => {

        const user_id = req.body.user_id;
        const topic = req.body.topic;
        const description = req.body.description;
        let file_name;

        let content_path;

        if (req.file !== undefined) {
            content_path = "http://127.0.0.1:8887/" + req.file.path;
            file_name = req.body.file_name;
        }
        else {
            content_path = null
            file_name = null
        }

        const query = "INSERT INTO announcement (user_id, topic, description, file_name, attachment, date_time, modified_at) VALUES  (?,?,?,?,?,now(),now());";

        db.query(query, [user_id, topic, description, file_name, content_path], (err, result) => {
            if (err) throw err;
            res.send("ok")
        });

    })

    app.get("/viewPreviousAnnouncements", requiresAdminTeacher, (req, res) => {
        const query = "SELECT announcement_id, topic, description, file_name, attachment, date_time, modified_at, user.user_id AS added_by, fname, lname  FROM announcement LEFT JOIN user on announcement.user_id=user.user_id  ORDER BY announcement.modified_at DESC;";

        db.query(query, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
    })

    app.post("/editAnnouncement", requiresAdminTeacher, upload.single('file'), (req, res) => {
 
        const announcement_id = req.body.announcement_id;
        const options = req.body.options;
        const user_id = req.body.user_id;
        const topic = req.body.topic;
        const description = req.body.description;
        const old_file_link = req.body.old_file_link
        const old_path = decodeURI(old_file_link).toString().split("/").pop()

        let file_name;
        let content_path;

        if (req.file !== undefined) {
            file_name = req.body.file_name;
            content_path = "http://127.0.0.1:8887/" + req.file.path;

            fs.unlink(old_path, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })

        } else {

            if (options === "remove") {
                content_path = null
                file_name = null

                fs.unlink(old_path, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })

            } else {

                if (old_file_link === "") {
                    content_path = null
                    file_name = null
                } else {
                    content_path = old_file_link;
                    file_name = req.body.file_name;
                }
            }

        }

        const query = "UPDATE announcement SET topic=?, description=?, file_name=?, attachment=?, modified_by=?, modified_at=now() WHERE announcement_id=?;";

        db.query(query, [topic, description, file_name, content_path, user_id, announcement_id], (err, result) => {
            if (err) throw err;
        });

        res.send("ok")

    })

    app.post("/deleteAnnouncement", requiresAdminTeacher, (req, res) => {
        console.log(req.body)
        const announcement_id = req.body.id;
        const contentPath = req.body.content_path


        const query = "DELETE from announcement WHERE announcement_id=?;";

        db.query(query, [announcement_id], (err, result) => {
            if (err) throw err;

            if (contentPath !== null) {
                fs.unlink(contentPath, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })
            }
            res.json({
                status: "ok",
            });

        });

    })
};

