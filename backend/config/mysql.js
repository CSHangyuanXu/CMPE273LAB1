var mysql = require('mysql');

var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'etsydb',
	multipleStatements: true,
});


let query = (sql, arr = []) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) throw err;
            console.log('get connection');
			connection.query(sql, arr, (error, results, fields) => {
				connection.release();
				if (error) throw error;
				resolve(results);
			});
		});
	});
};

module.exports = {
	pool,
	query
}
