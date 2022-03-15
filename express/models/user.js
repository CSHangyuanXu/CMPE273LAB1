const user =
    `create table if not exists user(
        id int NOT NULL AUTO_INCREMENT,
        avatar VARCHAR(255) DEFAULT NULL COMMENT '头像',
        username VARCHAR(22) DEFAULT NULL COMMENT '姓名',
        email VARCHAR(255) DEFAULT NULL COMMENT '电子邮箱',
        password VARCHAR(255) DEFAULT NULL COMMENT '密码',
        birth_date date DEFAULT NULL COMMENT '出生日期',
        city VARCHAR(255) DEFAULT NULL COMMENT '城市',
        address VARCHAR(255) DEFAULT NULL COMMENT '地址',
        country VARCHAR(255) DEFAULT NULL COMMENT '国家',
        PRIMARY KEY(id)
    )`

module.exports = user