const category =
    `create table if not exists category(
        id int NOT NULL AUTO_INCREMENT,
        cat_name varchar(255) DEFAULT NULL COMMENT 'catogory',
        user_id int DEFAULT NULL COMMENT 'userID', 
        PRIMARY KEY(id)
    )`

module.exports = category