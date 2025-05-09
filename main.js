// Поиск по карточкам
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', function () {
  const query = this.value.trim().toLowerCase();
  const cards = document.querySelectorAll('.cards .card');
  cards.forEach(card => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    const desc = card.querySelector('.card-desc').textContent.toLowerCase();
    if (title.includes(query) || desc.includes(query)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
});

// Категории: активная кнопка
const categories = document.getElementById('categories');
categories.addEventListener('click', (e) => {
  if (e.target.classList.contains('cat')) {
    categories.querySelectorAll('.cat').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    // Здесь можно добавить фильтрацию по категориям, если потребуется
  }
});

// КУРСЫ валют и крипты
let fiatRates = { USD: '75.2', EUR: '83.1' };
let cryptoRates = { BTC: '$67,000', ETH: '$3,500' };
let stockIndices = { SPX: '5,200.12', NASDAQ: '16,000.34' };
let currentView = 0;
let errorMsg = '';

const fiatView = document.getElementById('fiatView');
const cryptoView = document.getElementById('cryptoView');
const stocksView = document.getElementById('stocksView');
const errorDiv = document.getElementById('error');

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

fetchFiatRates();
fetchCryptoRates();

setInterval(() => {
  currentView = (currentView + 1) % 3;
  renderRates();
}, 5000);

// --- Анимация шапки для мобильных ---
(function() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  function isMobile() {
    return window.innerWidth <= 900;
  }

  let lastScrollY = window.scrollY;
  let lastAction = 'show';
  let ticking = false;
  const threshold = 48;

  function onScroll() {
    if (!isMobile()) {
      header.classList.remove('hide', 'show');
      return;
    }
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;

    // Резко вниз - скрыть
    if (delta > threshold && lastAction !== 'hide') {
      header.classList.add('hide');
      header.classList.remove('show');
      lastAction = 'hide';
    }
    // Резко вверх - показать
    else if (delta < -threshold && lastAction !== 'show') {
      header.classList.add('show');
      header.classList.remove('hide');
      lastAction = 'show';
    }
    // Медленный скролл - ничего не делать
    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  });

  window.addEventListener('resize', () => {
    if (!isMobile()) {
      header.classList.remove('hide', 'show');
    }
  });
})();
