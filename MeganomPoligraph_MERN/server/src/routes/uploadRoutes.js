const express = require("express");
const uploadImage = require("../controllers/uploadController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    await uploadImage(req, res);
  } catch (error) {
    console.error("Error in /upload route:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
