var express = require('express');
var router = express.Router();
// 数据库
let db = require('../config/mysql');

/**
 * 更新用户资料接口
 */
router.put('/edit/:id', async (req, res) => {
    const { id } = req.params

    let { avatar, username, email, password, birth_date, city, address, country, phone } = req.body;


    let emreg = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{1,10}$/;

    if (!emreg.test(email)) {
        return res.json({
            msg: "email only can use number and letter",
            status: false,
            code: 201,
            data: null
        });
    }

    let queryList = {
        avatar, username, email, password, birth_date, city, address, country, phone
    }

    Object.keys(queryList).forEach(item => {
        const key = queryList[item];

        if (!key) {
            delete queryList[item]
        }
    })

    const sql = `UPDATE user SET ? WHERE id = ?`

    let admin = await db.query(sql, [queryList, Number(id)]);


    if (admin) {
        const get_user_sql = `SELECT * FROM user WHERE id = ?`

        let user = await db.query(get_user_sql, [Number(id)]);

        return res.json({
            msg: "updated",
            status: true,
            code: 200,
            data: user[0] ? user[0] : {}
        });
    }

    res.json({
        msg: "update failed!",
        status: false,
        code: 201,
        data: null
    });


});

module.exports = router;