/*
  제품(작품) 상세 데이터 — 누끼 1200x1600 폴더 기준.
  각 항목의 main/left/right 파일명은 images/products/ 안에 있어야 합니다.
  없는 각도는 그냥 생략하면 상세 페이지에서 자동으로 빠집니다.
  배열 순서 = Index 페이지 그리드 표시 순서입니다.

  새 제품을 추가하려면:
  1) images/products/ 폴더에 사진을 넣고
  2) 아래 배열에 한 줄 추가하면 끝
*/
const PRODUCTS = [
  {
    id: "mini01",
    number: "03",
    kr: "裁斷_미니01",
    en: "JAE-DAN_MINI_01",
    size: "12 x 10 x 14.5 cm",
    material: "Black glazed<br>Stoneware",
    main: "mini01-main.png",
    left: "mini01-left.png",
    right: "mini01-right.png",
  },
  {
    id: "mini02",
    number: "04",
    kr: "裁斷_미니02",
    en: "JAE-DAN_MINI_02",
    size: "14 x 10 x 14 cm",
    material: "Black glazed<br>Stoneware",
    main: "mini02-main.png",
    left: "mini02-left.png",
    right: "mini02-right.png",
  },
  {
    id: "jaedan01",
    number: "01",
    kr: "裁斷_01",
    en: "JAE-DAN_01",
    size: "16 x 11.5 x 26 cm",
    material: "Black glazed<br>Stoneware",
    main: "jaedan01-main.png",
    left: "jaedan01-left.png",
    right: "jaedan01-right.png",
  },
  {
    id: "stud",
    number: "02",
    kr: "裁斷_스터드",
    en: "JAE-DAN_STUD",
    size: "15.5 x 15.5 x 18 cm",
    material: "Black glazed<br>Stoneware",
    main: "stud-main.png",
    left: "stud-left.png",
    right: "stud-right.png",
  },
  {
    id: "lock",
    number: "07",
    kr: "裁斷_자물쇠",
    en: "JAE-DAN_LOCK",
    size: "20 x 20 x 25.5 cm",
    material: "Black glazed<br>Stoneware",
    main: "lock-main.png",
    right: "lock-right.png",
  },
  {
    id: "key",
    number: "06",
    kr: "裁斷_열쇠",
    en: "JAE-DAN_KEY",
    size: "18 x 18 x 24 cm",
    material: "Black glazed<br>Stoneware",
    main: "key-main.png",
    right: "key-right.png",
  },
  {
    id: "cuboid",
    number: "05",
    kr: "裁斷_직육면체",
    en: "JAE-DAN_CUBOID",
    enDisplay: "JAE-DAN<br>_CUBOID",
    size: "10 x 7.5 x 17 cm",
    material: "Black glazed<br>Stoneware",
    main: "cuboid-main.png",
    left: "cuboid-left.png",
    right: "cuboid-right.png",
  },
  {
    id: "dot",
    number: "08",
    kr: "裁斷_도트",
    en: "JAE-DAN_DOT",
    size: "9 x 6 x 4 cm",
    material: "Black glazed<br>Stoneware",
    main: "dot-main.png",
    left: "dot-left.png",
    right: "dot-right.png",
  },
];
