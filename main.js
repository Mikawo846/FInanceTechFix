// --- Категории ---
const categories = [
  'Бюджет',
  'Инвестиции',
  'Кредиты',
  'Безопасность',
  'Пенсия',
  'Недвижимость'
];

const categoryList = document.getElementById('category-list');
const cardsSection = document.getElementById('cards');

// --- Фильтрация карточек ---
let activeCategory = categories[0];

function renderCategories() {
  // Перерисовываем категории (выделяем активную)
  Array.from(categoryList.children).forEach((li, idx) => {
    if (li.textContent === activeCategory) {
      li.classList.add('active');
    } else {
      li.classList.remove('active');
    }
    li.onclick = () => {
      activeCategory = li.textContent;
      renderCategories();
      filterCards();
    };
  });
}

// Показываем только карточки нужной категории
function filterCards() {
  const cards = cardsSection.querySelectorAll('.card');
  cards.forEach(card => {
    // Категория указывается в data-category
    const cardCategory = card.getAttribute('data-category');
    if (cardCategory === activeCategory) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

// --- Боковое меню для мобильных ---
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menu-toggle');

menuToggle.onclick = () => {
  sidebar.classList.toggle('open');
};

document.addEventListener('mousedown', (e) => {
  if (window.innerWidth < 768 && sidebar.classList.contains('open')) {
    if (!sidebar.contains(e.target) && e.target !== menuToggle) {
      sidebar.classList.remove('open');
    }
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    sidebar.classList.add('open');
  } else {
    sidebar.classList.remove('open');
  }
});

// --- Курсы валют ---
async function fetchRate(pair, elId) {
  try {
    const resp = await fetch(`https://api.forexrateapi.com/v1/latest?base=${pair[0]}&symbols=${pair[1]}`);
    if (!resp.ok) throw new Error('Ошибка запроса');
    const data = await resp.json();
    const rate = data.rates[pair[1]];
    document.getElementById(elId).textContent = rate ? rate.toFixed(4) : 'Нет данных';
  } catch (e) {
    document.getElementById(elId).textContent = 'Ошибка';
  }
}

function updateRates() {
  fetchRate(['USD', 'RUB'], 'usd-rub');
  fetchRate(['EUR', 'RUB'], 'eur-rub');
  fetchRate(['USD', 'EUR'], 'usd-eur');
}

updateRates();
setInterval(updateRates, 60000);

// --- Инициализация ---
renderCategories();
filterCards();
