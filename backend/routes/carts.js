var express = require('express');
var router = express.Router();
let db = require('../config/mysql');

/**
 * cart
 */
router.get('/', async (req, res) => {
    const { user_id } = req.query;

    const GET_TABLE_LIST = `SELECT goods.id as goods_id,goods.*,carts.id,carts.amount,store.store_name
        FROM carts 
        INNER JOIN goods ON carts.goods_id = goods.id 
        INNER JOIN store ON goods.store_id = store.id 
        WHERE carts.user_id = ?`

    let list = await db.query(GET_TABLE_LIST, [user_id])

    res.json({
        msg: "ok！",
        status: true,
        code: 200,
        data: list
    });

})

/**
 * edit amount
 */
router.post('/app/edit', async (req, res) => {
    const {
        carts_id = "",
        amount = 0,
    } = req.body;

    if (amount === 0) {

        const sql = `delete from carts where id = ?`;

        const data = await db.query(sql, [carts_id])

        res.json({
            msg: "ok！",
            status: true,
            code: 200,
            data: data
        });

    }

    const SET_TABLE = `UPDATE carts SET amount = ? WHERE id = ?`;

    const data = await db.query(SET_TABLE, [amount, carts_id])

    if (data) {
        res.json({
            msg: "ok！",
            status: true,
            code: 200,
            data: data
        });
    } else {
        res.json({
            msg: "update failed!",
            status: false,
            code: 201,
            data: null
        });
    }
})

/**
 * add to cart
 */
router.post('/', async (req, res) => {
    const {
        goods_id = "",
        amount = 0,
        user_id = "",
    } = req.body

    const queryList = {
        goods_id,
        amount,
        user_id
    }

    // check
    const GET_TABLE = `SELECT * FROM carts WHERE user_id = ? AND goods_id = ?`

    const carts_list = await db.query(GET_TABLE, [user_id, goods_id]);

    if (carts_list.length) {

        const new_amount = Number(carts_list[0].amount) + Number(amount)

        const SET_TABLE = `UPDATE carts SET amount = ? WHERE id = ?`;

        const data = await db.query(SET_TABLE, [new_amount, carts_list[0].id])

        if (data) {
            res.json({
                msg: "ok！",
                status: true,
                code: 200,
                data: null
            });
        } else {
            res.json({
                msg: "add cart failed!",
                status: false,
                code: 201,
                data: null
            });
        }

    } else {
        const SET_TABLE = "INSERT INTO carts SET ?";

        const data = await db.query(SET_TABLE, queryList)

        if (data.insertId) {
            res.json({
                msg: "ok！",
                status: true,
                code: 200,
                data: null
            });
        } else {
            res.json({
                msg: "add cart failed!",
                status: false,
                code: 201,
                data: null
            });
        }

    }

})

module.exports = router;