const ratesMini = document.getElementById('ratesMini');

async function fetchCryptoRates() {
  const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,toncoin,solana&vs_currencies=usd';
  const res = await fetch(url);
  const data = await res.json();
  return `BTC $${data.bitcoin.usd} | ETH $${data.ethereum.usd} | TON $${data.toncoin.usd} | SOL $${data.solana.usd}`;
}

async function fetchStockRates() {
  return 'S&P 500: 5200 | NASDAQ: 16000 | MOEX: 3400 | Золото: $2350';
}

async function fetchCurrencyRates() {
  const url = 'https://api.exchangerate.host/latest?base=USD&symbols=RUB,EUR,CNY,GBP';
  const res = await fetch(url);
  const data = await res.json();
  return `USD/RUB ${data.rates.RUB.toFixed(2)} | EUR/USD ${(1/data.rates.EUR).toFixed(2)} | CNY/RUB ${(data.rates.RUB/data.rates.CNY).toFixed(2)} | GBP/USD ${(1/data.rates.GBP).toFixed(2)}`;
}

async function fetchAllRates() {
  const [crypto, stocks, currency] = await Promise.all([
    fetchCryptoRates(),
    fetchStockRates(),
    fetchCurrencyRates()
  ]);
  ratesMini.innerHTML = `
    <span>${crypto}</span>
    <span>${stocks}</span>
    <span>${currency}</span>
  `;
}
fetchAllRates();
setInterval(fetchAllRates, 15000);
