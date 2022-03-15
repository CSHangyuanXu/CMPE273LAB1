const favorite =
    `create table if not exists favorite(
        id int NOT NULL AUTO_INCREMENT,
        goods_id VARCHAR(255) DEFAULT NULL COMMENT '收藏商品id',
        user_id int DEFAULT NULL COMMENT '归属用户id', 
        PRIMARY KEY(id)
    )`

module.exports = favorite