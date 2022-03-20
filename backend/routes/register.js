var express = require('express');
var router = express.Router();
var md5 = require('md5-node');
let db = require('../config/mysql');

/**
 * interface
 */
router.post('/', async (req, res) => {
    let { username, email, password } = req.body;

    if (!email) {
        return res.json({
            msg: "email cannot be empty",
            status: false,
            code: 201,
            data: null
        });
    };

    let emreg = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{1,10}$/;

    if (!emreg.test(email)) {
        return res.json({
            msg: "email only can use number and letter！",
            status: false,
            code: 201,
            data: null
        });
    }

    if (!password) {
        return res.json({
            msg: "password cannot be empty",
            status: false,
            code: 201,
            data: null
        });
    }

    let defaultAvatar = `avatar/default.png`;

    // check account
    let sql = 'SELECT * FROM user WHERE email = ?';

    let [admin] = await db.query(sql, [email]);

    if (admin) {
        return res.json({
            msg: "account existed",
            status: false,
            code: 201,
            data: null
        });
    }

    let query_list = {
        avatar: defaultAvatar,
        username,
        email,
        password:md5(password)
    }

    let set_sql = `INSERT INTO user SET ?`

    const register_res = await db.query(set_sql, [query_list])

    if (register_res.insertId) {
        return res.json({
            msg: "registerd!",
            status: true,
            code: 200,
            data: null
        });
    }

    res.json({
        msg: "register failed!",
        status: false,
        code: 201,
        data: null
    });


});

module.exports = router;