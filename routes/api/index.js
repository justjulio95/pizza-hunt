const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes');

// add prefix od '/pizzas' to routes created in pizza-routes.js
router.use('/pizzas', pizzaRoutes);

module.exports = router;