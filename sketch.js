let clouds = []; // 儲存雲的位置和生成時間
let introButton; // 按鈕變數
let videoButton; // 教學影片按鈕變數
let videoDiv; // 用於儲存影片視窗的變數
let portfolioDiv; // 用於儲存作品集視窗的變數
let quizDiv; // 用於儲存測驗卷視窗的變數
let notesDiv; // 用於儲存筆記視窗的變數
let bats = []; // 儲存蝙蝠的位置和大小
let skulls = []; // 儲存骷髏頭的位置和生成時間

function setup() {
  createCanvas(windowWidth, windowHeight);

  // 建立自我介紹按鈕
  introButton = createButton('自我介紹');
  introButton.position(10, 10); // 設定按鈕位置
  introButton.style('width', '120px'); // 設定按鈕寬度
  introButton.style('height', '50px'); // 設定按鈕高度
  introButton.style('font-size', '20px'); // 設定字體大小
  introButton.mousePressed(showIntro); // 綁定按鈕點擊事件

  // 建立教學影片按鈕
  videoButton = createButton('教學影片');
  videoButton.position(10, 70); // 設定按鈕位置（在自我介紹按鈕下方）
  videoButton.style('width', '120px'); // 設定按鈕寬度
  videoButton.style('height', '50px'); // 設定按鈕高度
  videoButton.style('font-size', '20px'); // 設定字體大小
  videoButton.mousePressed(showVideo); // 綁定按鈕點擊事件

  // 建立作品集按鈕
  let portfolioButton = createButton('作品集');
  portfolioButton.position(10, 130);
  portfolioButton.style('width', '120px');
  portfolioButton.style('height', '50px');
  portfolioButton.style('font-size', '20px');
  portfolioButton.mousePressed(showPortfolio);

  // 建立測驗卷按鈕
  let quizButton = createButton('測驗卷');
  quizButton.position(10, 190);
  quizButton.style('width', '120px');
  quizButton.style('height', '50px');
  quizButton.style('font-size', '20px');
  quizButton.mousePressed(showQuiz);

  // 建立筆記按鈕
  let notesButton = createButton('筆記');
  notesButton.position(10, 250); // 設定按鈕位置（在測驗卷按鈕下方）
  notesButton.style('width', '120px');
  notesButton.style('height', '50px');
  notesButton.style('font-size', '20px');
  notesButton.mousePressed(showNotes);

  // 初始化蝙蝠
  generateBats();
}

function draw() {
  background('#362c7a'); // 修改背景顏色為 #362c7a
  
  // 繪製所有雲
  let currentTime = millis();
  clouds = clouds.filter(cloud => currentTime - cloud.time < 2000);
  for (let cloud of clouds) {
    let elapsed = currentTime - cloud.time;
    let alpha = map(elapsed, 1000, 2000, 255, 0);
    alpha = constrain(alpha, 0, 255);
    drawCloud(cloud.x, cloud.y, alpha);
  }

  // 繪製南瓜和臉
  drawPumpkinsWithFaces();

  // 繪製墓碑
  drawGravestones();

  // 繪製右上角的月亮和烏雲
  drawMoonAndClouds();

  // 繪製蝙蝠
  drawBats();

  // 繪製幽靈
  drawGhosts();

  // 繪製蜘蛛網
  drawSpiderWebs();

  // 繪製骷髏頭
  drawSkulls();
}

function drawPumpkins() {
  let pumpkinSize = 50; // 南瓜大小
  let spacing = 20; // 南瓜間距
  let startX = spacing; // 起始 X 座標
  let y = height - pumpkinSize - 10; // 南瓜 Y 座標（靠近畫布底部）

  for (let x = startX; x < width - pumpkinSize; x += pumpkinSize + spacing) {
    drawPumpkin(x, y, pumpkinSize);
  }
}

function drawPumpkin(x, y, size) {
  noStroke();
  fill('#ff6c0a'); // 南瓜顏色
  ellipse(x, y, size, size); // 南瓜主體
  ellipse(x - size / 4, y, size / 1.5, size); // 左側圓
  ellipse(x + size / 4, y, size / 1.5, size); // 右側圓

  // 繪製南瓜的梗
  fill('#3d2b1f'); // 梗的顏色
  rect(x - size / 10, y - size / 1.5, size / 5, size / 3, 5); // 梗
}

function drawPumpkinsWithFaces() {
  let pumpkinSize = 50; // 南瓜大小
  let spacing = 20; // 南瓜間距
  let startX = spacing; // 起始 X 座標
  let y = height - pumpkinSize - 10; // 南瓜 Y 座標（靠近畫布底部）

  for (let x = startX; x < width - pumpkinSize; x += pumpkinSize + spacing) {
    drawPumpkin(x, y, pumpkinSize); // 繪製南瓜
    drawPumpkinFace(x, y, pumpkinSize); // 繪製南瓜臉
  }
}

function drawPumpkinFace(x, y, size) {
  fill('#ffcc00'); // 臉的顏色
  triangle(x - size / 6, y - size / 6, x - size / 8, y - size / 8, x - size / 4, y - size / 8); // 左眼
  triangle(x + size / 6, y - size / 6, x + size / 8, y - size / 8, x + size / 4, y - size / 8); // 右眼
  arc(x, y + size / 8, size / 2, size / 4, 0, PI, CHORD); // 嘴巴
}

function drawGravestones() {
  let gravestoneWidth = 40; // 墓碑寬度
  let gravestoneHeight = 60; // 墓碑高度
  let startX = 70; // 起始 X 座標
  let y = height - 150; // 墓碑 Y 座標（在南瓜上方，避免擋住南瓜）

  // 墓碑的 X 座標間距（每個墓碑的間距不同）
  let spacings = [50, 70, 90, 60, 80];

  for (let i = 0; i < 5; i++) {
    let x = startX; // 計算每個墓碑的 X 座標
    drawGravestone(x, y);
    startX += gravestoneWidth + spacings[i]; // 更新起始 X 座標，間距不同
  }
}

function drawGravestone(x, y) {
  noStroke();
  fill('#696d7d'); // 墓碑顏色
  rect(x, y, 40, 60, 10); // 墓碑主體（帶圓角）
  arc(x + 20, y, 40, 40, PI, TWO_PI); // 墓碑頂部的圓弧
}

function drawMoonAndClouds() {
  // 繪製月亮
  noStroke();
  fill('#fdfd96'); // 月亮顏色（淡黃色）
  ellipse(width - 120, 120, 150, 150); // 月亮位置和大小（加大）

  // 繪製烏雲
  drawCloud(width - 200, 100, 255, 'rgba(36, 45, 75, 1)'); // 烏雲1（左側）
  drawCloud(width - 60, 140, 255, 'rgba(36, 45, 75, 1)');  // 烏雲2（右側）
  drawCloud(width - 150, 180, 255, 'rgba(36, 45, 75, 1)'); // 烏雲3（下方）
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  // 檢查滑鼠是否點擊在按鈕上
  let buttonX = introButton.position().x;
  let buttonY = introButton.position().y;
  let buttonWidth = parseInt(introButton.style('width'));
  let buttonHeight = parseInt(introButton.style('height'));

  if (
    mouseX > buttonX &&
    mouseX < buttonX + buttonWidth &&
    mouseY > buttonY &&
    mouseY < buttonY + buttonHeight
  ) {
    return; // 如果點擊在按鈕上，直接返回
  }

  // 儲存骷髏頭的位置和生成時間
  skulls.push({ x: mouseX, y: mouseY, time: millis() });
}

function drawCloud(x, y, alpha, color) {
  noStroke();
  fill(color); // 設定顏色（不需要透明度，因為 p5.js 的 fill 不支援直接傳遞透明度）
  ellipse(x, y, 70, 70); // 中心圓
  ellipse(x - 40, y + 15, 60, 60); // 左側圓
  ellipse(x + 40, y + 15, 60, 60); // 右側圓
}

function drawBat(x, y, size) {
  noStroke();
  fill('#000000'); // 蝙蝠顏色
  ellipse(x, y, size, size / 2); // 蝙蝠身體
  triangle(x - size / 2, y, x - size, y - size / 2, x - size / 2, y - size / 4); // 左翅膀
  triangle(x + size / 2, y, x + size, y - size / 2, x + size / 2, y - size / 4); // 右翅膀
}

function drawBats() {
  for (let bat of bats) {
    drawBat(bat.x, bat.y, bat.size);
  }
}

function generateBats() {
  bats = []; // 清空之前的蝙蝠
  let batCount = floor(random(3, 10)); // 隨機生成 3 到 10 隻蝙蝠
  for (let i = 0; i < batCount; i++) {
    let x = random(width);
    let y = random(height / 2); // 蝙蝠在畫布上半部
    let size = random(20, 40); // 蝙蝠大小
    bats.push({ x, y, size }); // 儲存蝙蝠資訊
  }
  console.log(bats); // 測試：輸出蝙蝠資訊到控制台
}

// 顯示自我介紹訊息
function showIntro() {
  // 顯示自訂視窗
  let introDiv = createDiv('大家好，我是淡江教科B班的謝欣妤');
  introDiv.style('position', 'absolute');
  introDiv.style('top', '50%');
  introDiv.style('left', '50%');
  introDiv.style('transform', 'translate(-50%, -50%)');
  introDiv.style('background-color', 'white');
  introDiv.style('padding', '20px');
  introDiv.style('border', '2px solid black');
  introDiv.style('font-size', '20px');
  introDiv.style('text-align', 'center');
  introDiv.style('z-index', '10');

  // 加入關閉按鈕
  let closeButton = createButton('關閉');
  closeButton.parent(introDiv);
  closeButton.style('margin-top', '10px');
  closeButton.mousePressed(() => {
    introDiv.remove(); // 移除視窗
  });
}

function showVideo() {
  // 如果影片視窗已存在，則移除
  if (videoDiv) {
    videoDiv.remove();
    videoDiv = null; // 重置變數
    return;
  }

  // 顯示影片視窗
  videoDiv = createDiv();
  videoDiv.style('position', 'absolute');
  videoDiv.style('top', '50%');
  videoDiv.style('left', '50%');
  videoDiv.style('transform', 'translate(-50%, -50%)');
  videoDiv.style('background-color', 'white');
  videoDiv.style('padding', '20px');
  videoDiv.style('border', '2px solid black');
  videoDiv.style('z-index', '10');

  // 新增 iframe 播放影片
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://cfchen58.synology.me/%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%882024/B2/week4/20250310_093748.mp4');
  iframe.attribute('width', '640');
  iframe.attribute('height', '360');
  iframe.attribute('frameborder', '0');
  iframe.attribute('allowfullscreen', true);
  iframe.parent(videoDiv);

  // 加入關閉按鈕
  let closeButton = createButton('關閉');
  closeButton.parent(videoDiv);
  closeButton.style('margin-top', '10px');
  closeButton.mousePressed(() => {
    videoDiv.remove(); // 移除視窗
    videoDiv = null; // 重置變數
  });
}

function showPortfolio() {
  // 如果作品集視窗已存在，則移除
  if (portfolioDiv) {
    portfolioDiv.remove();
    portfolioDiv = null;
    return;
  }

  // 顯示作品集視窗
  portfolioDiv = createDiv();
  portfolioDiv.style('position', 'absolute');
  portfolioDiv.style('top', '50%');
  portfolioDiv.style('left', '50%');
  portfolioDiv.style('transform', 'translate(-50%, -50%)');
  portfolioDiv.style('background-color', 'white');
  portfolioDiv.style('padding', '20px');
  portfolioDiv.style('border', '2px solid black');
  portfolioDiv.style('z-index', '10');
  portfolioDiv.style('text-align', 'center');

  // 新增第一個按鈕
  let firstButton = createButton('第一個');
  firstButton.parent(portfolioDiv);
  firstButton.style('margin', '10px');
  firstButton.mousePressed(() => showIframe('https://wonwoo-dog.github.io/20250303/'));

  // 新增第二個按鈕
  let secondButton = createButton('第二個');
  secondButton.parent(portfolioDiv);
  secondButton.style('margin', '10px');
  secondButton.mousePressed(() => showIframe('https://wonwoo-dog.github.io/20250324/'));

  // 新增第三個按鈕
  let thirdButton = createButton('第三個');
  thirdButton.parent(portfolioDiv);
  thirdButton.style('margin', '10px');
  thirdButton.mousePressed(() => showIframe('https://wonwoo-dog.github.io/20241107/'));

  // 加入關閉按鈕
  let closeButton = createButton('關閉');
  closeButton.parent(portfolioDiv);
  closeButton.style('margin-top', '10px');
  closeButton.mousePressed(() => {
    portfolioDiv.remove();
    portfolioDiv = null;
  });
}

function showIframe(url) {
  // 如果已有作品集視窗，則移除
  if (portfolioDiv) {
    portfolioDiv.remove();
    portfolioDiv = null;
  }

  // 顯示 iframe 視窗
  let iframeDiv = createDiv();
  iframeDiv.style('position', 'absolute');
  iframeDiv.style('top', '50%');
  iframeDiv.style('left', '50%');
  iframeDiv.style('transform', 'translate(-50%, -50%)');
  iframeDiv.style('background-color', 'white');
  iframeDiv.style('padding', '20px');
  iframeDiv.style('border', '2px solid black');
  iframeDiv.style('z-index', '10');

  let iframe = createElement('iframe');
  iframe.attribute('src', url);
  iframe.attribute('width', '640');
  iframe.attribute('height', '360');
  iframe.attribute('frameborder', '0');
  iframe.attribute('allowfullscreen', true);
  iframe.parent(iframeDiv);

  // 加入關閉按鈕
  let closeButton = createButton('關閉');
  closeButton.parent(iframeDiv);
  closeButton.style('margin-top', '10px');
  closeButton.mousePressed(() => {
    iframeDiv.remove();
  });
}

function showQuiz() {
  // 如果測驗卷視窗已存在，則移除
  if (quizDiv) {
    quizDiv.remove();
    quizDiv = null;
    return;
  }

  // 顯示測驗卷視窗
  quizDiv = createDiv();
  quizDiv.style('position', 'absolute');
  quizDiv.style('top', '50%');
  quizDiv.style('left', '50%');
  quizDiv.style('transform', 'translate(-50%, -50%)');
  quizDiv.style('background-color', 'white');
  quizDiv.style('padding', '20px');
  quizDiv.style('border', '2px solid black');
  quizDiv.style('z-index', '10');

  // 新增 iframe 顯示測驗卷
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://wonwoo-dog.github.io/-/'); // 測驗卷的 URL
  iframe.attribute('width', '640');
  iframe.attribute('height', '360');
  iframe.attribute('frameborder', '0');
  iframe.attribute('allowfullscreen', true);
  iframe.parent(quizDiv);

  // 加入關閉按鈕
  let closeButton = createButton('關閉');
  closeButton.parent(quizDiv);
  closeButton.style('margin-top', '10px');
  closeButton.mousePressed(() => {
    quizDiv.remove();
    quizDiv = null;
  });
}

// 確保所有函式都正確關閉
function showNotes() {
  // 如果筆記視窗已存在，則移除
  if (notesDiv) {
    notesDiv.remove();
    notesDiv = null;
    return;
  }

  // 顯示筆記視窗
  notesDiv = createDiv();
  notesDiv.style('position', 'absolute');
  notesDiv.style('top', '50%');
  notesDiv.style('left', '50%');
  notesDiv.style('transform', 'translate(-50%, -50%)');
  notesDiv.style('background-color', 'white');
  notesDiv.style('padding', '20px');
  notesDiv.style('border', '2px solid black');
  notesDiv.style('z-index', '10');

  // 新增 iframe 顯示筆記
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://hackmd.io/@ai41vxYwSkePBc_gUC36Bg/HJoUwttC1l'); // 筆記的 URL
  iframe.attribute('width', '640');
  iframe.attribute('height', '360');
  iframe.attribute('frameborder', '0');
  iframe.attribute('allowfullscreen', true);
  iframe.parent(notesDiv);

  // 加入關閉按鈕
  let closeButton = createButton('關閉');
  closeButton.parent(notesDiv);
  closeButton.style('margin-top', '10px');
  closeButton.mousePressed(() => {
    notesDiv.remove();
    notesDiv = null;
  });
} // 確保這裡有正確關閉函式

function drawGhost(x, y, size) {
  noStroke();
  fill(255, 255, 255, 200); // 幽靈顏色（半透明白色）
  ellipse(x, y, size, size * 1.2); // 幽靈頭部
  rect(x - size / 2, y, size, size / 2, 20); // 幽靈身體
  fill(0); // 黑色眼睛
  ellipse(x - size / 6, y - size / 6, size / 8, size / 8); // 左眼
  ellipse(x + size / 6, y - size / 6, size / 8, size / 8); // 右眼
  ellipse(x, y, size / 10, size / 10); // 嘴巴
}

function drawGhosts() {
  let ghostCount = 3; // 幽靈數量
  for (let i = 0; i < ghostCount; i++) {
    let x = random(width);
    let y = random(height / 2, height - 100); // 幽靈在畫布中下部
    let size = random(40, 60); // 幽靈大小
    drawGhost(x, y, size);
  }
}

function drawSkulls() {
  let currentTime = millis(); // 獲取當前時間
  skulls = skulls.filter(skull => currentTime - skull.time < 1000); // 保留未超過1秒的骷髏頭

  for (let skull of skulls) {
    let elapsed = currentTime - skull.time; // 計算骷髏頭存在的時間
    let alpha = map(elapsed, 0, 1000, 255, 0); // 1秒內逐漸淡化
    alpha = constrain(alpha, 0, 255); // 確保透明度在 0 到 255 之間
    drawSkull(skull.x, skull.y, alpha);
  }
}

function drawSkull(x, y, alpha) {
  noStroke();
  fill(255, 255, 255, alpha); // 骷髏頭顏色（白色，帶透明度）
  ellipse(x, y, 50, 60); // 骷髏頭主體
  fill(0, alpha); // 黑色眼睛
  ellipse(x - 10, y - 10, 10, 10); // 左眼
  ellipse(x + 10, y - 10, 10, 10); // 右眼
  rect(x - 15, y + 10, 30, 10, 5); // 嘴巴
}

function drawSpiderWeb(x, y, size) {
  stroke(255); // 白色蜘蛛網
  noFill();
  for (let i = 0; i < size; i += 10) {
    ellipse(x, y, i, i); // 同心圓
  }
  for (let angle = 0; angle < TWO_PI; angle += PI / 6) {
    let x2 = x + cos(angle) * size / 2;
    let y2 = y + sin(angle) * size / 2;
    line(x, y, x2, y2); // 放射線
  }
}

function drawSpiderWebs() {
  drawSpiderWeb(50, 50, 100); // 左上角蜘蛛網
  drawSpiderWeb(width - 50, 50, 100); // 右上角蜘蛛網
  drawSpiderWeb(width / 2, height / 2, 150); // 中央蜘蛛網
}
