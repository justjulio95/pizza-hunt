const { Schema, model } = require('mongoose');

const PizzaSchema = new Schema({
  // name of pizza
  pizzaName: {
    type: String
  },
  // name of user that created the pizza
  createdBy: {
    type: String
  },
  // timestamp of when pizza was created
  createdAt: {
    type: Date,
    default: Date.now
  },
  // pizza suggested size
  size: {
    type: String,
    default: 'Large'
  },
  // pizza toppings
  toppings: []
});

// create the pizza model with the PizzaSchema
const Pizza = model('Pizza', PizzaSchema)

// export the pizza model
module.exports = Pizza;