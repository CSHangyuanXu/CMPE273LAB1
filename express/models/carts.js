const carts =
    `create table if not exists carts(
        id int NOT NULL AUTO_INCREMENT,
        goods_id varchar(255) DEFAULT NULL COMMENT '商品ID',
        amount int(11) DEFAULT NULL COMMENT '商品数量',
        user_id int(4) DEFAULT NULL COMMENT '归属用户id', 
        PRIMARY KEY(id)
    )`

module.exports = carts