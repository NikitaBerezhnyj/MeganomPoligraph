const express = require("express");
const { translatingText } = require("../controllers/translateController");

const router = express.Router();

router.post("/translate", async (req, res) => {
  try {
    await translatingText(req, res);
  } catch (error) {
    console.error("Error processing translate request: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
