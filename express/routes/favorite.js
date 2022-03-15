var express = require('express');
var router = express.Router();
// 数据库
let db = require('../config/mysql');

/**
 * 获取用户的收藏夹
 */
router.get('/', async (req, res) => {
    let { user_id } = req.query;

    // 验证ID是否存在
    if (!user_id) {
        return res.json({
            msg: "用户ID不能为空！",
            status: false,
            code: 201,
            data: null
        });
    };

    // 验证用户id的真实性
    const user_sql = `SELECT * FROM user WHERE id = ?`;

    const [user_data] = await db.query(user_sql, [user_id]);

    if (!user_data) {
        return res.json({
            msg: "该id未找到用户！",
            status: false,
            code: 201,
            data: null
        });
    };

    const sql = `SELECT goods.*,favorite.user_id FROM favorite INNER JOIN goods ON favorite.goods_id = goods.id WHERE user_id = ?`;

    try {
        const [data] = await db.query(sql, [user_id]);

        res.json({
            msg: "ok!",
            status: true,
            code: 200,
            data
        });
    } catch (error) {
        res.json({
            msg: "获取收藏列表失败！",
            status: false,
            code: 201,
            data: error
        });
    }
})


/**
 * 收藏接口
 */
router.post('/', async (req, res) => {
    let { goods_id, user_id } = req.body;

    // 商品id验证机制
    if (!goods_id) {
        return res.json({
            msg: "商品ID不能为空！",
            status: false,
            code: 201,
            data: null
        });
    };
    // 用户ID验证机制
    if (!user_id) {
        return res.json({
            msg: "用户id不能为空！",
            status: false,
            code: 201,
            data: null
        });
    };

    // 验证用户id的真实性
    const user_sql = `SELECT * FROM user WHERE id = ?`;

    const [user_data] = await db.query(user_sql, [user_id]);

    if (!user_data) {
        return res.json({
            msg: "该id未找到用户！",
            status: false,
            code: 201,
            data: null
        });
    };

    const query_list = {
        goods_id, user_id
    };

    let set_sql = `INSERT INTO favorite SET ?`

    const data = await db.query(set_sql, [query_list])

    if (data.insertId) {
        return res.json({
            msg: "收藏成功！",
            status: true,
            code: 200,
            data: null
        });
    }

    res.json({
        msg: "收藏商品失败，请重试!",
        status: false,
        code: 201,
        data: null
    });


});

module.exports = router;