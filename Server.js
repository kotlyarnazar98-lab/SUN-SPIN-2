const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const TELEGRAM_BOT_TOKEN = '7985830491:AAETUsk-l-ktl9tsuI_KOASMx8M-XVKXEwk';
const SPIDER_RELAYER = '@SpiderGiftRelayer';
let userBalances = {}; // username → stars

app.post('/webhook', async (req, res) => {
  const { message } = req.body;
  const username = message.from.username;
  const giftName = message.text; // название подарка

  const gift = GIFTS.find(g => g.name === giftName);
  if (!gift) return res.sendStatus(400);

  userBalances[username] = (userBalances[username] || 0) + gift.value;

  await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    chat_id: message.from.id,
    text: `✅ Вы получили ${gift.value} ⭐ за подарок ${gift.name}!`
  });

  res.sendStatus(200);
});

app.get('/api/getBalance', (req,res)=>{
  const user = req.query.user;
  res.json({stars: userBalances[user] || 0});
});

app.listen(3000, ()=>console.log('Server running on port 3000'));
