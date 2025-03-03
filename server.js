const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

require('dotenv').config();
const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

const app = express();
const port = 5000;

// route for the root URL
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Replace with your Telegram bot token
// const botToken = '7717317938:AAFLEFgWk1qwWU51PJjKhzfb93o3ChJfcjc';
// const chatId = '7802949854';

const bot = new TelegramBot(botToken, { polling: false });

// Endpoint to handle form submissions
app.post('/send-message', (req, res) => {
  const { firstName, lastName, phoneNumber, service, address, desiredTime } = req.body;

  // Prepare the message
  const message = `
    Új üzenet érkezett:
    Név: ${firstName} ${lastName}
    Telefonszám: ${phoneNumber}
    Szolgáltatás: ${service}
    Cím: ${address}
    Kívánt időpont: ${desiredTime}
  `;

  // Send the message to Telegram
  bot.sendMessage(chatId, message)
    .then(() => {
      res.status(200).json({ success: true, message: 'Message sent successfully!' });
    })
    .catch((error) => {
      console.error('Error sending message to Telegram:', error);
      res.status(500).json({ success: false, message: 'Failed to send message.' });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});