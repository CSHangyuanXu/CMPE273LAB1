var express = require('express');
var router = express.Router();
// 数据库
let db = require('../config/mysql');

/**
 * 系统登录接口
 */
router.post('/', async (req, res) => {
    let { email, password } = req.body;

    // 帐号验证机制
    if (!email) {
        return res.json({
            msg: "帐号不能为空！",
            status: false,
            code: 201,
            data: null
        });
    };

    let emreg = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/;

    if (!emreg.test(email)) {
        return res.json({
            msg: "帐号必须为邮箱格式！",
            status: false,
            code: 201,
            data: null
        });
    }

    // 密码验证机制
    if (!password) {
        return res.json({
            msg: "密码不能为空！",
            status: false,
            code: 201,
            data: null
        });
    }

    let sql = `SELECT * FROM user WHERE email = ? AND password = ?`;

    let [user] = await db.query(sql, [email, password]);

    if (!user) {
        return res.json({
            msg: "账号或密码错误！",
            status: false,
            code: 201,
            data: null
        });
    }

    // 登录成功
    res.json({
        status: true,
        msg: "登录成功！",
        data: user,
        code: 200,
    });
});


module.exports = router;