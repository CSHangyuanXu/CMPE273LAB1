const { query } = require("../config/mysql");
const user = require('./user')
const store = require('./store')
const category = require('./category')
const goods = require('./goods')
const collection = require('./collection')
const carts = require('./carts')
const orders = require('./orders')

const models = [
    user,
    store,
    category,
    goods,
    collection,
    carts,
    orders,
]

// register
models.forEach(item => {
    query(item, [])
})