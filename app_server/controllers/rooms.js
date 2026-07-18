/* GET rooms view */
const rooms = (req, res) => {
    res.render('rooms', { title: 'Travlr Rooms' });
};

module.exports = {
    rooms
};
