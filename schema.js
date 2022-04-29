const Joi = require("Joi");
console.log("Hi from joi");
module.exports.productSchema = Joi.object({
  name: Joi.string().trim().required(),
  img: Joi.string().min(24).required(),
  price: Joi.number().min(0).required(),
  desc: Joi.string().required(),
});

module.exports.reviewSchema = Joi.object({
  rating: Joi.number().min(0).max(5),
  comment: Joi.string().trim().required(),
});
