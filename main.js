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

// --- Shorts (шортсы, рилзы, reels) ---
// Прокрутка стрелками на десктопе
const shortsRow = document.getElementById('shortsRow');
const leftArrow = document.querySelector('.shorts-arrow.left');
const rightArrow = document.querySelector('.shorts-arrow.right');

function updateShortsArrows() {
  if (!shortsRow) return;
  leftArrow.disabled = shortsRow.scrollLeft <= 10;
  rightArrow.disabled = shortsRow.scrollLeft + shortsRow.clientWidth >= shortsRow.scrollWidth - 10;
}

if (shortsRow && leftArrow && rightArrow) {
  leftArrow.addEventListener('click', () => {
    shortsRow.scrollBy({ left: -shortsRow.clientWidth * 0.7, behavior: 'smooth' });
  });
  rightArrow.addEventListener('click', () => {
    shortsRow.scrollBy({ left: shortsRow.clientWidth * 0.7, behavior: 'smooth' });
  });
  shortsRow.addEventListener('scroll', updateShortsArrows);
  window.addEventListener('resize', updateShortsArrows);
  updateShortsArrows();
}

// Открытие модального окна с вертикальным свайпом
const shortsModal = document.getElementById('shortsModal');
const shortsModalContent = document.getElementById('shortsModalContent');
const shortsModalClose = document.getElementById('shortsModalClose');

const shortsData = Array.from(document.querySelectorAll('.shorts-card')).map(card => ({
  img: card.querySelector('img').src,
  caption: card.querySelector('.shorts-caption').textContent
}));

shortsRow.addEventListener('click', function(e) {
  const card = e.target.closest('.shorts-card');
  if (!card) return;
  const index = parseInt(card.dataset.index, 10);
  openShortsModal(index);
});

shortsModalClose.addEventListener('click', closeShortsModal);

function openShortsModal(startIndex) {
  shortsModalContent.innerHTML = shortsData.map((item, idx) => `
    <div class="shorts-modal-slide" id="shortsSlide${idx}">
      <img src="${item.img}" alt="">
      <div class="shorts-caption">${item.caption}</div>
    </div>
  `).join('');
  shortsModal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Скроллим к нужному слайду
  setTimeout(() => {
    const slide = document.getElementById(`shortsSlide${startIndex}`);
    if (slide) slide.scrollIntoView({behavior: "instant"});
  }, 100);
}

function closeShortsModal() {
  shortsModal.classList.remove('active');
  document.body.style.overflow = '';
}

// ESC закрывает модалку
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeShortsModal();
});

// Scroll-snap: перелистывание строго по одному свайпу
let lastTouchY = null;
shortsModalContent?.addEventListener('touchstart', function(e) {
  if (e.touches.length === 1) lastTouchY = e.touches[0].clientY;
});
shortsModalContent?.addEventListener('touchend', function(e) {
  if (lastTouchY === null) return;
  const slides = Array.from(shortsModalContent.querySelectorAll('.shorts-modal-slide'));
  const current = slides.findIndex(slide => {
    const rect = slide.getBoundingClientRect();
    return rect.top >= 0 && rect.top < window.innerHeight / 2;
  });
  if (e.changedTouches.length === 1) {
    const deltaY = e.changedTouches[0].clientY - lastTouchY;
    if (deltaY < -40 && current < slides.length - 1) {
      slides[current + 1].scrollIntoView({behavior: "smooth"});
    } else if (deltaY > 40 && current > 0) {
      slides[current - 1].scrollIntoView({behavior: "smooth"});
    }
  }
  lastTouchY = null;
});

