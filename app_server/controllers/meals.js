/* GET meals view */
const meals = (req, res) => {
    res.render('meals', { title: 'Travlr Meals' });
};

module.exports = {
    meals
};