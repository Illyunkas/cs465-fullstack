const axios = require('axios');

const apiOptions = {
  server: 'http://localhost:3000'
};

const renderTravelPage = (req, res, responseBody) => {
  res.render('travel', {
    title: 'Travlr Getaways',
    trips: responseBody
  });
};

const travel = async (req, res) => {
  const path = '/api/trips';
  const requestOptions = {
    method: 'GET',
    url: `${apiOptions.server}${path}`,
    headers: {
      'Accept': 'application/json'
    }
  };

  try {
    const response = await axios(requestOptions);
    renderTravelPage(req, res, response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  travel
};