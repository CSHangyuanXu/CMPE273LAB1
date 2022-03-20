var express = require('express');
var router = express.Router();
let db = require('../config/mysql');

router.get('/details', async (req, res) => {
    let { id } = req.query;

    const sql = `SELECT store.*,user.avatar,user.username 
        FROM store 
        INNER JOIN user ON store.user_id = user.id
        WHERE store.id = ?`

    const [storeData] = await db.query(sql, [id]);

    if (!storeData) {
        return res.json({
            msg: "cannot find store!",
            status: false,
            code: 201,
            data: null
        });
    }

    res.json({
        msg: "ok！",
        status: true,
        code: 200,
        data: storeData
    });
})

/**
 * check avaiable
 */
router.get('/name', async (req, res) => {
    let { store_name } = req.query;

    if (!store_name) {
        return res.json({
            msg: "cannot be empty",
            status: false,
            code: 201,
            data: null
        });
    };

    const sql = `SELECT * FROM store WHERE store_name = ?`;

    const [storeData] = await db.query(sql, [store_name]);

    if (storeData) {
        return res.json({
            msg: "already existed！",
            status: false,
            code: 201,
            data: null
        });
    }

    res.json({
        msg: "you can use it",
        status: true,
        code: 200,
        data: null
    });
})

/**
 * get infor
 */
router.get('/user/store/info', async (req, res) => {
    let { user_id } = req.query;

    if (!user_id) {
        return res.json({
            msg: "id canot be empty",
            status: false,
            code: 201,
            data: null
        });
    };

    const sql = `SELECT * FROM store WHERE user_id = ?`;

    const [storeData] = await db.query(sql, [user_id]);

    if (storeData) {
        res.json({
            msg: "ok",
            status: true,
            code: 200,
            isOpen: true,
            data: storeData
        });
    } else {
        res.json({
            msg: "ok",
            status: true,
            code: 200,
            isOpen: false,
            data: {}
        });
    }
})

/**
 * interface
 */
router.post('/', async (req, res) => {
    let { store_name, store_cover, user_id } = req.body;

    if (!store_name) {
        return res.json({
            msg: "name cannot be empty",
            status: false,
            code: 201,
            data: null
        });
    };
    if (!store_cover) {
        return res.json({
            msg: "picture cannot be empty",
            status: false,
            code: 201,
            data: null
        });
    };
    if (!user_id) {
        return res.json({
            msg: "id cannot be empty",
            status: false,
            code: 201,
            data: null
        });
    };

    const query_list = {
        store_name,
        store_cover,
        user_id,
        revenue: 0,
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


    const user_store_sql = `SELECT * FROM store WHERE user_id = ?`;

    const [user_store_data] = await db.query(user_store_sql, [user_id])

    if (user_store_data) {
        return res.json({
            msg: "you have one store already",
            status: false,
            code: 201,
            data: null
        });
    };

    let set_sql = `INSERT INTO store SET ?`

    const data = await db.query(set_sql, [query_list])

    if (data.insertId) {
        return res.json({
            msg: "created",
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
 * edit
 */
router.put('/edit/store/:id', async (req, res) => {
    const { id } = req.params;

    let { store_cover, store_name } = req.body;


    if (!id) {
        return res.json({
            msg: "id cannot be empty",
            status: false,
            code: 201,
            data: null
        });
    };

    if (!store_cover) {
        return res.json({
            msg: "picture cannot be empty",
            status: false,
            code: 201,
            data: null
        });
    };

    if (!store_name) {
        return res.json({
            msg: "name cannot be empty",
            status: false,
            code: 201,
            data: null
        });
    };


    const sql = `SELECT * FROM store WHERE id = ?`;

    const [storeData] = await db.query(sql, [id]);

    if (!storeData) {
        return res.json({
            msg: "cannot find store",
            status: false,
            code: 201,
            data: null
        });
    }

    const query_list = {
        store_name,
        store_cover,
    };

    const edit_sql = `UPDATE store SET ? WHERE id = ?`

    let editData = await db.query(edit_sql, [query_list, Number(id)]);

    if (editData) {
        const sql = `SELECT * FROM store WHERE id = ?`;

        const [storeData] = await db.query(sql, [Number(id)]);

        return res.json({
            msg: "updated",
            status: true,
            code: 200,
            data: storeData
        });
    }

    res.json({
        msg: "update failed!",
        status: false,
        code: 201,
        data: {}
    });
})

module.exports = router;