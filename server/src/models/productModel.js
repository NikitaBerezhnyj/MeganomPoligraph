// const mongoose = require("mongoose");
// const Joi = require("joi");

// const categories = [
//   "folder", // Теки
//   "present", // Подарункові
//   "order-lam", // Пакети паперові ламіновані
//   "order-craft", // Крафт пакети
//   "order-cardboard", // Пакети картонні
//   "order-tys", // Пакети з тисненням і конгревом
//   "order-design", // Пакети з дизайнерського паперу
//   "order-uf" // Пакети з вибірковим УФ лаком
// ];

// const productSchema = new mongoose.Schema({
//   description: {
//     ua: { type: String, required: true, trim: true },
//     ru: { type: String, required: true, trim: true },
//     en: { type: String, required: true, trim: true }
//   },
//   category: {
//     type: [{ type: String, enum: categories }],
//     required: true
//   },
//   imageUrl: {
//     type: String,
//     default: "http:/localhost:3001/uploads/standard_product.jpg"
//   },
//   createdAt: { type: Date, default: Date.now }
// });

// const Product = mongoose.model("Product", productSchema);

// const validateProduct = data => {
//   const schema = Joi.object({
//     description: Joi.object({
//       ua: Joi.string().required().label("Description (UA)"),
//       ru: Joi.string().required().label("Description (RU)"),
//       en: Joi.string().required().label("Description (EN)")
//     }).required(),
//     category: Joi.array()
//       .items(Joi.string().valid(...categories))
//       .required()
//       .label("Category"),
//     imageUrl: Joi.string().optional().label("Image URL")
//   });
//   return schema.validate(data);
// };

// module.exports = { Product, validateProduct };

const mongoose = require("mongoose");
const Joi = require("joi");

const categories = [
  "folder", // Теки
  "present", // Подарункові
  "order-lam", // Пакети паперові ламіновані
  "order-craft", // Крафт пакети
  "order-cardboard", // Пакети картонні
  "order-tys", // Пакети з тисненням і конгревом
  "order-design", // Пакети з дизайнерського паперу
  "order-uf" // Пакети з вибірковим УФ лаком
];

const productSchema = new mongoose.Schema({
  description: {
    ua: { type: String, required: true, trim: true },
    ru: { type: String, required: true, trim: true },
    en: { type: String, required: true, trim: true }
  },
  category: {
    type: [{ type: String, enum: categories }],
    required: true
  },
  imageUrl: {
    type: String,
    default: "http:/localhost:3001/uploads/standard_product.jpg"
  },
  createdAt: { type: Date, default: Date.now },
  isLocked: { type: Boolean, default: false }
});

const Product = mongoose.model("Product", productSchema);

const validateProduct = data => {
  const schema = Joi.object({
    description: Joi.object({
      ua: Joi.string().required().label("Description (UA)"),
      ru: Joi.string().required().label("Description (RU)"),
      en: Joi.string().required().label("Description (EN)")
    }).required(),
    category: Joi.array()
      .items(Joi.string().valid(...categories))
      .required()
      .label("Category"),
    imageUrl: Joi.string().optional().label("Image URL"),
    isLocked: Joi.boolean().optional()
  });
  return schema.validate(data);
};

module.exports = { Product, validateProduct };
