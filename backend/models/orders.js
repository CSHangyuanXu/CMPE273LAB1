const orders =
    `create table if not exists orders(
        id int NOT NULL AUTO_INCREMENT,
        number varchar(255) DEFAULT NULL COMMENT 'orderID',
        price int(20) DEFAULT NULL COMMENT 'price',
        create_time date DEFAULT NULL COMMENT 'time',
        goods longtext DEFAULT NULL COMMENT 'info', 
        user_id int(4) DEFAULT NULL COMMENT 'userID', 
        PRIMARY KEY(id)
    )`

module.exports = orders