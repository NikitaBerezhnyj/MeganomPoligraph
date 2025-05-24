const fs = require("fs");
const { validateMIMEType } = require("validate-image-type");

const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded" });
  }

  try {
    const validationResult = await validateMIMEType(req.file.path, {
      originalFilename: req.file.originalname,
      allowMimeTypes: ["image/jpeg", "image/png"]
    });

    if (!validationResult.ok) {
      fs.unlinkSync(req.file.path);
      return res.status(400).send({ message: "Unsupported file type" });
    }

    return res.status(200).json({
      filePath: `http://${process.env.HOSTNAME}:${process.env.PORT}/uploads/${req.file.filename}`
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return res.status(500).send({ message: "Error processing file" });
  }
};

module.exports = uploadImage;
