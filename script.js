'use strict';

// ── 시총 데이터 ───────────────────────────────────────────────────────────────

const RANK_MARKETS = {
  KR: [
    { name: '삼성전자',       symbol: '005930.KS' },
    { name: 'SK하이닉스',     symbol: '000660.KS' },
    { name: 'LG에너지솔루션', symbol: '373220.KS' },
    { name: '삼성바이오로직스',symbol: '207940.KS' },
    { name: '현대차',         symbol: '005380.KS' },
    { name: '셀트리온',       symbol: '068270.KS' },
    { name: 'POSCO홀딩스',    symbol: '005490.KS' },
    { name: 'KB금융',         symbol: '105560.KS' },
    { name: 'LG화학',         symbol: '051910.KS' },
    { name: '신한지주',       symbol: '055550.KS' },
    { name: '삼성SDI',        symbol: '006400.KS' },
    { name: '현대모비스',     symbol: '012330.KS' },
    { name: '카카오',         symbol: '035720.KS' },
    { name: 'NAVER',          symbol: '035420.KS' },
    { name: '하나금융지주',   symbol: '086790.KS' },
    { name: '기아',           symbol: '000270.KS' },
    { name: '삼성물산',       symbol: '028260.KS' },
    { name: 'SK이노베이션',   symbol: '096770.KS' },
    { name: '한국전력',       symbol: '015760.KS' },
    { name: 'LG전자',         symbol: '066570.KS' },
  ],
  US: [
    { name: 'Apple',       symbol: 'AAPL' },
    { name: 'Microsoft',   symbol: 'MSFT' },
    { name: 'NVIDIA',      symbol: 'NVDA' },
    { name: 'Alphabet',    symbol: 'GOOGL' },
    { name: 'Amazon',      symbol: 'AMZN' },
    { name: 'Meta',        symbol: 'META' },
    { name: 'Tesla',       symbol: 'TSLA' },
    { name: 'Berkshire',   symbol: 'BRK-B' },
    { name: 'TSMC ADR',    symbol: 'TSM' },
    { name: 'Broadcom',    symbol: 'AVGO' },
    { name: 'JP Morgan',   symbol: 'JPM' },
    { name: 'Visa',        symbol: 'V' },
    { name: 'Eli Lilly',   symbol: 'LLY' },
    { name: 'ExxonMobil',  symbol: 'XOM' },
    { name: 'UnitedHealth',symbol: 'UNH' },
    { name: 'Walmart',     symbol: 'WMT' },
    { name: 'Netflix',     symbol: 'NFLX' },
    { name: 'Mastercard',  symbol: 'MA' },
    { name: 'Oracle',      symbol: 'ORCL' },
    { name: 'Palantir',    symbol: 'PLTR' },
  ],
  CN: [
    { name: '귀주모태주',   symbol: '600519.SS' },
    { name: '공상은행',     symbol: '601398.SS' },
    { name: '건설은행',     symbol: '601939.SS' },
    { name: '농업은행',     symbol: '601288.SS' },
    { name: '중국은행',     symbol: '601988.SS' },
    { name: 'BYD A',        symbol: '002594.SZ' },
    { name: '중국이동',     symbol: '600941.SS' },
    { name: '닝더스다이',   symbol: '300750.SZ' },
    { name: '알리바바 HK',  symbol: '9988.HK' },
    { name: '텐센트',       symbol: '0700.HK' },
    { name: '핑안보험',     symbol: '601318.SS' },
    { name: '샤오미',       symbol: '1810.HK' },
    { name: '메이퇀',       symbol: '3690.HK' },
    { name: '중국석유화공', symbol: '600028.SS' },
    { name: '건설은행 H',   symbol: '0939.HK' },
    { name: '공상은행 H',   symbol: '1398.HK' },
    { name: '안타스포츠',   symbol: '2020.HK' },
    { name: '농업은행 H',   symbol: '1288.HK' },
    { name: 'CNOOC HK',     symbol: '0883.HK' },
    { name: '징동닷컴 HK',  symbol: '9618.HK' },
  ],
  JP: [
    { name: 'トヨタ自動車',      symbol: '7203.T' },
    { name: 'ソニーグループ',    symbol: '6758.T' },
    { name: '三菱UFJ',          symbol: '8306.T' },
    { name: '日立製作所',        symbol: '6501.T' },
    { name: 'NTT',              symbol: '9432.T' },
    { name: 'ソフトバンクG',     symbol: '9984.T' },
    { name: 'キーエンス',        symbol: '6861.T' },
    { name: '東京エレクトロン',  symbol: '8035.T' },
    { name: '三井住友FG',        symbol: '8316.T' },
    { name: 'ファナック',        symbol: '6954.T' },
    { name: 'リクルート',        symbol: '6098.T' },
    { name: '信越化学工業',      symbol: '4063.T' },
    { name: 'KDDI',             symbol: '9433.T' },
    { name: 'デンソー',          symbol: '6902.T' },
    { name: '三菱商事',          symbol: '8058.T' },
    { name: '本田技研工業',      symbol: '7267.T' },
    { name: 'みずほFG',          symbol: '8411.T' },
    { name: '武田薬品工業',      symbol: '4502.T' },
    { name: 'オリエンタルランド', symbol: '4661.T' },
    { name: '任天堂',            symbol: '7974.T' },
  ],
};

const PERIOD_CONFIG = {
  '1D': { interval: '5m',  range: '1d' },
  '1W': { interval: '1h',  range: '5d' },
  '1M': { interval: '1d',  range: '1mo' },
  '3M': { interval: '1d',  range: '3mo' },
  '1Y': { interval: '1d',  range: '1y' },
  '5Y': { interval: '1wk', range: '5y' },
};

// ── 상태 ──────────────────────────────────────────────────────────────────────

let currentSymbol = null;
let currentPeriod = '1M';
let chartInstance = null;
let candleSeries = null;
let rankCache = {};
let lastStock = null;

// ── Yahoo Finance 헬퍼 ────────────────────────────────────────────────────────

const CF_PROXY = 'https://shiny-mud-4976.sodkem93.workers.dev/?url=';

async function yahooFetch(url) {
  const proxies = [
    u => u,
    u => CF_PROXY + encodeURIComponent(u),
  ];
  for (const proxy of proxies) {
    try {
      const r = await fetch(proxy(url));
      if (r.ok) return r;
    } catch {}
  }
  return null;
}

function detectMarket(raw) {
  const t = raw.trim();
  if (/\.(KS|KQ|T|SS|SZ|HK)$/i.test(t)) return t.toUpperCase();
  if (/^\d{6}$/.test(t)) return t + '.KS';
  if (/^\d{4}$/.test(t)) return t + '.T';
  return t.toUpperCase();
}

async function fetchQuote(symbol) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`;
  const r = await yahooFetch(url);
  if (!r) return null;
  const j = await r.json();
  return j?.chart?.result?.[0]?.meta || null;
}

async function fetchChartData(symbol, period) {
  const { interval, range } = PERIOD_CONFIG[period];
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}`;
  const r = await yahooFetch(url);
  if (!r) return null;
  const j = await r.json();
  const result = j?.chart?.result?.[0];
  if (!result) return null;

  const ts = result.timestamp;
  const q = result.indicators?.quote?.[0];
  if (!ts || !q) return null;

  const isIntraday = period === '1D' || period === '1W';
  const seen = new Set();
  const data = [];

  for (let i = 0; i < ts.length; i++) {
    if (q.open?.[i] == null || q.high?.[i] == null || q.low?.[i] == null || q.close?.[i] == null) continue;
    const time = isIntraday
      ? ts[i]
      : new Date(ts[i] * 1000).toISOString().split('T')[0];
    if (seen.has(time)) continue;
    seen.add(time);
    data.push({ time, open: q.open[i], high: q.high[i], low: q.low[i], close: q.close[i] });
  }
  return data;
}

async function fetchBatchQuotes(symbols) {
  try {
    const url = CF_PROXY.replace('?url=', '') + '?symbols=' + symbols.join(',');
    const r = await fetch(url);
    if (r.ok) return await r.json();
  } catch {}
  return null;
}

// ── 포맷 헬퍼 ─────────────────────────────────────────────────────────────────

function fmtPrice(n, currency) {
  if (n == null || isNaN(n)) return '-';
  if (currency === 'KRW') return n.toLocaleString('ko-KR') + '원';
  if (currency === 'JPY') return '¥' + n.toLocaleString('ja-JP');
  if (currency === 'CNY' || currency === 'HKD') return '¥' + n.toLocaleString();
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ── 차트 초기화 ───────────────────────────────────────────────────────────────

function initChart() {
  if (chartInstance) { chartInstance.remove(); chartInstance = null; candleSeries = null; }

  const container = document.getElementById('chart-container');
  chartInstance = LightweightCharts.createChart(container, {
    layout: { background: { color: '#ffffff' }, textColor: '#1d1d1f' },
    grid: { vertLines: { color: '#f0f0f0' }, horzLines: { color: '#f0f0f0' } },
    crosshair: { mode: LightweightCharts.CrosshairMode.Normal },
    rightPriceScale: { borderColor: '#e5e5e7' },
    timeScale: { borderColor: '#e5e5e7', timeVisible: true, secondsVisible: false },
    width: container.clientWidth,
    height: container.clientHeight,
  });

  candleSeries = chartInstance.addCandlestickSeries({
    upColor: '#e53935', downColor: '#1565c0',
    borderUpColor: '#e53935', borderDownColor: '#1565c0',
    wickUpColor: '#e53935', wickDownColor: '#1565c0',
  });

  new ResizeObserver(() => {
    if (chartInstance) {
      const c = document.getElementById('chart-container');
      chartInstance.resize(c.clientWidth, c.clientHeight);
    }
  }).observe(container);
}

async function loadChart(symbol, period) {
  const emptyEl   = document.getElementById('chart-empty');
  const loadingEl = document.getElementById('chart-loading');

  emptyEl.style.display = 'none';
  loadingEl.classList.remove('hidden');

  if (!chartInstance) initChart();

  const data = await fetchChartData(symbol, period);
  loadingEl.classList.add('hidden');

  if (!data || data.length === 0) {
    emptyEl.style.display = 'flex';
    emptyEl.querySelector('p:nth-child(2)').textContent = '데이터를 불러올 수 없습니다';
    return;
  }

  candleSeries.setData(data);
  chartInstance.timeScale().fitContent();
}

// ── 종목 검색 ─────────────────────────────────────────────────────────────────

async function searchStock() {
  const marketSel = document.getElementById('market-select').value;
  const raw = document.getElementById('ticker-input').value.trim();
  if (!raw) return;

  let symbol;
  if (marketSel === 'auto') {
    symbol = detectMarket(raw);
  } else if (marketSel === 'KR') {
    symbol = /^\d{6}$/.test(raw) ? raw + '.KS' : raw.toUpperCase();
  } else if (marketSel === 'JP') {
    symbol = /^\d{4}$/.test(raw) ? raw + '.T' : raw.toUpperCase();
  } else if (marketSel === 'CN') {
    symbol = raw.includes('.') ? raw.toUpperCase() : raw + '.SS';
  } else if (marketSel === 'HK') {
    symbol = raw.includes('.') ? raw.toUpperCase() : raw + '.HK';
  } else {
    symbol = raw.toUpperCase();
  }

  const infoEl = document.getElementById('stock-info');
  infoEl.innerHTML = '<span style="color:#bbb;font-size:13px">조회 중...</span>';
  infoEl.classList.remove('hidden');

  const meta = await fetchQuote(symbol);

  if (!meta || !meta.regularMarketPrice) {
    infoEl.innerHTML = '<span style="color:#ff3b30;font-size:13px">종목을 찾을 수 없습니다</span>';
    return;
  }

  const currency = meta.currency || 'USD';
  currentSymbol = symbol;

  const pct  = meta.regularMarketChangePercent || 0;
  const cls  = pct > 0 ? 'up' : pct < 0 ? 'down' : 'flat';
  const sign = pct >= 0 ? '+' : '';

  infoEl.innerHTML = `
    <span class="si-name">${meta.shortName || symbol}</span>
    <span class="si-ticker">${symbol}</span>
    <span class="si-price">${fmtPrice(meta.regularMarketPrice, currency)}</span>
    <span class="si-change ${cls}">${sign}${(meta.regularMarketChange || 0).toFixed(2)} (${sign}${pct.toFixed(2)}%)</span>
  `;

  document.getElementById('btn-to-sim').classList.remove('hidden');
  lastStock = { symbol, name: meta.shortName || symbol, price: meta.regularMarketPrice, currency };

  await loadChart(symbol, currentPeriod);
}

// ── 주기 탭 ───────────────────────────────────────────────────────────────────

document.querySelectorAll('.period-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.period-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentPeriod = btn.dataset.period;
    if (currentSymbol) loadChart(currentSymbol, currentPeriod);
  });
});

// ── 시총 순위 ─────────────────────────────────────────────────────────────────

async function loadRankings(marketKey) {
  const cache = rankCache[marketKey];
  if (cache && Date.now() - cache.ts < 3 * 60 * 1000) { renderRankings(cache.data); return; }

  const loadEl = document.getElementById('rank-loading');
  loadEl.textContent = '불러오는 중...';
  loadEl.style.display = 'block';
  document.getElementById('rank-list').innerHTML = '';

  const symbols = RANK_MARKETS[marketKey].map(m => m.symbol);
  const quotes  = await fetchBatchQuotes(symbols);

  loadEl.style.display = 'none';

  if (!quotes) {
    document.getElementById('rank-list').innerHTML = '<div class="rank-error">불러오기 실패</div>';
    return;
  }

  const nameMap = {};
  RANK_MARKETS[marketKey].forEach(m => { nameMap[m.symbol] = m.name; });

  const data = quotes.map(q => ({ ...q, displayName: nameMap[q.symbol] || q.shortName || q.symbol }));
  rankCache[marketKey] = { data, ts: Date.now() };
  renderRankings(data);
}

function renderRankings(data) {
  const list = document.getElementById('rank-list');
  list.innerHTML = data.map((q, i) => {
    const pct  = q.regularMarketChangePercent || 0;
    const cls  = pct > 0 ? 'up' : pct < 0 ? 'down' : 'flat';
    const sign = pct >= 0 ? '+' : '';
    return `
      <div class="rank-item" data-symbol="${q.symbol}">
        <span class="rank-num ${i < 3 ? 'top3' : ''}">${i + 1}</span>
        <div class="rank-info">
          <div class="rank-name">${q.displayName}</div>
          <div class="rank-ticker">${q.symbol}</div>
        </div>
        <div class="rank-price-col">
          <div class="rank-price">${fmtPrice(q.regularMarketPrice, q.currency)}</div>
          <div class="rank-change ${cls}">${sign}${pct.toFixed(2)}%</div>
        </div>
      </div>`;
  }).join('');

  document.getElementById('rank-updated').textContent = '업데이트: ' + new Date().toLocaleTimeString('ko-KR');

  list.querySelectorAll('.rank-item').forEach(el => {
    el.addEventListener('click', () => {
      document.getElementById('ticker-input').value = el.dataset.symbol;
      document.getElementById('market-select').value = 'auto';
      switchView('chart');
      searchStock();
    });
  });
}

document.querySelectorAll('.rank-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.rank-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    loadRankings(btn.dataset.market);
  });
});

// ── 뷰 전환 ───────────────────────────────────────────────────────────────────

function switchView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + name).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.view === name));

  if (name === 'chart' && chartInstance) {
    setTimeout(() => {
      const c = document.getElementById('chart-container');
      chartInstance.resize(c.clientWidth, c.clientHeight);
    }, 30);
  }
}

document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => switchView(btn.dataset.view));
});

// ── 시뮬레이터 링크 ───────────────────────────────────────────────────────────

document.getElementById('btn-to-sim').addEventListener('click', () => {
  if (lastStock) {
    document.getElementById('current-price').value = lastStock.price;
    const badge = document.getElementById('sim-stock-badge');
    badge.textContent = `${lastStock.name}  ${fmtPrice(lastStock.price, lastStock.currency)}`;
    badge.classList.remove('hidden');
  }
  switchView('sim');
  computeResult();
});

// ── 검색 이벤트 ───────────────────────────────────────────────────────────────

document.getElementById('btn-search').addEventListener('click', searchStock);
document.getElementById('ticker-input').addEventListener('keydown', e => { if (e.key === 'Enter') searchStock(); });

// ── 시뮬레이터 ───────────────────────────────────────────────────────────────

['first-price', 'first-qty', 'stop-loss', 'target-price', 'current-price'].forEach(id => {
  document.getElementById(id).addEventListener('input', computeResult);
});

let stepCount = 0;

document.getElementById('btn-add-step').addEventListener('click', () => {
  stepCount++;
  const id  = 'step-' + Date.now();
  const div = document.createElement('div');
  div.className = 'step-row';
  div.id = id;
  div.innerHTML = `
    <span class="step-label">${stepCount}</span>
    <div class="field"><label>하락률 (%)</label><input type="number" min="0" max="100" placeholder="예: 10" class="drop-pct" /></div>
    <div class="field"><label>추가 수량 (주)</label><input type="number" min="0" placeholder="예: 50" class="add-qty" /></div>
    <button class="btn-del" data-id="${id}">✕</button>
  `;
  div.querySelector('.btn-del').addEventListener('click', () => {
    div.remove();
    document.getElementById('steps-empty').style.display =
      document.getElementById('steps-list').children.length === 0 ? 'block' : 'none';
    computeResult();
  });
  div.querySelectorAll('input').forEach(inp => inp.addEventListener('input', computeResult));
  document.getElementById('steps-list').appendChild(div);
  document.getElementById('steps-empty').style.display = 'none';
  computeResult();
});

function computeResult() {
  const firstPrice = parseFloat(document.getElementById('first-price').value) || 0;
  const firstQty   = parseFloat(document.getElementById('first-qty').value) || 0;
  const stopLoss   = parseFloat(document.getElementById('stop-loss').value) || 0;
  const target     = parseFloat(document.getElementById('target-price').value) || 0;
  const current    = parseFloat(document.getElementById('current-price').value) || 0;
  const currency   = lastStock?.currency || 'KRW';

  if (!firstPrice || !firstQty) {
    document.getElementById('result-panel').innerHTML =
      '<div class="result-empty"><p>📊</p><p>매수가와 수량을 입력하면<br>결과가 여기에 표시됩니다</p></div>';
    return;
  }

  const buys = [{ price: firstPrice, qty: firstQty, label: '첫 매수' }];
  document.querySelectorAll('#steps-list .step-row').forEach((row, idx) => {
    const drop = parseFloat(row.querySelector('.drop-pct').value) || 0;
    const qty  = parseFloat(row.querySelector('.add-qty').value)  || 0;
    if (drop > 0 && qty > 0) buys.push({ price: firstPrice * (1 - drop / 100), qty, label: `${idx + 1}차 추가 (-${drop}%)` });
  });

  const totalQty  = buys.reduce((s, b) => s + b.qty, 0);
  const totalCost = buys.reduce((s, b) => s + b.price * b.qty, 0);
  const avg       = totalCost / totalQty;

  let currentBlock = '';
  if (current > 0) {
    const pnl  = (current - avg) * totalQty;
    const pct  = (current / avg - 1) * 100;
    const cls  = pnl >= 0 ? 'profit' : 'loss';
    const sign = pnl >= 0 ? '+' : '-';
    currentBlock = `
      <div class="stat-item">
        <span class="stat-label">평가 손익</span>
        <span class="stat-value ${cls}">${sign}${fmtPrice(Math.abs(pnl), currency)} (${(pct >= 0 ? '+' : '')}${pct.toFixed(2)}%)</span>
      </div>`;
  }

  let html = `
    <div class="result-summary">
      <h3>매수 요약</h3>
      <div class="stat-grid">
        <div class="stat-item"><span class="stat-label">평균 매수단가</span><span class="stat-value accent">${fmtPrice(avg, currency)}</span></div>
        <div class="stat-item"><span class="stat-label">총 보유 수량</span><span class="stat-value">${totalQty.toLocaleString()}주</span></div>
        <div class="stat-item"><span class="stat-label">총 투자금액</span><span class="stat-value">${fmtPrice(totalCost, currency)}</span></div>
        ${currentBlock}
      </div>
    </div>`;

  const scenarios = [];
  if (stopLoss > 0) {
    const pnl = (stopLoss - avg) * totalQty;
    scenarios.push({ title: `🔴 손절 (${fmtPrice(stopLoss, currency)})`, pnl, pct: (stopLoss / avg - 1) * 100, cls: 'loss' });
  }
  if (target > 0) {
    const pnl = (target - avg) * totalQty;
    scenarios.push({ title: `🟢 목표가 (${fmtPrice(target, currency)})`, pnl, pct: (target / avg - 1) * 100, cls: 'profit' });
  }

  html += scenarios.map(s => `
    <div class="scenario-card">
      <div class="scenario-title">${s.title}</div>
      <div class="scenario-row"><span>예상 손익</span><strong class="${s.cls}">${s.pnl >= 0 ? '+' : ''}${fmtPrice(Math.abs(s.pnl), currency)}</strong></div>
      <div class="scenario-row"><span>수익률</span><strong class="${s.cls}">${(s.pct >= 0 ? '+' : '')}${s.pct.toFixed(2)}%</strong></div>
    </div>`).join('');

  html += `
    <div class="buys-table">
      <h3>매수 내역</h3>
      <table>
        <thead><tr><th>구분</th><th>매수가</th><th>수량</th><th>금액</th></tr></thead>
        <tbody>
          ${buys.map(b => `<tr><td>${b.label}</td><td>${fmtPrice(b.price, currency)}</td><td>${b.qty.toLocaleString()}주</td><td>${fmtPrice(b.price * b.qty, currency)}</td></tr>`).join('')}
          <tr class="total-row"><td>합계</td><td>${fmtPrice(avg, currency)}</td><td>${totalQty.toLocaleString()}주</td><td>${fmtPrice(totalCost, currency)}</td></tr>
        </tbody>
      </table>
    </div>`;

  document.getElementById('result-panel').innerHTML = html;
}

// ── 초기화 ────────────────────────────────────────────────────────────────────

loadRankings('KR');
