const collection =
    `create table if not exists collection(
        id int NOT NULL AUTO_INCREMENT,
        goods_id VARCHAR(255) DEFAULT NULL COMMENT 'likeID',
        user_id int DEFAULT NULL COMMENT 'userID', 
        PRIMARY KEY(id)
    )`

module.exports = collection