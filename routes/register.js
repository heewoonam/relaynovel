var express = require('express');
var router = express.Router();
var form = require('../postedform.js');
var db = require('../database.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.session.logined)
        res.redirect('/');
    res.render('register');
});

router.post('/', function (req, res, next) {
    form.handle_req(req, checkfield,
        'userimages/',
        req.session.user_id,
        'userimages/empty_user.jpg',
        setpostdata,
        'INSERT INTO User SET ?',
        function (err) {
            res.render('register', { message: err });
        },
        function () {
            res.redirect('/');
        });
});

function checkfield(req, entries, cberror, cbsuccess) {
    if (!(entries.fields.id && entries.fields.name && entries.fields.pswd1 && entries.fields.pswd2))
        cberror('필드를 다 채우세요.');
    else if (entries.fields.pswd1 != entries.fields.pswd2)
        cberror('패스워드가 일치하지 않습니다.');
    else if (entries.fields.id.length < 4 || entries.fields.id.length > 16)
        cberror('ID는 4~16자 이내로 작성 바랍니다.');
    else if (entries.fields.name.length < 4 || entries.fields.name.length > 16)
        cberror('닉네임은 4~16자 이내로 작성 바랍니다.');
    else {
        db.connection.query('select userid from User where userid=' + db.mysql.escape(entries.fields.id),
            function (err, db_id) {
                if (db_id && db_id[0]) {
                    cberror("아이디가 이미 존재합니다.");
                }
                else {
                    db.connection.query('select Nickname from User where Nickname=' + db.mysql.escape(entries.fields.nickname),
                        function (err, db_nickname) {
                            if (db_nickname && db_nickname[0]) {
                                cberror("닉네임이 이미 존재합니다.");
                            }
                            else cbsuccess(req, entries);
                        });
                }
            });
    }
}

function setpostdata(req, entries, image, callback) {
    var post = {
        userid: entries.fields.id,
        Nickname: entries.fields.name,
        Password: entries.fields.pswd1,
        Admin: false,
        Blocked: false,
        Profilepic: image
    }
    callback(req, post);
}

module.exports = router;
