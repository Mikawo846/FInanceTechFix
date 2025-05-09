// --- ДАННЫЕ ---
const sidebarTabs = [
  'Главная', 'Инвестиции', 'Кредиты', 'Банки', 'Новости', 'Грамотность', 'Валюты', 'Криптовалюты'
];
const mobileTabs = ['Главная', 'Инвестиции', 'Кредиты', 'Новости', 'Криптовалюты'];
const cards = [
  {
    title: 'Изменения в налоговом законодательстве с 2024 года',
    desc: 'Какие новые налоговые правила вступят в силу и как они повлияют на ваши финансы.',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
  },
  {
    title: 'Как составить личный бюджет',
    desc: 'Пошаговая инструкция по созданию бюджета для достижения финансовых целей.',
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80'
  },
  {
    title: 'Стоит ли инвестировать в криптовалюту в 2025?',
    desc: 'Аналитика, риски и перспективы рынка криптовалют для начинающих и опытных инвесторов.',
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80'
  },
  {
    title: 'Как выбрать выгодный вклад в банке',
    desc: 'Сравниваем предложения банков и рассказываем, на что обратить внимание при выборе вклада.',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80'
  },
  {
    title: 'Финансовая грамотность для всей семьи',
    desc: 'Советы по обучению детей и подростков основам обращения с деньгами.',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'
  },
  {
    title: 'Как рассчитать переплату по кредиту',
    desc: 'Формулы, примеры и калькуляторы для расчета полной стоимости кредита.',
    img: 'https://images.unsplash.com/photo-1460899960812-f6ee1ecaf117?auto=format&fit=crop&w=400&q=80'
  },
  {
    title: 'Обзор лучших банковских карт 2025',
    desc: 'Рейтинг карт с кэшбэком, милями и бесплатным обслуживанием.',
    img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80'
  },
  {
    title: 'Топ-5 ошибок при инвестировании',
    desc: 'Избегайте распространённых ошибок и инвестируйте с умом.',
    img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a0b16?auto=format&fit=crop&w=400&q=80'
  },
  {
    title: 'Как защитить свои финансы от мошенников',
    desc: 'Практические советы по кибербезопасности и защите банковских счетов.',
    img: 'https://images.unsplash.com/photo-1515168833906-d2a3b82b302c?auto=format&fit=crop&w=400&q=80'
  },
  {
    title: 'Пенсионные накопления: как начать?',
    desc: 'Пошаговое руководство по формированию пенсии и выбору инструментов.',
    img: 'https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&w=400&q=80'
  },
  {
    title: 'Инвестиции в недвижимость: плюсы и минусы',
    desc: 'Что учитывать при покупке квартиры или коммерческой недвижимости.',
    img: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80'
  },
  {
    title: 'Как снизить налоги законно',
    desc: 'Законные методы налоговой оптимизации для физических лиц и ИП.',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'
  }
];

// --- СОСТОЯНИЕ ---
let activeTab = 'Главная';
let searchQuery = '';
let fiatRates = { USD: '75.2', EUR: '83.1' };
let cryptoRates = { BTC: '$67,000', ETH: '$3,500' };
let stockIndices = { SPX: '5,200.12', NASDAQ: '16,000.34' };
let currentView = 0; // 0 - fiat, 1 - crypto, 2 - stocks
let errorMsg = '';

// --- ЭЛЕМЕНТЫ ---
const sidebarList = document.getElementById('sidebarList');
const mobileMenuList = document.getElementById('mobileMenuList');
const cardsContainer = document.getElementById('cards');
const errorDiv = document.getElementById('error');
const searchInput = document.getElementById('search');
const ratesBar = document.getElementById('ratesBar');
const fiatView = document.getElementById('fiatView');
const cryptoView = document.getElementById('cryptoView');
const stocksView = document.getElementById('stocksView');
const footerLinks = document.getElementById('footerLinks');

// --- РЕНДЕР МЕНЮ ---
function renderMenus() {
  sidebarList.innerHTML = '';
  sidebarTabs.forEach(tab => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = tab;
    btn.className = tab === activeTab ? 'active' : '';
    btn.onclick = () => { activeTab = tab; renderMenus(); };
    li.appendChild(btn);
    sidebarList.appendChild(li);
  });

  mobileMenuList.innerHTML = '';
  mobileTabs.forEach(tab => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = tab;
    btn.className = tab === activeTab ? 'active' : '';
    btn.onclick = () => { activeTab = tab; renderMenus(); };
    li.appendChild(btn);
    mobileMenuList.appendChild(li);
  });

  // Футер ссылки
  footerLinks.innerHTML = '';
  sidebarTabs.forEach(tab => {
    const a = document.createElement('a');
    a.textContent = tab;
    a.href = '#';
    footerLinks.appendChild(a);
  });
}
renderMenus();

// --- ПОИСК ---
searchInput.addEventListener('input', e => {
  searchQuery = e.target.value.toLowerCase();
  renderCards();
});

// --- КАРТОЧКИ ---
function renderCards() {
  let filtered = cards;
  if (searchQuery) {
    filtered = cards.filter(card =>
      card.title.toLowerCase().includes(searchQuery) ||
      card.desc.toLowerCase().includes(searchQuery)
    );
  }
  cardsContainer.innerHTML = '';
  filtered.forEach(card => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${card.img}" alt="${card.title}" class="card-img">
      <div class="card-body">
        <div class="card-title">${card.title}</div>
        <div class="card-desc">${card.desc}</div>
      </div>
      <a href="#" class="card-link" style="position:absolute;inset:0;z-index:2"></a>
    `;
    cardsContainer.appendChild(div);
  });
}
renderCards();

// --- КУРСЫ ---
async function fetchFiatRates() {
  try {
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/RUB');
    const data = await res.json();
    const rates = data.rates;
    fiatRates = {
      USD: (1 / rates.USD).toFixed(2),
      EUR: (1 / rates.EUR).toFixed(2)
    };
    errorMsg = '';
  } catch {
    errorMsg = 'Курс фиата временно недоступен.';
  }
  renderRates();
  renderError();
}
async function fetchCryptoRates() {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum&vs_currencies=usd');
    const data = await res.json();
    cryptoRates = {
      BTC: `$${data.bitcoin.usd.toLocaleString()}`,
      ETH: `$${data.ethereum.usd.toLocaleString()}`
    };
    errorMsg = '';
  } catch {
    errorMsg = 'Курс криптовалют временно недоступен.';
  }
  renderRates();
  renderError();
}
function renderRates() {
  fiatView.textContent = `USD - ${fiatRates.USD} ₽, EUR - ${fiatRates.EUR} ₽`;
  cryptoView.textContent = `BTC - ${cryptoRates.BTC}, ETH - ${cryptoRates.ETH}`;
  stocksView.textContent = `S&P 500 - ${stockIndices.SPX}, NASDAQ - ${stockIndices.NASDAQ}`;
  fiatView.className = 'rates-view' + (currentView === 0 ? ' active' : '');
  cryptoView.className = 'rates-view' + (currentView === 1 ? ' active' : '');
  stocksView.className = 'rates-view' + (currentView === 2 ? ' active' : '');
}
function renderError() {
  if (errorMsg) {
    errorDiv.textContent = '⚠️ ' + errorMsg;
    errorDiv.style.display = '';
  } else {
    errorDiv.style.display = 'none';
  }
}
renderRates();
renderError();
fetchFiatRates();
fetchCryptoRates();

// --- СМЕНА КУРСОВ ---
setInterval(() => {
  currentView = (currentView + 1) % 3;
  renderRates();
}, 5000);
