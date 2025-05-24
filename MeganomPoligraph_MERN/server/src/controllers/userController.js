const transporter = require("../config/mailConfig");

exports.sendUserEmail = async (req, res) => {
  try {
    const { name, phone, mail, message } = req.body;

    const mailOptions = {
      from: process.env.EMAIL,
      to: "kitnikita06@gmail.com",
      subject: "Замовлення з сайту",
      text: `Ім'я: ${name}\nТелефон: ${phone}\nEmail: ${mail}\nПовідомлення: ${message}`,
      html: `
          <div style="width:50%; height:100%; padding:2.5%; background-color:#FFFFFF; margin: auto; border: 1px solid #999999;">
            <div style="padding:2.5%; color:#333333; background-color:#F5F5F5; font-size:1.25rem; border: 1px solid #999999;">
                <h1 style="text-align:center; color:#2498EE;">Замовлення з сайту!</h1>
                <p><strong>Ім'я:</strong> ${name}</p>
                <hr style="border-color: #999999;">
                <p><strong>Телефон:</strong> ${phone}</p>
                <hr style="border-color: #999999;">
                <p><strong>E-Mail:</strong> ${mail}</p>
                <hr style="border-color: #999999;">
                <p><strong>Повідомлення:</strong> ${message}</p>
            </div>
          </div>
        `
    };
    await transporter.sendMail(mailOptions);
    res.status(201).send({ message: "Mail sended successfully" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
