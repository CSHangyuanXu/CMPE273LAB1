const user =
    `create table if not exists user(
        id int NOT NULL AUTO_INCREMENT,
        avatar VARCHAR(255) DEFAULT NULL COMMENT 'avatar',
        username VARCHAR(22) DEFAULT NULL COMMENT 'username',
        email VARCHAR(255) DEFAULT NULL COMMENT 'email',
        password VARCHAR(255) DEFAULT NULL COMMENT 'password',
        birth_date date DEFAULT NULL COMMENT 'birth_date',
        city VARCHAR(255) DEFAULT NULL COMMENT 'city',
        phone VARCHAR(255) DEFAULT NULL COMMENT 'phone',
        address VARCHAR(255) DEFAULT NULL COMMENT 'address',
        country VARCHAR(255) DEFAULT NULL COMMENT 'country',
        PRIMARY KEY(id)
    )`

module.exports = user