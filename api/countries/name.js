const axios = require('axios');
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { name } = req.query;
  try {
    const response = await axios.get(`https://www.apicountries.com/countries/name/${encodeURIComponent(name)}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch country by name' });
  }
};
