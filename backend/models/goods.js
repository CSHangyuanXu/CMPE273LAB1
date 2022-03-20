const goods =
    `create table if not exists goods(
        id int NOT NULL AUTO_INCREMENT,
        cover varchar(255) DEFAULT NULL COMMENT 'picture',
        name varchar(255) DEFAULT NULL COMMENT 'name',
        cate_name varchar(255) DEFAULT NULL COMMENT 'category',
        goods_dec VARCHAR(255) DEFAULT NULL COMMENT 'detail',
        price int DEFAULT NULL COMMENT 'price',
        stock int DEFAULT NULL COMMENT 'stock',
        volume int DEFAULT NULL COMMENT 'selled',
        store_id int DEFAULT NULL COMMENT 'ownerID',
        PRIMARY KEY(id)
    )`

module.exports = goods