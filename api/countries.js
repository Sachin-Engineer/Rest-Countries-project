const axios = require('axios');
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const response = await axios.get('https://www.apicountries.com/countries');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
};
