var express = require('express');
var router = express.Router();
// 数据库
let { query } = require('../config/mysql');


/**
 * 获取购物车
 */
router.get('/', async (req, res) => {
    const { user_id } = req.query;

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

    const GET_TABLE_LIST = `SELECT goods.id as goods_id,goods.*,carts.id,carts.amount
        FROM carts INNER JOIN goods ON carts.goods_id = goods.id WHERE user_id = ?`

    let res = await query(GET_TABLE_LIST, [user_id])

    res = res.map(item => ({
        ...item,
        goods_src: JSON.parse(item.goods_src)
    }))

    res.json({
        msg: "ok!",
        status: true,
        code: 200,
        data: res
    });

})

/**
 * 批量删除指定商品
 */
router.delete('/batch', async (req, res) => {
    const { ids } = req.query;

    const DELEDE_LIST = `delete from carts where id in (${ids})`;

    const res = await query(DELEDE_LIST, [])

    res.json({
        msg: "ok!",
        status: true,
        code: 200,
        data: res
    });
})

/**
 * 修改购物车商品数量
 */
router.post('/app/edit', async (req, res) => {
    const {
        carts_id = "",
        amount = 0,
    } = req.body

    // 验证ID是否存在
    if (!carts_id) {
        return res.json({
            msg: "ID不能为空！",
            status: false,
            code: 201,
            data: null
        });
    };

    // 验证数量是否合规
    if (Number(amount) <= 0) {
        return res.json({
            msg: "商品数量不正确！",
            status: false,
            code: 201,
            data: null
        });
    };

    const SET_TABLE = `UPDATE carts SET amount = ? WHERE id = ?`;

    const data = await query(SET_TABLE, [amount, carts_id])

    if (data) {
        res.body = {
            data: null,
            code: 200,
            msg: 'ok',
        }
    } else {
        res.body = {
            data: null,
            code: 400,
            msg: '添加购物车失败',
        }
    }
})

module.exports = router;