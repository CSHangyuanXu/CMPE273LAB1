const carts =
    `create table if not exists carts(
        id int NOT NULL AUTO_INCREMENT,
        goods_id varchar(255) DEFAULT NULL COMMENT 'itemID',
        amount int(11) DEFAULT NULL COMMENT 'amoount',
        user_id int(4) DEFAULT NULL COMMENT 'userID', 
        PRIMARY KEY(id)
    )`

module.exports = carts