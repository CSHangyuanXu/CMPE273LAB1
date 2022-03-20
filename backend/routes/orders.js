var express = require('express');
var router = express.Router();
const dayjs = require('dayjs')
let db = require('../config/mysql');

function random_No(randomLen) {
    var random_no = "";
    for (var i = 0; i < randomLen; i++) {
        random_no += Math.floor(Math.random() * 10);
    }
    random_no = new Date().getTime() + random_no;
    return random_no;
}

/**
 * get order
 */
router.get('/', async (req, res) => {
    const { user_id } = req.query;

    let sql = `SELECT * FROM orders  WHERE user_id = ?`

    let data = await db.query(sql, [user_id]);

    data = data.map(item => ({
        ...item,
        goods: JSON.parse(item.goods),
    }))

    let order_list = []

    data.forEach(item => {
        const goods = item.goods;

        goods.forEach(goodsItem => {
            order_list.push({
                ...goodsItem,
                price: Number(goodsItem.amount) * Number(goodsItem.price),
                create_time: item.create_time
            })
        });
    });

    res.json({
        msg: "ok！",
        status: true,
        code: 200,
        data: order_list
    });

})

/**
 * created
 */
router.post('/', async (req, res) => {
    const {
        price = 0,
        goods = "",
        user_id = 0,
        type = ''
    } = req.body;

    const queryList = {
        number: random_No(3),
        price,
        create_time: dayjs().format('YYYY-MM-DD'),
        goods,
        user_id,
    }

    // check stock 
    const goods_list = JSON.parse(goods);

    for (let index = 0; index < goods_list.length; index++) {
        const item = goods_list[index];

        const GET_TABLE_LIST = `SELECT * FROM goods WHERE id = ?`

        let [goods_res] = await db.query(GET_TABLE_LIST, [item.goods_id ? item.goods_id : item.id])

        if (Number(goods_res.stock) < Number(item.amount)) {
            return res.json({
                msg: `item【${item.name}】out of stock！`,
                status: false,
                code: 201,
                data: null
            });
        }

    }

    for (let index = 0; index < goods_list.length; index++) {
        const item = goods_list[index];
        const GET_TABLE_LIST = `SELECT * FROM goods WHERE id = ?`

        let [goods_res] = await db.query(GET_TABLE_LIST, [item.goods_id ? item.goods_id : item.id])

        const stock = Number(goods_res.stock) - Number(item.amount);

        let sql = `UPDATE goods SET stock = ?,volume = ?  WHERE id = ?`

        const stockRes = await db.query(sql, [stock, Number(item.amount), item.goods_id ? item.goods_id : item.id])

        if (!stockRes) {
            return res.json({
                msg: `【${item.name}】failed`,
                status: false,
                code: 201,
                data: null
            });
        }

    }


    if (type === 'cart') {
        for (let index = 0; index < goods_list.length; index++) {
            const item = goods_list[index];

            const sql = `delete from carts where id = ${item.id}`;

            const res = await db.query(sql, [])

        }

    }


    const SET_TABLE = "INSERT INTO orders SET ?";

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
            msg: "created failed!",
            status: false,
            code: 201,
            data: null
        });
    }

})

module.exports = router;