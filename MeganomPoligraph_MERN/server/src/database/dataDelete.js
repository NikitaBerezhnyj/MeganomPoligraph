require("dotenv").config();
const mongoose = require("mongoose");
const connectionDB = require("../config/dbConfig");
const { Product } = require("../models/productModel");

const deleteAllProducts = async () => {
  try {
    await connectionDB();

    const result = await Product.deleteMany({});

    console.log(`${result.deletedCount} продукт(и) успішно видалено.`);
  } catch (error) {
    console.error("Помилка при видаленні продуктів:", error.message);
  } finally {
    await mongoose.connection.close();
  }
};

deleteAllProducts();
