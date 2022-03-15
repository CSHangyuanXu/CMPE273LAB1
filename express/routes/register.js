var express = require('express');
var router = express.Router();
// 数据库
let db = require('../config/mysql');

/**
 * 系统注册接口
 */
router.post('/', async (req, res) => {
    let { username, email, password } = req.body;

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

    // 默认头像
    let defaultAvatar = `/images/avatar/default.jpg`;

    // 查询账户是否存在
    let sql = 'SELECT * FROM user WHERE email = ?';

    let [admin] = await db.query(sql, [email]);

    if (admin) {
        return res.json({
            msg: "账户已存在！",
            status: false,
            code: 201,
            data: null
        });
    }

    let query_list = {
        avatar: defaultAvatar,
        username,
        email,
        password
    }

    let set_sql = `INSERT INTO user SET ?`

    const register_res = await db.query(set_sql, [query_list])

    if (register_res.insertId) {
        return res.json({
            msg: "注册成功！",
            status: true,
            code: 200,
            data: null
        });
    }

    res.json({
        msg: "注册失败!",
        status: false,
        code: 201,
        data: null
    });


});

module.exports = router;