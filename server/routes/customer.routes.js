const CustomerController = require('../controllers/customer.controller');

module.exports = function(app){
    app.get('/api/customers', CustomerController.getAllCustomers);
    app.get('/api/customers/:id', CustomerController.getCustomer);
    app.post('/api/customers', CustomerController.createCustomer);
    app.put('/api/customers/:id', CustomerController.updateCustomer);
    app.delete('/api/customers/:id', CustomerController.deleteCustomer);
}