const category =
    `create table if not exists category(
        id int NOT NULL AUTO_INCREMENT,
        cat_name varchar(255) DEFAULT NULL COMMENT '分类名称',
        user_id int DEFAULT NULL COMMENT '归属用户id', 
        PRIMARY KEY(id)
    )`

module.exports = category