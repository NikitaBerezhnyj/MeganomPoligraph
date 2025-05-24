const googleTranslate = require("@vitalets/google-translate-api");

exports.translatingText = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const ukResponse = await googleTranslate.translate(text, { to: "uk" });
    const ruResponse = await googleTranslate.translate(text, { to: "ru" });
    const enResponse = await googleTranslate.translate(text, { to: "en" });

    if (!ruResponse || !enResponse) {
      return res.status(500).json({ message: "Error translating text" });
    }

    const data = {
      uk: ukResponse.text,
      ru: ruResponse.text,
      en: enResponse.text
    };
    res
      .status(200)
      .json({ message: "Translating has been successfully", data });
  } catch (error) {
    console.error("Error translating text: ", error);
    res
      .status(500)
      .json({ message: "Error translating text", error: error.message });
  }
};
