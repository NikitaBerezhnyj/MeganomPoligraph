const express = require("express");
const {
  adminLogin,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/adminController");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    await adminLogin(req, res);
  } catch (error) {
    console.error("Error admin login: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/product", async (req, res) => {
  try {
    await getProduct(req, res);
  } catch (error) {
    console.error("Error getting products: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/product", async (req, res) => {
  try {
    await addProduct(req, res);
  } catch (error) {
    console.error("Error adding product: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.put("/product/:id", async (req, res) => {
  try {
    await updateProduct(req, res);
  } catch (error) {
    console.error("Error updating product: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.delete("/product/:id", async (req, res) => {
  try {
    await deleteProduct(req, res);
  } catch (error) {
    console.error("Error deleting product: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
