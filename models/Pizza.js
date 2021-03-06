const { Schema, model, get } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const PizzaSchema = new Schema(
  {
    // name of pizza
    pizzaName: {
      type: String,
      required: true,
      trim: true
    },
    // name of user that created the pizza
    createdBy: {
      type: String,
      required: true,
      trim: true
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
      required: true,
      enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
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
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0)
})

// create the pizza model with the PizzaSchema
const Pizza = model('Pizza', PizzaSchema)

// export the pizza model
module.exports = Pizza;