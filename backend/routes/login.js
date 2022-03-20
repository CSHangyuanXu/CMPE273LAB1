var express = require('express');
var router = express.Router();
var md5 = require('md5-node');
let db = require('../config/mysql');

/**
 * interface 
 */
router.post('/', async (req, res) => {
    let { email, password } = req.body;

    // check
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
            msg: "email only can use number and letter",
            status: false,
            code: 201,
            data: null
        });
    }

    // check password
    if (!password) {
        return res.json({
            msg: "password cannot be empty",
            status: false,
            code: 201,
            data: null
        });
    }

    let sql = `SELECT * FROM user WHERE email = ? AND password = ?`;

    let [user] = await db.query(sql, [email, md5(password)]);

    if (!user) {
        return res.json({
            msg: "email/ password wrong",
            status: false,
            code: 201,
            data: null
        });
    }

    // login
    res.json({
        status: true,
        msg: "logged in!",
        data: user,
        code: 200,
    });
});


module.exports = router;