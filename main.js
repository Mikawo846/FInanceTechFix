// --- Получение и отображение актуальных курсов ---

// Используем бесплатные публичные API (CoinGecko для крипто и фондовых, ExchangeRates для валют)
// Для продакшена используйте свои ключи и лимиты API!

const ratesBar = document.getElementById('ratesBar');

async function fetchCryptoRates() {
  // CoinGecko API
  const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,toncoin,solana&vs_currencies=usd';
  const res = await fetch(url);
  const data = await res.json();
  return `Криптовалюты: BTC $${data.bitcoin.usd} | ETH $${data.ethereum.usd} | TON $${data.toncoin.usd} | SOL $${data.solana.usd}`;
}

async function fetchStockRates() {
  // Для примера - статичные данные, для реального проекта используйте биржевой API
  // Например, https://financialmodelingprep.com/ или любой другой
  // Здесь просто пример:
  return 'Фондовые индексы: S&P 500: 5200 | NASDAQ: 16000 | MOEX: 3400 | Золото: $2350';
}

async function fetchCurrencyRates() {
  // Exchangerate.host - бесплатный API
  const url = 'https://api.exchangerate.host/latest?base=USD&symbols=RUB,EUR,CNY,GBP';
  const res = await fetch(url);
  const data = await res.json();
  return `Курсы валют: USD/RUB ${data.rates.RUB.toFixed(2)} | EUR/USD ${(1/data.rates.EUR).toFixed(2)} | CNY/RUB ${(data.rates.RUB/data.rates.CNY).toFixed(2)} | GBP/USD ${(1/data.rates.GBP).toFixed(2)}`;
}

const blocks = [
  fetchCryptoRates,
  fetchStockRates,
  fetchCurrencyRates
];

let currentBlock = 0;

async function updateRatesBar() {
  const text = await blocks[currentBlock % blocks.length]();
  ratesBar.textContent = text;
  currentBlock++;
}

// Первый запуск и автосмена каждые 15 секунд
updateRatesBar();
setInterval(updateRatesBar, 15000);

// --- Поиск по сайту (пример, если нужен только визуал) ---
// Если хотите реализовать реальный поиск - потребуется JS-код для фильтрации контента по запросу пользователя.
