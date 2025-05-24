const express = require("express");
const { sendUserEmail } = require("../controllers/userController");

const router = express.Router();

router.post("/send-mail", async (req, res) => {
  try {
    await sendUserEmail(req, res);
  } catch (error) {
    console.error("Error sending mail: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
