const { Schema, model, get } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const PizzaSchema = new Schema(
  {
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
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    // pizza suggested size
    size: {
      type: String,
      default: 'Large'
    },
    // pizza toppings
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.length;
})

// create the pizza model with the PizzaSchema
const Pizza = model('Pizza', PizzaSchema)

// export the pizza model
module.exports = Pizza;