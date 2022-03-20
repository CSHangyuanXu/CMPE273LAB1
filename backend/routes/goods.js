var express = require('express');
var router = express.Router();
let db = require('../config/mysql');

/**
 * get all item
 */
router.get('/all', async (req, res) => {
    let sql = `SELECT * FROM goods`;

    let { price, stock, volume, start_price, end_price, isStock, work_key } = req.query;

    if (price) {
        sql = `SELECT * FROM goods ORDER BY price ${price}`;
    } else if (stock) {
        sql = `SELECT * FROM goods ORDER BY stock ${stock}`;
    } else if (volume) {
        sql = `SELECT * FROM goods ORDER BY volume ${volume}`;
    }

    if (end_price && start_price) {
        sql = `SELECT * FROM goods WHERE ${start_price} < price and price < ${end_price}`;
    }

    if (isStock) {
        sql = `SELECT * FROM goods WHERE 0 < stock`;
    }

    if (work_key) {
        sql = `SELECT * FROM goods WHERE name LIKE '%${work_key}%'`;
    }

    try {
        const data = await db.query(sql, []);

        res.json({
            msg: "ok!",
            status: true,
            code: 200,
            data
        });
    } catch (error) {
        res.json({
            msg: "get list failed!",
            status: false,
            code: 201,
            data: error
        });
    }
})

/**
 * detail
 */
router.get('/details', async (req, res) => {
    let { id } = req.query;

    const sql = `SELECT goods.*,store.store_name
    FROM goods INNER JOIN store ON goods.store_id = store.id WHERE goods.id = ?`;

    const [goods_data] = await db.query(sql, [id]);

    if (!goods_data) {
        return res.json({
            msg: "cannot find item",
            status: false,
            code: 201,
            data: null
        });
    };

    res.json({
        msg: "ok！",
        status: false,
        code: 200,
        data: goods_data
    });
})
/**
 * get item 
 */
router.get('/', async (req, res) => {
    let { store_id } = req.query;

    // check id
    if (!store_id) {
        return res.json({
            msg: "id cannot be empty",
            status: false,
            code: 201,
            data: null
        });
    };

    const user_sql = `SELECT * FROM store WHERE id = ?`;

    const [user_data] = await db.query(user_sql, [store_id]);

    if (!user_data) {
        return res.json({
            msg: "cannot find ID",
            status: false,
            code: 201,
            data: null
        });
    };

    const sql = `SELECT * FROM goods WHERE store_id = ?`;

    try {
        const data = await db.query(sql, [store_id]);

        res.json({
            msg: "ok!",
            status: true,
            code: 200,
            data
        });
    } catch (error) {
        res.json({
            msg: "get list failed",
            status: false,
            code: 201,
            data: error
        });
    }
})

/**
 * add interface
 */
router.post('/', async (req, res) => {
    let { cate_name, name, cover, goods_dec, price, stock, store_id } = req.body;

    // check id
    const user_sql = `SELECT * FROM store WHERE id = ?`;

    const [user_data] = await db.query(user_sql, [store_id]);

    if (!user_data) {
        return res.json({
            msg: "cannot find store",
            status: false,
            code: 201,
            data: null
        });
    };

    const query_list = {
        cate_name,
        name,
        cover,
        goods_dec,
        price,
        stock,
        store_id,
        volume: 0,
    };

    const sql = `INSERT INTO goods SET ?`;

    const cat_data = await db.query(sql, [query_list])

    if (cat_data.insertId) {
        return res.json({
            msg: "created!",
            status: true,
            code: 200,
            data: null
        });
    }

    res.json({
        msg: "create failed!",
        status: false,
        code: 201,
        data: null
    });

});

/**
 * update
 */
router.put('/edit/:id', async (req, res) => {
    const { id } = req.params

    let { cate_name, name, cover, goods_dec, price, stock } = req.body;

    let queryList = {
        cate_name,
        name,
        cover,
        goods_dec,
        price,
        stock
    }

    const sql = `UPDATE goods SET ? WHERE id = ?`

    let admin = await db.query(sql, [queryList, Number(id)]);


    if (admin) {
        return res.json({
            msg: "updated",
            status: true,
            code: 200,
            data: admin
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