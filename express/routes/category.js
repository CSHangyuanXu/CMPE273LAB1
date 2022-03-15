var express = require('express');
var router = express.Router();
// 数据库
let db = require('../config/mysql');

/**
 * 获取用户的分类
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

    const sql = `SELECT * FROM category WHERE user_id = ?`;

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
            msg: "获取分类列表失败！",
            status: false,
            code: 201,
            data: error
        });
    }
})

/**
 * 删除指定分类
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params

    // 验证ID是否存在
    if (!id) {
        return res.json({
            msg: "分类ID不能为空！",
            status: false,
            code: 201,
            data: null
        });
    };

    // 验证分类id的真实性
    const category_sql = `SELECT * FROM category WHERE id = ?`;

    const [category_data] = await db.query(category_sql, [id]);

    if (!category_data) {
        return res.json({
            msg: "该id未找到分类！",
            status: false,
            code: 201,
            data: null
        });
    };

    const DELEDE_LIST = `delete from category where id = ?`;

    const res = await query(DELEDE_LIST, [id])

    res.json({
        msg: "ok！",
        status: false,
        code: 200,
        data: null
    });
})


/**
 * 添加分类接口
 */
router.post('/', async (req, res) => {
    let { cat_name, user_id } = req.body;

    // 分类名称验证机制
    if (!cat_name) {
        return res.json({
            msg: "分类名称不能为空！",
            status: false,
            code: 201,
            data: null
        });
    };

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

    // 验证分类是否存在
    let cat_sql = `SELECT * FROM category WHERE cat_name = ?`

    const [data] = await db.query(cat_sql, [cat_name])

    if (data) {
        return res.json({
            msg: "分类已存在！",
            status: false,
            code: 201,
            data: null
        });
    }

    const sql = `INSERT INTO category SET cat_name = ?`;

    const cat_data = await db.query(sql, [cat_name])

    if (cat_data.insertId) {
        return res.json({
            msg: "创建分类成功！",
            status: true,
            code: 200,
            data: null
        });
    }

    res.json({
        msg: "创建分类失败!",
        status: false,
        code: 201,
        data: null
    });

});

module.exports = router;