require("dotenv").config();
const jwt = require("jsonwebtoken");

const { Product, validateProduct } = require("../models/productModel");

exports.adminLogin = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (
      login !== process.env.ADMIN_LOGIN &&
      password !== process.env.ADMIN_PASSWORD
    )
      return res.status(401).send({ message: "Invalid Email or Password" });

    const token = jwt.sign({ login }, process.env.JWT_PRIVATE_TOKEN, {
      expiresIn: "7d"
    });
    res.status(200).send({
      data: token,
      message: "Logged in successfully"
    });
  } catch {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(404).send({ message: "No products found" });
    }
    res
      .status(200)
      .send({ message: "Products sended successfully", data: products });
  } catch (err) {
    console.error("Error during user registration:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { error } = validateProduct(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const newProduct = new Product({
      description: {
        ua: req.body.description.ua,
        ru: req.body.description.ru,
        en: req.body.description.en
      },
      category: req.body.category,
      imageUrl: req.body.imageUrl || "/uploads/standard_product.jpg"
    });

    await newProduct.save();

    res.status(201).send({
      message: "Product added successfully",
      data: newProduct
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = validateProduct(req.body);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        description: {
          ua: req.body.description.ua,
          ru: req.body.description.ru,
          en: req.body.description.en
        },
        category: req.body.category,
        imageUrl: req.body.imageUrl || "/uploads/standard_product.jpg"
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send({
      message: "Product updated successfully",
      data: updatedProduct
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product: ", error);
    res.status(500).json({ message: "Error deleting product" });
  }
};
