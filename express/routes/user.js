var express = require('express');
var router = express.Router();
// 数据库
let db = require('../config/mysql');

/**
 * 更新用户资料接口
 */
router.put('/edit/:id', async (req, res) => {
    const { id } = req.params

    let { avatar, username, email, password, birth_date, city, address, country } = req.body;

    // 邮箱验证机制
    let emreg = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/;

    if (!emreg.test(email)) {
        return res.json({
            msg: "帐号必须为邮箱格式！",
            status: false,
            code: 201,
            data: null
        });
    }

    const queryList = {
        avatar, username, email, password, birth_date, city, address, country
    }

    const sql = `UPDATE user SET ? WHERE id = ?`

    let [admin] = await db.query(sql, [queryList, Number(id)]);

    if (admin) {
        return res.json({
            msg: "资料更新成功！",
            status: true,
            code: 200,
            data: null
        });
    }

    res.json({
        msg: "资料更新失败!",
        status: false,
        code: 201,
        data: null
    });


});

module.exports = router;