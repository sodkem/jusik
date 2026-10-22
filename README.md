# StockSim — 주식 매수 전략 시뮬레이터

## 사이트 주소
- **라이브**: https://sodkem.github.io/jusik/
- **GitHub 레포**: https://github.com/sodkem/jusik

---

## 사용한 서비스 정리

### 1. GitHub (코드 저장 + 사이트 배포)
- 주소: https://github.com
- 계정: sodkem
- 역할: 코드 저장소(레포) + GitHub Pages로 무료 웹호스팅
- 레포 이름: jusik
- 배포 설정: Settings → Pages → Branch: main

### 2. Cloudflare Workers (데이터 중계 서버)
- 주소: https://dash.cloudflare.com
- 계정: sodkem93@gmail.com
- 역할: Yahoo Finance API를 브라우저에서 직접 못 불러오는 문제(CORS) 해결
- Worker 이름: shiny-mud-4976
- Worker URL: https://shiny-mud-4976.sodkem93.workers.dev
- 무료 한도: 하루 10만 요청 (방문자 수천 명 수준에서는 충분)

### 3. Yahoo Finance API (주식 데이터)
- API 키 없이 무료로 사용
- 국내(KS), 미국, 일본(T), 중국(SS/SZ), 홍콩(HK) 주식 데이터 제공
- Cloudflare Worker를 통해 우회 호출

### 4. TradingView Lightweight Charts (차트 라이브러리)
- 오픈소스 무료 캔들스틱 차트 라이브러리
- CDN 주소: https://unpkg.com/lightweight-charts@4.1.3/

---

## 사이트 구조

```
왼쪽: 메뉴 (차트 / 시뮬레이터 전환)
가운데: 종목 검색 + 캔들스틱 차트
오른쪽: 시가총액 순위 Top 20 (한국/미국/중국/일본)
```

## 기능 요약

### 차트
- **종목명 검색**: 한글/영어로 종목명 입력 → 자동완성 드롭다운 표시
  - 한국/미국/일본/중국/홍콩 주요 80종목은 즉시 검색
  - 그 외 종목은 Yahoo Finance 검색 API 사용
- **캔들 종류 선택**: 분봉 (1/3/5/10/15/30분) / 일봉 / 주봉 / 월봉 / 년봉
  - 분봉: 기간 선택 가능
  - 일봉~년봉: 주식 생성일부터 전체 이력 표시
- **가격 표시**: 한국 주식은 "74,600원", 미국은 "$195.20" 형식
- **날짜 표시**: "2026년 10월 23일" 한국식 포맷
- **최고/최저 가격선**: 현재 보이는 구간의 최고·최저가 점선 표시
- **오른쪽 스크롤 제한**: 미래 빈 화면으로 드래그 방지
- **시가총액 순위 클릭** → 해당 종목 차트 자동 로딩

### 시뮬레이터
- 첫 매수가 + 수량 입력
- 추가 매수 단계 추가 (하락률 % 기준)
- 평균 매수단가, 총 투자금액, 손익 자동 계산
- 손절가 / 목표가 시나리오 분석

---

## 코드 수정 후 배포 방법

파일 수정 후 터미널(PowerShell)에서:

```
cd "C:\Users\D\OneDrive\ドキュメント\stock-sim"
git add .
git commit -m "수정 내용 설명"
git push
```

push 후 1~2분 기다리면 사이트에 자동 반영됨.

> **CDN 캐시 문제가 생기면?**  
> index.html의 `<script src="script.js?v=X">` 에서 숫자를 하나 올려서 commit & push하면 강제 갱신됨.

---

## 파일 구조

```
stock-sim/
  index.html  — 페이지 HTML 구조
  style.css   — 디자인/레이아웃
  script.js   — 주식 데이터 로딩, 차트, 계산 로직
  README.md   — 이 파일
```
