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
    { name: '도요타',       symbol: '7203.T' },
    { name: '소니그룹',     symbol: '6758.T' },
    { name: '미쓰비시UFJ',  symbol: '8306.T' },
    { name: '히타치',       symbol: '6501.T' },
    { name: 'NTT',          symbol: '9432.T' },
    { name: '소프트뱅크G',  symbol: '9984.T' },
    { name: '키엔스',       symbol: '6861.T' },
    { name: '도쿄일렉트론', symbol: '8035.T' },
    { name: '미쓰이스미토모FG', symbol: '8316.T' },
    { name: '화낙',         symbol: '6954.T' },
    { name: '리쿠르트',     symbol: '6098.T' },
    { name: '신에쓰화학',   symbol: '4063.T' },
    { name: 'KDDI',         symbol: '9433.T' },
    { name: '덴소',         symbol: '6902.T' },
    { name: '미쓰비시상사', symbol: '8058.T' },
    { name: '혼다',         symbol: '7267.T' },
    { name: '미즈호FG',     symbol: '8411.T' },
    { name: '다케다제약',   symbol: '4502.T' },
    { name: '오리엔탈랜드', symbol: '4661.T' },
    { name: '닌텐도',       symbol: '7974.T' },
  ],
};

// 심볼 → 한글 이름 매핑 (모든 시장)
const KR_NAMES = {};
Object.values(RANK_MARKETS).flat().forEach(({ symbol, name }) => { KR_NAMES[symbol] = name; });

function getDisplayName(symbol, fallback) {
  return KR_NAMES[symbol] || fallback || symbol;
}

const PERIOD_CONFIG = {
  '1분':  { interval: '1m',  range: '2d',  intraday: true },
  '3분':  { interval: '1m',  range: '2d',  intraday: true, aggregate: 3 },
  '5분':  { interval: '5m',  range: '5d',  intraday: true },
  '10분': { interval: '5m',  range: '5d',  intraday: true, aggregate: 10 },
  '15분': { interval: '15m', range: '5d',  intraday: true },
  '30분': { interval: '30m', range: '5d',  intraday: true },
  'D':    { interval: '1d',  range: 'max' },
  'W':    { interval: '1wk', range: 'max' },
  'M':    { interval: '1mo', range: 'max' },
  'Y':    { interval: '1mo', range: 'max' },
};

// ── 상태 ──────────────────────────────────────────────────────────────────────

let currentSymbol = null;
let currentPeriod = 'D';
let chartInstance = null;
let candleSeries = null;
let volumeSeries = null;
let rankCache = {};
let lastStock = null;
let currentCurrency = 'KRW';
let allCandles = [];
let highPriceLine = null;
let lowPriceLine = null;

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
  const config = PERIOD_CONFIG[period];
  const { interval, range, intraday, aggregate } = config;
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}`;
  const r = await yahooFetch(url);
  if (!r) return null;
  const j = await r.json();
  const result = j?.chart?.result?.[0];
  if (!result) return null;

  const ts = result.timestamp;
  const q = result.indicators?.quote?.[0];
  if (!ts || !q) return null;

  const seen = new Set();
  const candles = [];
  const volumes = [];

  for (let i = 0; i < ts.length; i++) {
    if (q.open?.[i] == null || q.high?.[i] == null || q.low?.[i] == null || q.close?.[i] == null) continue;
    const time = intraday ? ts[i] : new Date(ts[i] * 1000).toISOString().split('T')[0];
    if (seen.has(time)) continue;
    seen.add(time);
    candles.push({ time, open: q.open[i], high: q.high[i], low: q.low[i], close: q.close[i] });
    volumes.push({ time, value: q.volume?.[i] || 0, color: q.close[i] >= q.open[i] ? 'rgba(229,57,53,0.4)' : 'rgba(21,101,192,0.4)' });
  }

  // 분봉 집계 (3분, 10분 등)
  if (aggregate) {
    const aggSecs = aggregate * 60;
    const buckets = {};
    candles.forEach((c, i) => {
      const key = Math.floor(c.time / aggSecs) * aggSecs;
      if (!buckets[key]) {
        buckets[key] = { open: c.open, high: c.high, low: c.low, close: c.close, vol: volumes[i].value };
      } else {
        buckets[key].high  = Math.max(buckets[key].high, c.high);
        buckets[key].low   = Math.min(buckets[key].low,  c.low);
        buckets[key].close = c.close;
        buckets[key].vol  += volumes[i].value;
      }
    });
    const sorted = Object.entries(buckets).sort((a, b) => +a[0] - +b[0]);
    return {
      candles: sorted.map(([k, v]) => ({ time: +k, open: v.open, high: v.high, low: v.low, close: v.close })),
      volumes: sorted.map(([k, v]) => ({ time: +k, value: v.vol, color: v.close >= v.open ? 'rgba(229,57,53,0.4)' : 'rgba(21,101,192,0.4)' })),
    };
  }

  if (period === 'Y') {
    const yearMap = {};
    candles.forEach((c, i) => {
      const year = c.time.substring(0, 4);
      if (!yearMap[year]) {
        yearMap[year] = { open: c.open, high: c.high, low: c.low, close: c.close, vol: volumes[i].value };
      } else {
        yearMap[year].high  = Math.max(yearMap[year].high, c.high);
        yearMap[year].low   = Math.min(yearMap[year].low,  c.low);
        yearMap[year].close = c.close;
        yearMap[year].vol  += volumes[i].value;
      }
    });
    const yc = Object.entries(yearMap).map(([y, v]) => ({ time: y + '-01-01', open: v.open, high: v.high, low: v.low, close: v.close }));
    const yv = Object.entries(yearMap).map(([y, v]) => ({ time: y + '-01-01', value: v.vol, color: v.close >= v.open ? 'rgba(229,57,53,0.4)' : 'rgba(21,101,192,0.4)' }));
    return { candles: yc, volumes: yv };
  }

  return { candles, volumes };
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

// ── 차트 헬퍼 ─────────────────────────────────────────────────────────────────

function makeFormatter(currency) {
  if (currency === 'KRW') return p => Math.round(p).toLocaleString('ko-KR') + '원';
  if (currency === 'JPY') return p => '¥' + Math.round(p).toLocaleString('ja-JP');
  return p => '$' + p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function updateHighLowLines() {
  if (!candleSeries || allCandles.length === 0) return;
  const range = chartInstance.timeScale().getVisibleLogicalRange();
  if (!range) return;
  const from = Math.max(0, Math.floor(range.from));
  const to   = Math.min(allCandles.length - 1, Math.ceil(range.to));
  if (from > to) return;
  const visible = allCandles.slice(from, to + 1);
  const maxHigh = Math.max(...visible.map(c => c.high));
  const minLow  = Math.min(...visible.map(c => c.low));
  try { if (highPriceLine) candleSeries.removePriceLine(highPriceLine); } catch {}
  try { if (lowPriceLine)  candleSeries.removePriceLine(lowPriceLine);  } catch {}
  highPriceLine = candleSeries.createPriceLine({ price: maxHigh, color: '#e53935', lineWidth: 1, lineStyle: LightweightCharts.LineStyle.Dashed, axisLabelVisible: true, title: '최고' });
  lowPriceLine  = candleSeries.createPriceLine({ price: minLow,  color: '#1565c0', lineWidth: 1, lineStyle: LightweightCharts.LineStyle.Dashed, axisLabelVisible: true, title: '최저' });
}

// ── 차트 초기화 ───────────────────────────────────────────────────────────────

function initChart() {
  if (chartInstance) { chartInstance.remove(); chartInstance = null; candleSeries = null; volumeSeries = null; }
  highPriceLine = null; lowPriceLine = null; allCandles = [];

  const container = document.getElementById('chart-container');
  chartInstance = LightweightCharts.createChart(container, {
    layout: { background: { color: '#ffffff' }, textColor: '#1d1d1f' },
    grid: { vertLines: { color: '#f0f0f0' }, horzLines: { color: '#f0f0f0' } },
    crosshair: { mode: LightweightCharts.CrosshairMode.Normal },
    rightPriceScale: { borderColor: '#e5e5e7', scaleMargins: { top: 0.05, bottom: 0.25 } },
    timeScale: {
      borderColor: '#e5e5e7',
      timeVisible: true,
      secondsVisible: false,
      rightOffset: 5,
      tickMarkFormatter: (time, tickMarkType) => {
        let y, m, d, dt = null;
        if (typeof time === 'string') {
          const p = time.split('-');
          y = +p[0]; m = +p[1]; d = +p[2];
        } else if (typeof time === 'object' && time !== null) {
          y = time.year; m = time.month; d = time.day;
        } else {
          dt = new Date(time * 1000);
          y = dt.getFullYear(); m = dt.getMonth() + 1; d = dt.getDate();
        }
        if (tickMarkType >= 3) {
          if (!dt) dt = new Date(time * 1000);
          return String(dt.getHours()).padStart(2,'0') + ':' + String(dt.getMinutes()).padStart(2,'0');
        }
        if (tickMarkType === 0) return y + '년';
        if (tickMarkType === 1) return m + '월';
        return m + '월 ' + d + '일';
      },
    },
    localization: {
      priceFormatter: makeFormatter('KRW'),
      timeFormatter: (time) => {
        let y, m, d, hh = null, mn = null;
        if (typeof time === 'string') {
          const p = time.split('-');
          y = +p[0]; m = +p[1]; d = +p[2];
        } else if (typeof time === 'object' && time !== null) {
          y = time.year; m = time.month; d = time.day;
        } else {
          const dt = new Date(time * 1000);
          y = dt.getFullYear(); m = dt.getMonth() + 1; d = dt.getDate();
          hh = dt.getHours(); mn = dt.getMinutes();
        }
        const base = y + '년 ' + m + '월 ' + d + '일';
        if (hh !== null) return base + ' ' + String(hh).padStart(2,'0') + ':' + String(mn).padStart(2,'0');
        return base;
      },
    },
    width: container.clientWidth,
    height: container.clientHeight,
  });

  candleSeries = chartInstance.addCandlestickSeries({
    upColor: '#e53935', downColor: '#1565c0',
    borderUpColor: '#e53935', borderDownColor: '#1565c0',
    wickUpColor: '#e53935', wickDownColor: '#1565c0',
  });

  volumeSeries = chartInstance.addHistogramSeries({
    priceFormat: { type: 'volume' },
    priceScaleId: 'volume',
  });
  chartInstance.priceScale('volume').applyOptions({
    scaleMargins: { top: 0.8, bottom: 0 },
    visible: false,
  });

  chartInstance.timeScale().subscribeVisibleLogicalRangeChange((range) => {
    updateHighLowLines();
    if (!range || allCandles.length === 0) return;
    const maxTo = allCandles.length - 1 + 3;
    if (range.to > maxTo) {
      chartInstance.timeScale().setVisibleLogicalRange({ from: range.from - (range.to - maxTo), to: maxTo });
    }
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

  if (!data || data.candles.length === 0) {
    emptyEl.style.display = 'flex';
    emptyEl.querySelector('p:nth-child(2)').textContent = '데이터를 불러올 수 없습니다';
    return;
  }

  allCandles = data.candles;
  candleSeries.setData(data.candles);
  volumeSeries.setData(data.volumes);
  chartInstance.applyOptions({ localization: { priceFormatter: makeFormatter(currentCurrency) } });
  chartInstance.timeScale().fitContent();
  updateHighLowLines();
}

// ── 종목 로드 ─────────────────────────────────────────────────────────────────

async function loadStockBySymbol(symbol) {
  hideSuggestions();
  const infoEl = document.getElementById('stock-info');
  infoEl.innerHTML = '<span style="color:#bbb;font-size:13px">조회 중...</span>';
  infoEl.classList.remove('hidden');

  const meta = await fetchQuote(symbol);

  if (!meta || !meta.regularMarketPrice) {
    infoEl.innerHTML = '<span style="color:#ff3b30;font-size:13px">종목을 찾을 수 없습니다</span>';
    return;
  }

  const currency = meta.currency || 'USD';
  currentCurrency = currency;
  currentSymbol = symbol;

  const pct  = meta.regularMarketChangePercent || 0;
  const cls  = pct > 0 ? 'up' : pct < 0 ? 'down' : 'flat';
  const sign = pct >= 0 ? '+' : '';
  const displayName = getDisplayName(symbol, meta.shortName);

  infoEl.innerHTML = `
    <span class="si-name">${displayName}</span>
    <span class="si-ticker">${symbol}</span>
    <span class="si-price">${fmtPrice(meta.regularMarketPrice, currency)}</span>
    <span class="si-change ${cls}">${sign}${(meta.regularMarketChange || 0).toFixed(2)} (${sign}${pct.toFixed(2)}%)</span>
  `;

  document.getElementById('btn-to-sim').classList.remove('hidden');
  lastStock = { symbol, name: displayName, price: meta.regularMarketPrice, currency };

  await loadChart(symbol, currentPeriod);
}

// ── 주기 탭 ───────────────────────────────────────────────────────────────────

document.querySelectorAll('.period-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.periodGroup === 'min') {
      document.querySelectorAll('.period-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('min-tabs').classList.remove('hidden');
      if (!document.querySelector('.min-tab.active') && currentSymbol) {
        currentPeriod = '5분';
        document.querySelector('.min-tab[data-period="5분"]').classList.add('active');
        loadChart(currentSymbol, currentPeriod);
      }
    } else {
      document.querySelectorAll('.period-tab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.min-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('min-tabs').classList.add('hidden');
      currentPeriod = btn.dataset.period;
      if (currentSymbol) loadChart(currentSymbol, currentPeriod);
    }
  });
});

document.querySelectorAll('.min-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.min-tab').forEach(b => b.classList.remove('active'));
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
      const rankName = el.querySelector('.rank-name').textContent;
      document.getElementById('name-input').value = rankName;
      switchView('chart');
      loadStockBySymbol(el.dataset.symbol);
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
  hideSuggestions();
  switchView('sim');
  computeResult();
});

// ── 종목명 자동완성 ───────────────────────────────────────────────────────────

const MARKET_LABEL = { KS: '한국', KQ: '한국', T: '일본', SS: '중국', SZ: '중국', HK: '홍콩' };

function getMarketLabel(symbol) {
  const ext = symbol.split('.').pop();
  return MARKET_LABEL[ext] || '미국';
}

function hideSuggestions() {
  document.getElementById('name-suggestions').classList.add('hidden');
}

function renderSuggestions(quotes) {
  const el = document.getElementById('name-suggestions');
  if (!quotes.length) { el.classList.add('hidden'); return; }
  el.innerHTML = quotes.map(q => {
    const name = getDisplayName(q.symbol, q.shortname || q.longname || q.symbol);
    return `<div class="sug-item" data-symbol="${q.symbol}" data-name="${name}">
      <span class="sug-name">${name}</span>
      <div class="sug-right">
        <span class="sug-symbol">${q.symbol}</span>
        <span class="sug-market">${getMarketLabel(q.symbol)}</span>
      </div>
    </div>`;
  }).join('');
  el.classList.remove('hidden');
  el.querySelectorAll('.sug-item').forEach(item => {
    item.addEventListener('mousedown', e => {
      e.preventDefault();
      document.getElementById('ticker-input').value = item.dataset.symbol;
      document.getElementById('name-input').value = item.dataset.name;
      hideSuggestions();
      searchStock();
    });
  });
}

async function fetchSuggestions(q) {
  const lower = q.toLowerCase();

  // 즉시 로컬 검색 (RANK_MARKETS 80종목)
  const local = Object.values(RANK_MARKETS).flat()
    .filter(s => s.name.includes(q) || s.symbol.toLowerCase().includes(lower))
    .slice(0, 8)
    .map(s => ({ symbol: s.symbol, shortname: s.name, quoteType: 'EQUITY' }));
  renderSuggestions(local);

  // Yahoo Finance API 검색 (추가 결과)
  try {
    const url = `https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(q)}&quotesCount=10&newsCount=0&listsCount=0`;
    const r = await yahooFetch(url);
    if (!r || !r.ok) return;
    const j = await r.json();
    const apiQuotes = (j?.quotes || []).filter(item => item.quoteType === 'EQUITY' && item.symbol);
    if (apiQuotes.length) renderSuggestions(apiQuotes);
  } catch {}
}

function selectFirstSuggestion() {
  const first = document.querySelector('#name-suggestions .sug-item');
  if (first) {
    document.getElementById('name-input').value = first.dataset.name;
    hideSuggestions();
    loadStockBySymbol(first.dataset.symbol);
  }
}

let suggestTimer = null;
document.getElementById('name-input').addEventListener('input', e => {
  clearTimeout(suggestTimer);
  const q = e.target.value.trim();
  if (!q) { hideSuggestions(); return; }
  suggestTimer = setTimeout(() => fetchSuggestions(q), 500);
});
document.getElementById('name-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') selectFirstSuggestion();
  if (e.key === 'Escape') hideSuggestions();
});
document.addEventListener('click', e => {
  if (!e.target.closest('.search-name-wrap')) hideSuggestions();
});

// ── 검색 이벤트 ───────────────────────────────────────────────────────────────

document.getElementById('btn-search').addEventListener('click', selectFirstSuggestion);

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

// 기본 차트: 한국 시총 1위 (삼성전자)
document.getElementById('name-input').value = '삼성전자';
loadStockBySymbol('005930.KS');
