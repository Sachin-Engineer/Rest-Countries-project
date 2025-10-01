const axios = require('axios');
module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ message: "Hello from countries.js" });
};
