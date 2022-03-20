var express = require('express');
var router = express.Router();
let db = require('../config/mysql');

/**
 * get category
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

    const sql = `SELECT * FROM category WHERE user_id = ?`;

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
            msg: "get category failed",
            status: false,
            code: 201,
            data: error
        });
    }
})

/**
 * deleted
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.json({
            msg: "id cannot be empty",
            status: false,
            code: 201,
            data: null
        });
    };

    const category_sql = `SELECT * FROM category WHERE id = ?`;

    const [category_data] = await db.query(category_sql, [id]);

    if (!category_data) {
        return res.json({
            msg: "cannot find category",
            status: false,
            code: 201,
            data: null
        });
    };

    const DELEDE_LIST = `delete from category where id = ?`;

    const resdata = await query(DELEDE_LIST, [id])

    res.json({
        msg: "ok！",
        status: false,
        code: 200,
        data: resdata
    });
})


/**
 * add interface
 */
router.post('/', async (req, res) => {
    let { cat_name, user_id } = req.body;


    if (!cat_name) {
        return res.json({
            msg: "name cannot be empty",
            status: false,
            code: 201,
            data: null
        });
    };

    // check id
    if (!user_id) {
        return res.json({
            msg: "id cannot be empty",
            status: false,
            code: 201,
            data: null
        });
    };

    const user_sql = `SELECT * FROM user WHERE id = ?`;

    const [user_data] = await db.query(user_sql, [user_id]);

    if (!user_data) {
        return res.json({
            msg: "cannot find ID ",
            status: false,
            code: 201,
            data: null
        });
    };

    // check existed
    let cat_sql = `SELECT * FROM category WHERE cat_name = ?`

    const [data] = await db.query(cat_sql, [cat_name])

    if (data) {
        return res.json({
            msg: "already existed",
            status: false,
            code: 201,
            data: null
        });
    }

    const query_list = {
        cat_name,
        user_id,
    };

    const sql = `INSERT INTO category SET ?`;

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

module.exports = router;