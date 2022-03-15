const {query} = require("../config/mysql");
const user = require('./user')

const models = [
    user,
]

// 注册表
models.forEach(item => {
    query(item, [])
})