document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('nav ul.menu');
  const searchIcon = document.querySelector('.search-icon');
  const searchBar = document.querySelector('.search-bar');
  const searchInput = searchBar.querySelector('input[type="search"]');

  // Toggle mobile menu
  burger.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true' || false;
    burger.setAttribute('aria-expanded', !expanded);
    menu.style.display = expanded ? 'none' : 'flex';
  });

  // Toggle search bar
  searchIcon.addEventListener('click', () => {
    const visible = searchBar.style.display === 'block';
    searchBar.style.display = visible ? 'none' : 'block';
    if (!visible) {
      searchInput.focus();
    }
  });

  // Simple search suggestions (mock)
  const suggestions = [
    'Инвестиции 2025',
    'Налоги для физических лиц',
    'Кредиты с низкой ставкой',
    'Аналитика фондового рынка',
  ];

  searchInput.addEventListener('input', () => {
    const val = searchInput.value.toLowerCase();
    const suggBox = searchBar.querySelector('.search-suggestions');
    suggBox.innerHTML = '';
    if (val.length < 2) return;
    const filtered = suggestions.filter(s => s.toLowerCase().includes(val));
    filtered.forEach(item => {
      const div = document.createElement('div');
      div.textContent = item;
      div.className = 'suggestion';
      div.tabIndex = 0;
      div.addEventListener('click', () => {
        searchInput.value = item;
        suggBox.innerHTML = '';
      });
      suggBox.appendChild(div);
    });
  });

  // Fade-in animation for cards on scroll
  const cards = document.querySelectorAll('.card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    observer.observe(card);
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('nav ul.menu');
  const searchIcon = document.querySelector('.search-icon');
  const searchBar = document.querySelector('.search-bar');
  const searchInput = searchBar.querySelector('input[type="search"]');

  // Toggle mobile menu
  burger.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true' || false;
    burger.setAttribute('aria-expanded', !expanded);
    menu.style.display = expanded ? 'none' : 'flex';
  });

  // Toggle search bar
  searchIcon.addEventListener('click', () => {
    const visible = searchBar.style.display === 'block';
    searchBar.style.display = visible ? 'none' : 'block';
    if (!visible) {
      searchInput.focus();
    }
  });

  // Simple search suggestions (mock)
  const suggestions = [
    'Инвестиции 2025',
    'Налоги для физических лиц',
    'Кредиты с низкой ставкой',
    'Аналитика фондового рынка',
  ];

  searchInput.addEventListener('input', () => {
    const val = searchInput.value.toLowerCase();
    const suggBox = searchBar.querySelector('.search-suggestions');
    suggBox.innerHTML = '';
    if (val.length < 2) return;
    const filtered = suggestions.filter(s => s.toLowerCase().includes(val));
    filtered.forEach(item => {
      const div = document.createElement('div');
      div.textContent = item;
      div.className = 'suggestion';
      div.tabIndex = 0;
      div.addEventListener('click', () => {
        searchInput.value = item;
        suggBox.innerHTML = '';
      });
      suggBox.appendChild(div);
    });
  });

  // Fade-in animation for cards on scroll
  const cards = document.querySelectorAll('.card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    observer.observe(card);
  });
});
