var travel = async (req, res) => {
    var baseUrl = `${req.protocol}://${req.get('host')}`;
    var tripsEndpoint = `${baseUrl}/api/trips`;
    var options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    };

    try {
        var apiResponse = await fetch(tripsEndpoint, options);

        if (!apiResponse.ok) {
            throw new Error(`API request failed with status ${apiResponse.status}`);
        }

        var json = await apiResponse.json();

        if (!Array.isArray(json)) {
            throw new Error('API response was not an array of trips');
        }

        if (json.length === 0) {
            return res.status(404).render('error', {
                message: 'No trips found in database',
                error: { status: 404 },
            });
        }

        res.render('travel', {
            title: 'Travlr Getaways',
            trips: json,
        });
    } catch (error) {
        console.error('Error retrieving trips from API:', error.message);
        return res.status(500).send(error.message);
    }
};

module.exports = {
    travel
};
