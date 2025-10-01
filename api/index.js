const app = require('./server');
module.exports = (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	app(req, res);
};
