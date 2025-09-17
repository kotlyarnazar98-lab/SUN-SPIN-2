let userStars = 5000;
let userInventory = [];

const GIFTS = [
  { name: "Desc Calendar", img: "assets/gifts/desc_calendar.png", value: 300 },
  { name: "Easter Egg", img: "assets/gifts/easter_egg.png", value: 500 },
  { name: "Snoop Dogg", img: "assets/gifts/snoop_dogg.png", value: 400 },
  { name: "Swag Bag", img: "assets/gifts/swag_bag.png", value: 500 }
  // ...добавьте все подарки сюда
];

function startGame() {
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('gameScreen').style.display = 'block';
}

function createStar() {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.left = Math.random() * window.innerWidth + 'px';
  star.style.width = (2 + Math.random()*3) + 'px';
  star.style.height = star.style.width;
  star.style.animationDuration = (3 + Math.random()*3) + 's';
  document.body.appendChild(star);
  setTimeout(()=>star.remove(), 6000);
}
setInterval(createStar, 300);

function updateStarsDisplay(){
  // добавьте отображение баланса на экране
  document.getElementById('result').innerText = `⭐ Баланс: ${userStars}`;
}

function spinRoulette(cost){
  if(userStars < cost){ alert("❌ Недостаточно звезд!"); return; }
  userStars -= cost;
  updateStarsDisplay();

  let premiumChance = 0;
  if(cost===100) premiumChance=0.02;
  else if(cost===1500) premiumChance=0.18;
  else if(cost===10000) premiumChance=0.28;

  let roll=Math.random();
  let winGift;
  if(roll < premiumChance){
    let premiumGifts = GIFTS.filter(g => g.value >= 5000);
    winGift = premiumGifts[Math.floor(Math.random() * premiumGifts.length)];
  } else {
    let normalGifts = GIFTS.filter(g => g.value < 5000);
    winGift = normalGifts[Math.floor(Math.random() * normalGifts.length)];
  }

  // Добавляем в инвентарь
  userInventory.push(winGift);
  displayInventory();
  alert(`🎉 Вы выиграли: ${winGift.name}`);
}

function displayInventory(){
  const container = document.getElementById('inventory');
  container.innerHTML = '';
  userInventory.forEach((item,index)=>{
    const div = document.createElement('div');
    div.className = 'inventory-item';
    div.innerHTML = `<img src="${item.img}" /><div class="inventory-actions">
      <button onclick="sellGift(${index})">Продать</button>
      <button onclick="withdrawGift(${index})">Вывести</button>
    </div>`;
    container.appendChild(div);
  });
}

function sellGift(index){
  userStars += userInventory[index].value;
  userInventory.splice(index,1);
  updateStarsDisplay();
  displayInventory();
}

function withdrawGift(index){
  alert(`💌 Напишите @SpiderGiftRelayer любое сообщение для вывода ${userInventory[index].name}`);
}

// Симуляция пополнения через подарок
function simulateGift(){
  const sender = prompt("Введите ваше имя в Telegram:");
  const giftName = prompt("Введите название подарка:");
  const gift = GIFTS.find(g => g.name === giftName);
  if(!gift){ alert("Такого подарка нет"); return; }
  userStars += gift.value;
  updateStarsDisplay();
  alert(`✅ ${sender} получил ${gift.value}⭐ за подарок ${gift.name}!`);
}
