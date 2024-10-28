require("dotenv").config();
const mongoose = require("mongoose");
const connectionDB = require("../config/dbConfig");
const { Product } = require("../models/productModel");

const addFieldToAllProducts = async (fieldName, fieldValue) => {
  try {
    await connectionDB();

    const products = await Product.find({});

    let successfulCount = 0;
    for (const product of products) {
      product[fieldName] = fieldValue;
      await product.save();
      successfulCount++;
    }

    console.log(`${successfulCount} продукт(и) успішно оновлено`);
  } catch (error) {
    console.error("Помилка при оновленні продуктів:", error.message);
  } finally {
    await mongoose.connection.close();
  }
};

addFieldToAllProducts("checkScript", true);
