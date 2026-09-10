// Index 페이지: 제품별 메인 이미지만 그리드로 표시, 클릭하면 상세 페이지로 이동
function renderIndexGrid(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof PRODUCTS === "undefined") return;

  container.innerHTML = PRODUCTS.map(
    (p) => `
      <a class="piece" href="/product?id=${p.id}">
        <div class="piece__frame">
          <img src="images/products/${p.main}" alt="T.q.T — ${p.en}" loading="lazy" />
        </div>
        <figcaption>
          <span class="piece__title-en">${p.en}</span>
          <span class="piece__title-kr">${p.kr}</span>
        </figcaption>
      </a>`
  ).join("");
}

// 제품 상세 페이지: main 중앙, 좌/우 옆, 뒷면(back/side)은 main 아래에 배치 (없는 각도는 자동으로 생략)
function renderProductDetail(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof PRODUCTS === "undefined") return;

  const id = new URLSearchParams(location.search).get("id");
  const p = PRODUCTS.find((item) => item.id === id) || PRODUCTS[0];
  if (!p) return;

  document.title = `${p.en} — T.q.T`;

  const slot = (key, cls) =>
    p[key] ? `<div class="product-layout__${cls}"><img src="images/products/${p[key]}" alt="T.q.T — ${p.en} (${key})" /></div>` : "";

  container.innerHTML = `
    <div class="product-layout">
      ${slot("left", "left")}
      ${slot("main", "main")}
      ${slot("right", "right")}
    </div>
    <div class="product-detail__caption">
      <div>
        <span class="piece__title-en">${p.en}</span>
        <span class="piece__title-kr">${p.kr}</span>
      </div>
      <div class="product-detail__specs">
        ${p.size ? `<span>${p.size}</span>` : ""}
        ${p.material ? `<span>${p.material}</span>` : ""}
      </div>
    </div>`;
}

// 같은 작품(group)이 이웃하지 않도록 배치 (빈도가 가장 높은 그룹부터 짝수 자리 → 홀수 자리 순으로 채움)
// 마지막→처음이 이어져 루프되므로, 그 이음매도 이웃으로 취급해 확인/보정한다.
function distributeByGroup(items) {
  const groups = {};
  items.forEach((item) => {
    const key = item.group || item.file;
    (groups[key] = groups[key] || []).push(item);
  });

  const sorted = Object.values(groups).sort((a, b) => b.length - a.length);
  const n = items.length;
  const result = new Array(n);
  let idx = 0;
  sorted.forEach((list) => {
    list.forEach((item) => {
      if (idx >= n) idx = 1;
      result[idx] = item;
      idx += 2;
    });
  });

  // 루프 이음매(마지막-처음)가 같은 그룹이면, 다른 그룹의 항목과 한 번 자리를 바꿔 보정
  if (n > 2 && result[0].group === result[n - 1].group) {
    const swapIdx = result.findIndex(
      (item, j) =>
        j > 0 &&
        j < n - 1 &&
        item.group !== result[0].group &&
        item.group !== result[n - 2].group
    );
    if (swapIdx !== -1) [result[n - 1], result[swapIdx]] = [result[swapIdx], result[n - 1]];
  }

  return result;
}

function renderGallery(colUpId, colDownId) {
  const colUp = document.getElementById(colUpId);
  const colDown = document.getElementById(colDownId);
  if (!colUp || !colDown || typeof PRODUCTS === "undefined") return;

  // 제품별 main/left/right 사진을 전부 모아서(같은 제품은 group으로 묶임) 한 목록으로 구성
  const items = [];
  PRODUCTS.forEach((p) => {
    ["main", "left", "right"].forEach((slot) => {
      if (p[slot]) items.push({ group: p.id, file: p[slot] });
    });
  });

  // 짝/홀 번갈아 두 열로 나눈 뒤, 각 열 안에서 같은 제품이 이웃하지 않도록 배치
  const up = distributeByGroup(items.filter((_, i) => i % 2 === 0));
  const down = distributeByGroup(items.filter((_, i) => i % 2 === 1));

  // 무한 슬라이드는 transform으로 계속 이동하는 방식이라, lazy 로딩이 뷰포트 판정을 잘못해
  // 이미지를 영영 안 불러오는 경우가 있어 즉시 로드하도록 함
  const figure = (item) => `
    <figure>
      <img src="images/products/${item.file}" alt="T.q.T — ${item.group}" />
    </figure>`;

  // 끊김 없이 반복되도록 리스트를 두 번 이어붙임
  colUp.innerHTML = up.map(figure).join("") + up.map(figure).join("");
  colDown.innerHTML = down.map(figure).join("") + down.map(figure).join("");
}

// 배열 순서를 무작위로 섞음 (Fisher-Yates)
function shuffle(list) {
  const arr = list.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Archive 페이지: 전시/프레스 등 아카이브 사진을 가로 두 줄로, 매번 순서/배치/속도/시작 지점을 랜덤하게 섞어서 자동 슬라이드
function renderArchiveGrid(rowTopId, rowBottomId) {
  const rowTop = document.getElementById(rowTopId);
  const rowBottom = document.getElementById(rowBottomId);
  if (!rowTop || !rowBottom || typeof ARCHIVE_IMAGES === "undefined") return;

  const shuffled = shuffle(ARCHIVE_IMAGES);

  // 절반씩 최대한 균등하게 나눠서(순서는 매번 랜덤) 같은 줄 안에서 사진이 너무 자주 반복되지 않도록 함
  const mid = Math.ceil(shuffled.length / 2);
  const top = shuffled.slice(0, mid);
  const bottom = shuffled.slice(mid);

  // 무한 슬라이드는 transform으로 계속 이동하는 방식이라, lazy 로딩이 뷰포트 판정을 잘못해
  // 이미지를 영영 안 불러오는 경우가 있어 즉시 로드하도록 함
  const figure = (file) => `
    <figure><img src="images/archive/${file}" alt="T.q.T archive" /></figure>`;

  // 끊김 없이 반복되도록 각 줄의 리스트를 두 번 이어붙임
  rowTop.innerHTML = top.map(figure).join("") + top.map(figure).join("");
  rowBottom.innerHTML = bottom.map(figure).join("") + bottom.map(figure).join("");

  // 두 줄이 같은 리듬으로 딱 맞물려 움직이지 않도록 속도와 시작 지점도 랜덤하게
  [rowTop, rowBottom].forEach((track) => {
    const duration = 40 + Math.random() * 25; // 40~65초
    const delay = -Math.random() * duration; // 임의의 지점에서 시작
    track.style.animationDuration = `${duration}s`;
    track.style.animationDelay = `${delay}s`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Contact 이메일: 메일 앱이 없는 환경에서도 주소를 바로 쓸 수 있도록 클릭 시 클립보드에 복사
  const emailLink = document.getElementById("contactEmail");
  const emailHint = document.getElementById("contactEmailHint");
  if (emailLink && emailHint) {
    emailLink.addEventListener("click", () => {
      const address = emailLink.textContent.trim();
      navigator.clipboard
        ?.writeText(address)
        .then(() => {
          emailHint.textContent = "Copied to clipboard";
          setTimeout(() => {
            emailHint.textContent = "";
          }, 2500);
        })
        .catch(() => {});
    });
  }
});
