module.exports = (app) => {
    const records = require('../controllers/record.controller.js');
    
    app.post('/records', records.findAll);

}