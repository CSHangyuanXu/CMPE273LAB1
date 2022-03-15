const store =
    `create table if not exists store(
        id int NOT NULL AUTO_INCREMENT,
        store_name VARCHAR(255) DEFAULT NULL COMMENT '商店名称',
        store_cover VARCHAR(22) DEFAULT NULL COMMENT '商店图片',
        user_id int DEFAULT NULL COMMENT '店主id', 
        PRIMARY KEY(id)
    )`

module.exports = store