const store =
    `create table if not exists store(
        id int NOT NULL AUTO_INCREMENT,
        store_name VARCHAR(255) DEFAULT NULL COMMENT 'name',
        store_cover VARCHAR(22) DEFAULT NULL COMMENT 'picture',
        revenue int(11) DEFAULT NULL COMMENT 'income', 
        user_id int DEFAULT NULL COMMENT 'ownerID', 
        PRIMARY KEY(id)
    )`

module.exports = store