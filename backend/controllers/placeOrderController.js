import nodemailer from 'nodemailer';

const placeOrder = async (req, res) => {
  try {
    const { name, email, phone, address, item, title, price } = req.body;

    const htmlMessage = `
      <h2>Новый заказ</h2>
      <p><strong>Имя:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Телефон:</strong> ${phone || 'не указан'}</p>
      <p><strong>Адрес:</strong> ${address}</p>
      <hr />
      <p><strong>Товар:</strong> ${title} (${item})</p>
      <p><strong>Цена:</strong> ${price}₸</p>
    `;

    const transporter = nodemailer.createTransport({
      service: 'gmail', // или mailgun/sendgrid/etc
      auth: {
        user: 'your@email.com',
        pass: 'your_app_password', // НЕ обычный пароль, нужен app password
      },
    });

    await transporter.sendMail({
      from: '"HurryScurry" <your@email.com>',
      to: 'your@email.com',
      subject: 'Новый заказ',
      html: htmlMessage,
    });

    res.json({ success: true, message: 'Заказ отправлен!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Ошибка при оформлении заказа' });
  }
};

export default placeOrder;