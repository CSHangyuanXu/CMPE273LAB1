var express = require('express');
var router = express.Router();
// 数据库
let db = require('../config/mysql');

/**
 * 验证商店名称的唯一性
 */
router.get('/name', async (req, res) => {
    let { store_name } = req.query;

    if (!store_name) {
        return res.json({
            msg: "商店的名称不能为空！",
            status: false,
            code: 201,
            data: null
        });
    };

    const sql = `SELECT * FROM store WHERE store_name = ?`;

    const [storeData] = await db.query(sql, [store_name]);

    if (storeData) {
        return res.json({
            msg: "商店名称已存在，不能再使用该名称！",
            status: false,
            code: 201,
            data: null
        });
    }

    res.json({
        msg: "该名称可以使用！",
        status: true,
        code: 200,
        data: null
    });
})


/**
 * 创建商店接口
 */
router.post('/', async (req, res) => {
    let { store_name, store_cover, user_id } = req.body;

    // 名称验证机制
    if (!store_name) {
        return res.json({
            msg: "商店名称不能为空！",
            status: false,
            code: 201,
            data: null
        });
    };
    // 商店图片验证机制
    if (!store_cover) {
        return res.json({
            msg: "商店图片不能为空！",
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

    const query_list = {
        store_name,
        store_cover,
        user_id
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

    // 验证用户是否创建有商店
    const user_store_sql = `SELECT * FROM store WHERE user_id = ?`;

    const [user_store_data] = await db.query(user_store_sql, [user_id])

    if (user_store_data) {
        return res.json({
            msg: "你已拥有商店！",
            status: false,
            code: 201,
            data: null
        });
    };

    let set_sql = `INSERT INTO store SET ?`

    const data = await db.query(set_sql, [query_list])

    if (data.insertId) {
        return res.json({
            msg: "创建商店成功！",
            status: true,
            code: 200,
            data: null
        });
    }

    res.json({
        msg: "创建商店失败，请重试!",
        status: false,
        code: 201,
        data: null
    });


});

/**
 * 编辑商店封面
 */
router.put('/edit/cover/:id', async (req, res) => {
    const { id } = req.params;

    let { store_cover } = req.body;

    // 验证ID是否存在
    if (!id) {
        return res.json({
            msg: "商店ID不能为空！",
            status: false,
            code: 201,
            data: null
        });
    };

    // 商店图片验证机制
    if (!store_cover) {
        return res.json({
            msg: "商店图片不能为空！",
            status: false,
            code: 201,
            data: null
        });
    };

    // 验证商店的id的真实性
    const sql = `SELECT * FROM store WHERE id = ?`;

    const [storeData] = await db.query(sql, [id]);

    if (!storeData) {
        return res.json({
            msg: "该id未找到商店！",
            status: false,
            code: 201,
            data: null
        });
    }

    const edit_sql = `UPDATE store SET store_cover = ? WHERE id = ?`

    let [editData] = await db.query(edit_sql, [store_cover, Number(id)]);

    if (editData) {
        return res.json({
            msg: "商店封面更新成功！",
            status: true,
            code: 200,
            data: null
        });
    }

    res.json({
        msg: "修改商店封面失败，请重试!",
        status: false,
        code: 201,
        data: null
    });
})

module.exports = router;