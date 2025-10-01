const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/countries', async (req, res) => {
  try {
    const response = await axios.get('https://www.apicountries.com/countries');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
});

app.get('/api/countries/name/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const response = await axios.get(`https://www.apicountries.com/countries/name/${encodeURIComponent(name)}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch country by name' });
  }
});

app.get('/api/countries/region/:region', async (req, res) => {
  try {
    const { region } = req.params;
    const response = await axios.get(`https://www.apicountries.com/countries/region/${encodeURIComponent(region)}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch countries by region' });
  }
});

app.get('/api/alpha/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const response = await axios.get(`https://www.apicountries.com/alpha/${encodeURIComponent(code)}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch country by alpha code' });
  }
});

module.exports = app;
