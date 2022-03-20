var express = require('express');
var router = express.Router();
let db = require('../config/mysql');

/**
 * favourite
 */
router.get('/', async (req, res) => {
    let { user_id } = req.query;

    // check ID
    if (!user_id) {
        return res.json({
            msg: "ID cannot be empty",
            status: false,
            code: 201,
            data: null
        });
    };

    const user_sql = `SELECT * FROM user WHERE id = ?`;

    const [user_data] = await db.query(user_sql, [user_id]);

    if (!user_data) {
        return res.json({
            msg: "cannot find user",
            status: false,
            code: 201,
            data: null
        });
    };

    const sql = `SELECT goods.id as goods_id,goods.*,collection.user_id,collection.id FROM collection INNER JOIN goods ON collection.goods_id = goods.id WHERE user_id = ?`;

    try {
        const data = await db.query(sql, [user_id]);

        res.json({
            msg: "ok!",
            status: true,
            code: 200,
            data
        });
    } catch (error) {
        res.json({
            msg: "get favourites failed",
            status: false,
            code: 201,
            data: error
        });
    }
})

/**
 * delete
 */
router.delete('/', async (req, res) => {
    let { id } = req.body;

    const sql = `delete from collection where id = ?`;

    const data = await db.query(sql, [id])

    res.json({
        msg: "deleted!",
        status: true,
        code: 200,
        data: null
    });
})


/**
 * interface
 */
router.post('/', async (req, res) => {
    let { goods_id, user_id } = req.body;

    // check iteam
    if (!goods_id) {
        return res.json({
            msg: "id cannot be empty",
            status: false,
            code: 201,
            data: null
        });
    };
    if (!user_id) {
        return res.json({
            msg: "id can not be empty",
            status: false,
            code: 201,
            data: null
        });
    };

    const collection_sql = `SELECT * FROM collection WHERE goods_id = ? and user_id = ?`;

    const [collection_data] = await db.query(collection_sql, [goods_id, user_id]);

    if (collection_data) {
        return res.json({
            msg: "already have it",
            status: false,
            code: 201,
            data: null
        });
    };

    // check id
    const user_sql = `SELECT * FROM user WHERE id = ?`;

    const [user_data] = await db.query(user_sql, [user_id]);

    if (!user_data) {
        return res.json({
            msg: "didn't find user",
            status: false,
            code: 201,
            data: null
        });
    };

    const query_list = {
        goods_id, user_id
    };

    let set_sql = `INSERT INTO collection SET ?`

    const data = await db.query(set_sql, [query_list])

    if (data.insertId) {
        return res.json({
            msg: "favourited",
            status: true,
            code: 200,
            data: null
        });
    }

    res.json({
        msg: "favourite failed, try again!",
        status: false,
        code: 201,
        data: null
    });


});

module.exports = router;