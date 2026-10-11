/* ============================================================
   学习馆 · 情境插图库（KIDS.pic）
   内容里用 { t:"say", text:"...", pic:"coins" } 就能插一张场景图。
   都是纯 SVG，跟着画布自动放大；颜色用主题变量，深浅色都好看。
   现有场景：
     students   小朋友排队（序数）
     sticks     一捆小棒 + 几根散的
     place      数位表（千 百 十 个）
     bigsys     数位台阶（10 → 100 → 1000 → 10000）
     scale      天平比大小（38 vs 42）
     thermometer 温度计（0 刻度、负温度）
     lift       电梯按钮（含 -1 -2 层）
     coins      人民币硬币（1元 / 5角 / 1角）
     market     货架与标价牌
     dotsarray  点子阵列（4 行 3 列）
     cake       蛋糕切四份（等分）
     choco      巧克力分块（分数）
     clock      钟表盘（整时）
     cubes      小方块堆（体积）
     ruler      尺子与铅笔（长度）
     scoreboard 比赛记分牌（连加）
     cny10      元角分的换算（1元 = 10角）
     frame      相框与花边（周长情境）
     walk       小蚂蚁沿着边走一圈（周长）
     span       用手量课桌（一拃不一样长）
     meter      米尺：1 米 = 100 厘米
     units      长度单位家族（×10 / ×1000）
     est        估一估：比 1 米长还是短
     line       画一条 6 厘米的线段
     km         操场跑道：2 圈半 = 1 千米
     classroom  教室有多长（选一种工具）
     desk       同一张课桌：4 支铅笔长 / 5 拃长
     handinhand 手拉手：10 米 / 100 米
   ============================================================ */
window.KIDS = window.KIDS || { W: {}, ART: {}, pic: {} };
(function(){
"use strict";
const PIC = {};
const S = (inner, w, h) =>
  '<svg viewBox="0 0 ' + (w || 660) + ' ' + (h || 270) + '" style="width:100%;height:auto;display:block" role="img">' + inner + '</svg>';
const GROUND = (y) => '<line x1="30" y1="' + y + '" x2="630" y2="' + y + '" stroke="var(--line)" stroke-width="2"/>';
const T = (x, y, s, size, fill, anchor, weight) =>
  '<text x="' + x + '" y="' + y + '" font-size="' + (size || 16) + '" fill="' + (fill || "var(--muted)") +
  '" text-anchor="' + (anchor || "middle") + '"' + (weight ? ' font-weight="' + weight + '"' : "") + '>' + s + '</text>';
function kid(x, y, color, hl, label){
  return '<g>' +
    '<circle cx="' + x + '" cy="' + (y - 52) + '" r="17" fill="' + color + '"/>' +
    '<path d="M' + (x - 16) + ' ' + (y - 30) + ' q16 -8 32 0 l6 46 q-22 8 -44 0 z" fill="' + color + '"/>' +
    (hl ? '<rect x="' + (x - 24) + '" y="' + (y - 82) + '" width="48" height="7" rx="3.5" fill="var(--accent)"/>' +
          T(x, y + 40, label || "", 17, "var(--accent)", "middle", "700") : T(x, y + 40, label || "", 15)) +
  '</g>';
}
function coin(cx, cy, r, label, color){
  return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + color + '" opacity=".9"/>' +
    '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r - 7) + '" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>' +
    T(cx, cy + 7, label, 19, "#fff", "middle", "700");
}

/* 小朋友排队 */
PIC.students = () => S(
  GROUND(232) +
  [0, 1, 2, 3, 4].map(function(i){
    const hl = i === 2;
    return kid(100 + i * 115, 232, hl ? "var(--accent)" : ["#f0a63c", "#6fc7d4", "#9aa7f0", "#e19bc0"][i % 4], hl, "第 " + (i + 1) + " 个");
  }).join("") +
  T(330, 34, "从前往后数，第 3 个是乐乐 —— 那她前面有几个人？", 18, "var(--text)", "middle", "600")
);

/* 一捆小棒 + 散的 */
PIC.sticks = () => S(
  GROUND(226) +
  '<rect x="50" y="70" width="96" height="156" rx="14" fill="var(--line2)" stroke="var(--accent)" stroke-width="2.5"/>' +
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function(i){
    return '<line x1="' + (60 + i * 8.6) + '" y1="80" x2="' + (60 + i * 8.6) + '" y2="216" stroke="var(--accent)" stroke-width="4"/>';
  }).join("") +
  T(98, 250, "10 根捆成一捆 = 1 个十", 16, "var(--accent)", "middle", "700") +
  [0, 1, 2].map(function(i){
    return '<line x1="' + (250 + i * 30) + '" y1="106" x2="' + (250 + i * 30) + '" y2="226" stroke="var(--warm)" stroke-width="6" stroke-linecap="round"/>';
  }).join("") +
  T(280, 250, "3 根", 16, "var(--warm)", "middle", "700") +
  T(470, 130, "合起来是 13", 26, "var(--text)", "middle", "700") +
  T(470, 166, "= 1 个十 + 3 个一", 17)
);

/* 数位表 */
PIC.place = () => S(
  ["千", "百", "十", "个"].map(function(h, i){
    const x = 120 + i * 110;
    return '<rect x="' + (x - 45) + '" y="70" width="90" height="120" rx="14" fill="var(--panel2)" stroke="var(--line)" stroke-width="2"/>' +
      T(x, 56, h + "位", 17, "var(--muted)", "middle", "600") +
      T(x, 144, ["4", "6", "5", "3"][i], 46, i === 1 ? "var(--accent)" : "var(--text)", "middle", "700");
  }).join("") +
  T(330, 232, "4653：6 在百位上，表示 6 个百 = 600", 20, "var(--text)", "middle", "600") +
  T(330, 260, "同一个数字，站的位置不同，表示的大小就不一样", 15)
);

/* 数位台阶 */
PIC.bigsys = () => S(
  [["10", 1], ["100", 2], ["1000", 3], ["10000", 4]].map(function(p, i){
    const h = 40 + i * 44, x = 60 + i * 150;
    return '<rect x="' + x + '" y="' + (234 - h) + '" width="120" height="' + h + '" rx="12" fill="' +
      ["var(--soft)", "var(--warmbg)", "var(--soft)", "var(--warmbg)"][i] + '" stroke="var(--line)" stroke-width="2"/>' +
      T(x + 60, 234 - h - 12, p[0], 20, "var(--accent)", "middle", "700") +
      T(x + 60, 258, p[1] === 4 ? "一万" : "", 14);
  }).join("") +
  GROUND(234) +
  T(330, 30, "一个一个数太慢 → 十个十是一百 → 十个一百是一千 → 十个一千是一万", 17, "var(--text)", "middle", "600")
);

/* 天平比大小 */
PIC.scale = () => S(
  '<line x1="330" y1="90" x2="330" y2="232" stroke="var(--muted)" stroke-width="6"/>' +
  '<polygon points="306,232 354,232 330,206" fill="var(--muted)"/>' +
  '<g transform="rotate(9 330 96)"><line x1="130" y1="96" x2="530" y2="96" stroke="var(--text)" stroke-width="7" stroke-linecap="round"/></g>' +
  '<line x1="150" y1="104" x2="150" y2="150" stroke="var(--muted)" stroke-width="3"/>' +
  '<line x1="510" y1="130" x2="510" y2="176" stroke="var(--muted)" stroke-width="3"/>' +
  '<rect x="100" y="150" width="100" height="56" rx="12" fill="var(--soft)" stroke="var(--accent)" stroke-width="2.5"/>' +
  T(150, 188, "38", 28, "var(--accent)", "middle", "700") +
  '<rect x="460" y="176" width="100" height="56" rx="12" fill="var(--warmbg)" stroke="var(--warm)" stroke-width="2.5"/>' +
  T(510, 214, "42", 28, "var(--warm)", "middle", "700") +
  T(330, 262, "哪边重，哪边就往下沉 —— 42 比 38 大", 17, "var(--text)", "middle", "600")
);

/* 温度计 */
PIC.thermometer = () => S(
  '<rect x="292" y="40" width="34" height="170" rx="17" fill="var(--panel2)" stroke="var(--line)" stroke-width="2"/>' +
  '<circle cx="309" cy="228" r="26" fill="var(--no)" opacity=".85"/>' +
  '<rect x="302" y="128" width="14" height="86" rx="7" fill="var(--no)" opacity=".85"/>' +
  [["10", 62], ["0", 118], ["-10", 174]].map(function(t){
    return '<line x1="326" y1="' + t[1] + '" x2="346" y2="' + t[1] + '" stroke="var(--muted)" stroke-width="2"/>' +
      T(360, t[1] + 6, t[0] + " ℃", 16, t[0] === "0" ? "var(--accent)" : "var(--muted)", "start", t[0] === "0" ? "700" : "");
  }).join("") +
  '<line x1="270" y1="118" x2="600" y2="118" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="5 4" opacity=".7"/>' +
  T(470, 88, "比 0 低 3 度", 18, "var(--no)", "middle", "700") +
  T(470, 114, "写作 -3 ℃，读作「负三摄氏度」", 17, "var(--text)", "middle", "600") +
  T(330, 268, "0 是正数和负数的分界：0 上面是正，下面是负", 15)
);

/* 电梯按钮 */
PIC.lift = () => S(
  '<rect x="230" y="34" width="200" height="206" rx="22" fill="var(--panel2)" stroke="var(--line)" stroke-width="2.5"/>' +
  [["3", 0, 0], ["2", 1, 0], ["1", 0, 1], ["-1", 1, 1], ["-2", 0, 2]].map(function(b){
    const x = 262 + b[1] * 96, y = 60 + b[2] * 58;
    const neg = b[0][0] === "-";
    return '<circle cx="' + x + '" cy="' + y + '" r="24" fill="' + (neg ? "var(--soft)" : "var(--panel)") + '" stroke="' + (neg ? "var(--accent)" : "var(--line)") + '" stroke-width="2"/>' +
      T(x, y + 7, b[0], 18, neg ? "var(--accent)" : "var(--text)", "middle", "700");
  }).join("") +
  T(330, 262, "地下二层 = -2 层：带「-」就表示在地面以下", 17, "var(--text)", "middle", "600") +
  T(500, 130, "地面", 16, "var(--muted)", "middle", "600") +
  '<line x1="470" y1="146" x2="600" y2="146" stroke="var(--muted)" stroke-width="2" stroke-dasharray="5 4"/>'
);

/* 人民币硬币 */
PIC.coins = () => S(
  coin(120, 150, 52, "1元", "var(--accent)") +
  coin(250, 150, 44, "5角", "var(--warm)") +
  coin(356, 150, 40, "1角", "var(--mea, var(--accent2))") +
  T(240, 244, "1 元 = 10 角　1 角 = 10 分", 20, "var(--text)", "middle", "700") +
  T(240, 60, "买东西要用钱，钱里的数就是小数和分数的最好入口", 16, "var(--muted)", "middle") +
  T(520, 150, "1.11 元", 24, "var(--accent)", "middle", "700") +
  T(520, 178, "= 1 元 1 角 1 分", 16)
);

/* 货架与标价牌 */
PIC.market = () => S(
  GROUND(220) +
  [["铅笔", "8 角", 90], ["尺子", "1.2 元", 250], ["牛奶", "3.5 元", 410]].map(function(it){
    const x = it[2];
    return '<rect x="' + (x - 40) + '" y="80" width="80" height="140" rx="10" fill="var(--panel2)" stroke="var(--line)" stroke-width="2"/>' +
      T(x, 250, it[0], 17, "var(--text)", "middle", "600") +
      '<rect x="' + (x - 52) + '" y="52" width="104" height="34" rx="8" fill="var(--warmbg)" stroke="var(--warm)" stroke-width="2"/>' +
      T(x, 76, it[1], 17, "var(--warm)", "middle", "700");
  }).join("") +
  T(560, 150, "8 角 = 0.8 元", 16, "var(--muted)", "middle", "600") +
  T(560, 178, "1.2 元 = 1 元 2 角", 16, "var(--muted)", "middle", "600")
);

/* 点子阵列 */
PIC.dotsarray = () => S(
  '<rect x="150" y="50" width="360" height="180" rx="18" fill="var(--panel2)" stroke="var(--line)" stroke-width="2"/>' +
  [0, 1, 2, 3].map(function(r){
    return [0, 1, 2].map(function(c){
      return '<circle cx="' + (196 + c * 60) + '" cy="' + (96 + r * 36) + '" r="13" fill="var(--accent)" opacity="' + (0.5 + 0.12 * r) + '"/>';
    }).join("");
  }).join("") +
  T(330, 252, "每行 3 个，一共 4 行 → 4 个 3 相加 = 4 × 3 = 12", 18, "var(--text)", "middle", "600") +
  T(560, 140, "3 + 3 + 3 + 3", 16, "var(--warm)", "middle", "700")
);

/* 蛋糕切四份 */
PIC.cake = () => S(
  '<circle cx="200" cy="140" r="86" fill="var(--warmbg)" stroke="var(--warm)" stroke-width="3"/>' +
  '<path d="M200 140 L200 54 A86 86 0 0 1 286 140 Z" fill="var(--accent)" opacity=".55"/>' +
  '<line x1="114" y1="140" x2="286" y2="140" stroke="var(--warm)" stroke-width="2.5"/>' +
  '<line x1="200" y1="54" x2="200" y2="226" stroke="var(--warm)" stroke-width="2.5"/>' +
  T(243, 108, "1", 20, "var(--accent)", "middle", "700") + T(243, 132, "4", 20, "var(--accent)", "middle", "700") +
  '<line x1="235" y1="114" x2="253" y2="126" stroke="var(--accent)" stroke-width="4"/>' +
  T(470, 120, "平均分成 4 份，每份是这块蛋糕的 1/4", 18, "var(--text)", "middle", "600") +
  T(470, 154, "3 份就是 3/4 —— 分数就是「把 1 个东西平均分」", 16) +
  T(470, 186, "分出来的每一份都一样大，才叫平均分", 16, "var(--muted)")
);

/* 巧克力分块 */
PIC.choco = () => S(
  [0, 1, 2, 3].map(function(r){
    return [0, 1].map(function(c){
      const eaten = (r === 0 && c === 1) || (r === 1 && c === 1);
      const x = 120 + c * 92, y = 60 + r * 46;
      return '<rect x="' + x + '" y="' + y + '" width="88" height="42" rx="8" fill="' + (eaten ? "var(--panel2)" : "var(--warm)") +
        '" stroke="var(--warm)" stroke-width="2" opacity="' + (eaten ? .6 : .95) + '"/>';
    }).join("");
  }).join("") +
  T(300, 250, "整块 8 小块，吃了 2 小块 —— 就是吃了 2/8", 18, "var(--text)", "middle", "600") +
  T(560, 140, "2/8 = 1/4", 20, "var(--accent)", "middle", "700")
);

/* 钟表 */
PIC.clock = () => {
  let ticks = "";
  for (let i = 0; i < 12; i++){
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    const x1 = 200 + Math.cos(a) * 76, y1 = 140 + Math.sin(a) * 76;
    const x2 = 200 + Math.cos(a) * 88, y2 = 140 + Math.sin(a) * 88;
    ticks += '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="var(--muted)" stroke-width="2.5"/>' +
      T(200 + Math.cos(a) * 64, 140 + Math.sin(a) * 64 + 6, String(i === 0 ? 12 : i), 15, "var(--text)", "middle", "600");
  }
  return S(
    '<circle cx="200" cy="140" r="104" fill="var(--panel)" stroke="var(--line)" stroke-width="3"/>' + ticks +
    '<line x1="200" y1="140" x2="262" y2="140" stroke="var(--accent)" stroke-width="7" stroke-linecap="round"/>' +
    '<line x1="200" y1="140" x2="200" y2="66" stroke="var(--text)" stroke-width="4.5" stroke-linecap="round"/>' +
    '<circle cx="200" cy="140" r="7" fill="var(--text)"/>' +
    T(470, 118, "时针指 3、分针指 12 → 正好 3 点整", 18, "var(--text)", "middle", "600") +
    T(470, 152, "3 点整，时针和分针正好组成直角", 17, "var(--accent)", "middle", "700") +
    T(470, 186, "钟面一圈分成 12 大格，一大格 = 5 分钟", 16, "var(--muted)")
  );
};

/* 小方块堆（体积） */
PIC.cubes = () => {
  const s = 46, dx = 30, dy = 20, x0 = 180, y0 = 226;
  let out = "";
  for (let z = 0; z < 2; z++) for (let x = 0; x < 2; x++) for (let y = 0; y < 2; y++){
    const X = x0 + x * s + y * 0 + z * 0, Y = y0 - z * s - y * 0;
    const px = X + (y ? dx : 0), py = Y - (y ? dy : 0);
    out += '<rect x="' + px + '" y="' + (py - s) + '" width="' + s + '" height="' + s + '" rx="5" fill="var(--soft)" stroke="var(--accent)" stroke-width="2" opacity="' + (0.7 + 0.12 * z) + '"/>';
  }
  return S(
    GROUND(230) +
    '<rect x="180" y="180" width="92" height="46" rx="6" fill="var(--soft)" stroke="var(--accent)" stroke-width="2"/>' +
    '<rect x="272" y="180" width="92" height="46" rx="6" fill="var(--soft)" stroke="var(--accent)" stroke-width="2"/>' +
    '<rect x="180" y="134" width="92" height="46" rx="6" fill="var(--soft)" stroke="var(--accent)" stroke-width="2"/>' +
    '<rect x="272" y="134" width="92" height="46" rx="6" fill="var(--soft)" stroke="var(--accent)" stroke-width="2"/>' +
    '<polygon points="180,134 210,110 302,110 272,134" fill="var(--line2)" stroke="var(--accent)" stroke-width="2"/>' +
    '<polygon points="272,134 302,110 302,156 272,180" fill="var(--line2)" stroke="var(--accent)" stroke-width="2" opacity=".9"/>' +
    T(520, 128, "每个小方块是 1 cm³", 17, "var(--text)", "middle", "600") +
    T(520, 158, "数一数里面有几个，就是多少 cm³", 16) +
    T(520, 196, "8 个小方块 = 8 cm³", 20, "var(--accent)", "middle", "700")
  );
};

/* 尺子与铅笔 */
PIC.ruler = () => {
  let t = "";
  for (let i = 0; i <= 10; i++){
    const x = 80 + i * 50;
    t += '<line x1="' + x + '" y1="150" x2="' + x + '" y2="' + (i % 5 === 0 ? 126 : 136) + '" stroke="var(--muted)" stroke-width="2"/>' +
      T(x, 176, String(i), 14, "var(--muted)", "middle");
  }
  return S(
    '<rect x="80" y="150" width="500" height="34" rx="8" fill="var(--line2)" stroke="var(--line)" stroke-width="2"/>' + t +
    '<rect x="130" y="96" width="350" height="26" rx="13" fill="var(--accent)"/>' +
    T(305, 78, "铅笔从刻度 1 量到刻度 8", 17, "var(--text)", "middle", "600") +
    T(305, 216, "8 − 1 = 7 厘米：量长度要看两头相差多少，不是看最后的数", 17, "var(--accent)", "middle", "700")
  );
};

/* 比赛记分牌 */
PIC.scoreboard = () => S(
  '<rect x="90" y="46" width="480" height="180" rx="18" fill="var(--panel2)" stroke="var(--line)" stroke-width="2.5"/>' +
  T(140, 86, "套圈比赛", 18, "var(--text)", "start", "700") +
  [["第 1 次", "24", "20"], ["第 2 次", "23", "25"], ["第 3 次", "30", "28"]].map(function(r, i){
    const y = 122 + i * 32;
    return T(150, y, r[0], 16, "var(--muted)", "start") + T(360, y, r[1], 18, "var(--accent)", "middle", "700") +
      T(500, y, r[2], 18, "var(--warm)", "middle", "700");
  }).join("") +
  T(360, 76, "淘气", 16, "var(--accent)", "middle", "700") + T(500, 76, "笑笑", 16, "var(--warm)", "middle", "700") +
  T(330, 254, "24 + 23 + 30 = 77（连加：一个一个加起来）", 17, "var(--text)", "middle", "600")
);

/* 元角分换算 */
PIC.cny10 = () => S(
  '<rect x="90" y="60" width="150" height="70" rx="12" fill="var(--accent)" opacity=".9"/>' +
  T(165, 106, "1 元", 24, "#fff", "middle", "700") +
  [0, 1, 2, 3, 4].map(function(i){
    return '<circle cx="' + (300 + (i % 3) * 76) + '" cy="' + (72 + Math.floor(i / 3) * 60) + '" r="26" fill="var(--warm)" opacity=".9"/>' +
      T(300 + (i % 3) * 76, 79 + Math.floor(i / 3) * 60, "1角", 14, "#fff", "middle", "700");
  }).join("") +
  T(396, 160, "…… 一共 10 个", 15, "var(--warm)", "middle") +
  T(560, 100, "1 元 = 10 角", 22, "var(--accent)", "middle", "700") +
  T(560, 140, "1 角 = 10 分", 22, "var(--accent)", "middle", "700") +
  T(560, 190, "1 元 = 100 分", 18, "var(--text)", "middle", "600") +
  T(330, 250, "元、角、分之间都是 ×10 —— 和小数的位值一模一样", 16, "var(--muted)", "middle")
);
/* 相框与花边（周长情境） */
PIC.frame = () => S(
  GROUND(232) +
  '<rect x="120" y="40" width="230" height="160" rx="8" fill="var(--soft)" stroke="var(--line)" stroke-width="3"/>' +
  '<rect x="146" y="66" width="178" height="108" rx="4" fill="var(--panel2)"/>' +
  '<circle cx="236" cy="112" r="26" fill="#ffd9a0"/>' +
  '<path d="M206 168 l24 -30 20 22 16 -18 28 34 z" fill="#9ec9a4"/>' +
  '<rect x="114" y="34" width="242" height="172" rx="10" fill="none" stroke="var(--accent)" stroke-width="5" stroke-dasharray="10 7"/>' +
  T(470, 92, "花边要贴满四条边", 19, "var(--text)", "middle", "600") +
  T(470, 126, "买多长才够呢？", 18, "var(--accent)", "middle", "700") +
  T(470, 164, "先量出「沿着边走一圈」的长度", 15, "var(--muted)", "middle")
);

/* 小蚂蚁沿着边走一圈（周长定义） */
PIC.walk = () => {
  const x = 140, y = 56, w = 250, h = 150;
  const pts = x + "," + y + " " + (x + w) + "," + y + " " + (x + w) + "," + (y + h) + " " + x + "," + (y + h);
  return S(
    '<polygon points="' + pts + '" fill="var(--soft)" stroke="var(--line)" stroke-width="2"/>' +
    '<path d="M' + x + " " + y + " H" + (x + w) + " V" + (y + h) + " H" + x + " V" + y + '" fill="none" stroke="var(--accent)" stroke-width="6" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="9 6"/>' +
    T(x + w / 2, y - 14, "4 厘米", 14, "var(--muted)") +
    T(x + w / 2, y + h + 24, "4 厘米", 14, "var(--muted)") +
    T(x - 12, y + h / 2 + 5, "3 厘米", 14, "var(--muted)", "end") +
    T(x + w + 12, y + h / 2 + 5, "3 厘米", 14, "var(--muted)", "start") +
    '<circle cx="' + x + '" cy="' + y + '" r="9" fill="var(--warm)"/>' +
    T(470, 96, "小蚂蚁从角上出发", 18, "var(--text)", "middle", "600") +
    T(470, 128, "沿着边一直走，再回到出发点", 17, "var(--text)", "middle", "600") +
    T(470, 166, "走过的长度 = 周长", 20, "var(--accent)", "middle", "700")
  );
};

/* 用手量课桌（一拃长度不一样） */
PIC.span = () => S(
  GROUND(238) +
  '<rect x="150" y="150" width="360" height="16" rx="4" fill="var(--soft)" stroke="var(--line)" stroke-width="2"/>' +
  '<rect x="170" y="166" width="14" height="72" fill="var(--line2)" stroke="var(--line)" stroke-width="2"/>' +
  '<rect x="476" y="166" width="14" height="72" fill="var(--line2)" stroke="var(--line)" stroke-width="2"/>' +
  [0, 1, 2, 3, 4].map(function(i){
    return '<path d="M' + (176 + i * 62) + ' 150 q18 -24 36 0" fill="none" stroke="var(--warm)" stroke-width="4.5" stroke-linecap="round"/>';
  }).join("") +
  T(330, 58, "小明用手量课桌：6 拃", 18, "var(--text)", "middle", "600") +
  T(330, 92, "小红也用手量：只有 4 拃", 18, "var(--accent)", "middle", "700") +
  T(330, 212, "同一张桌子，为什么数不一样？", 16, "var(--muted)", "middle")
);

/* 1 米有多长（米尺） */
PIC.meter = () => S(
  T(330, 62, "1 米 = 100 厘米", 21, "var(--accent)", "middle", "700") +
  '<rect x="70" y="120" width="520" height="30" rx="6" fill="var(--warmbg)" stroke="var(--warm)" stroke-width="2.5"/>' +
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(i){
    const x = 70 + i * 52;
    return '<line x1="' + x + '" y1="120" x2="' + x + '" y2="' + (i % 5 === 0 ? 100 : 110) + '" stroke="var(--warm)" stroke-width="2"/>' +
      (i % 5 === 0 ? T(x, 92, String(i * 10), 12.5, "var(--warm)", "middle", "600") : "");
  }).join("") +
  T(330, 190, "米尺上一共 100 个小格，每一小格就是 1 厘米", 16, "var(--muted)", "middle") +
  T(330, 220, "1 米大约比课桌高一点，差不多是你张开双臂那么宽", 15, "var(--muted)", "middle")
);

/* 长度单位家族（一路 ×10，只有米到千米 ×1000） */
PIC.units = () => {
  const names = ["毫米", "厘米", "分米", "米", "千米"];
  const factors = ["×10", "×10", "×10", "×1000"];
  let out = "";
  names.forEach(function(n, i){
    const x = 30 + i * 124, y = 96;
    out += '<rect x="' + x + '" y="' + y + '" width="92" height="46" rx="10" fill="' + (i >= 4 ? "var(--warmbg)" : "var(--soft)") +
      '" stroke="' + (i >= 4 ? "var(--warm)" : "var(--accent)") + '" stroke-width="2.2"/>' +
      T(x + 46, y + 30, n, 18, "var(--text)", "middle", "700");
    if (i < 4){
      out += T(x + 108, y + 8, factors[i], 13.5, "var(--warm)", "middle", "700") +
        '<line x1="' + (x + 96) + '" y1="' + (y + 23) + '" x2="' + (x + 122) + '" y2="' + (y + 23) + '" stroke="var(--warm)" stroke-width="2"/>' +
        '<polygon points="' + (x + 124) + ',' + (y + 23) + ' ' + (x + 116) + ',' + (y + 19) + ' ' + (x + 116) + ',' + (y + 27) + '" fill="var(--warm)"/>';
    }
  });
  return S(out +
    T(330, 52, "长度单位家族：一路 ×10，只有米到千米是 ×1000", 19, "var(--text)", "middle", "600") +
    T(330, 190, "1 千米 = 1000 米", 19, "var(--accent)", "middle", "700") +
    T(330, 222, "1 米 = 10 分米 = 100 厘米 = 1000 毫米", 16, "var(--muted)", "middle"), 660, 250);
};

/* 估一估：哪些比 1 米长 */
PIC.est = () => S(
  T(330, 44, "先想：1 米有多长？", 19, "var(--text)", "middle", "700") +
  ["橡皮", "铅笔", "课桌高", "教室门", "黑板"].map(function(nm, i){
    const x = 44 + i * 118;
    return '<rect x="' + x + '" y="90" width="96" height="76" rx="12" fill="var(--soft)" stroke="var(--accent)" stroke-width="2"/>' +
      T(x + 48, 136, nm, 16, "var(--text)", "middle", "700");
  }).join("") +
  T(330, 196, "哪些比 1 米长？哪些比 1 米短？", 17, "var(--accent)", "middle", "700") +
  T(330, 226, "1 米 ≈ 你张开双臂的宽度", 15, "var(--muted)", "middle"), 660, 250);

/* 画一条线段 */
PIC.line = () => {
  const pad = 70, s = 48, n = 10;
  let t = '<rect x="' + (pad - 6) + '" y="140" width="' + (n * s + 12) + '" height="28" rx="5" fill="var(--panel2)" stroke="var(--line)" stroke-width="1.6"/>';
  for (let i = 0; i <= n; i++){
    const x = pad + i * s;
    t += '<line x1="' + x + '" y1="168" x2="' + x + '" y2="' + (i % 5 === 0 ? 148 : 156) + '" stroke="var(--muted)" stroke-width="' + (i % 5 === 0 ? 2.2 : 1.5) + '"/>' +
      (i % 5 === 0 ? T(x, 188, String(i), 12.5, "var(--muted)", "middle", "600") : "");
  }
  return S(
    t +
    '<line x1="' + pad + '" y1="106" x2="' + (pad + 6 * s) + '" y2="106" stroke="var(--accent)" stroke-width="7" stroke-linecap="round"/>' +
    '<circle cx="' + pad + '" cy="106" r="6" fill="var(--accent)"/>' +
    '<circle cx="' + (pad + 6 * s) + '" cy="106" r="6" fill="var(--accent)"/>' +
    T(pad + 3 * s, 88, "6 厘米", 16, "var(--accent)", "middle", "700") +
    T(330, 44, "画一条 6 厘米长的线段", 19, "var(--text)", "middle", "700") +
    T(330, 226, "笔尖从刻度 0 出发，画到刻度 6 —— 两头都点上小圆点", 15, "var(--muted)", "middle"), 660, 250);
};

/* 操场跑道：2 圈半 = 1 千米 */
PIC.km = () => S(
  '<ellipse cx="300" cy="140" rx="230" ry="86" fill="none" stroke="var(--line)" stroke-width="24"/>' +
  '<ellipse cx="300" cy="140" rx="230" ry="86" fill="none" stroke="var(--soft)" stroke-width="15"/>' +
  '<circle cx="300" cy="54" r="13" fill="var(--accent)"/>' +
  T(300, 28, "跑道一圈 400 米", 15, "var(--accent)", "middle", "700") +
  T(300, 132, "400 + 400 + 200 = 1000 米", 18, "var(--text)", "middle", "700") +
  T(300, 166, "2 圈半 = 1 千米", 21, "var(--accent)", "middle", "700"), 660, 270);

/* 教室有多长（选一种工具量） */
PIC.classroom = () => S(
  '<rect x="40" y="52" width="580" height="150" rx="10" fill="var(--panel2)" stroke="var(--line)" stroke-width="2.5"/>' +
  '<rect x="120" y="70" width="200" height="54" rx="6" fill="var(--soft)" stroke="var(--line)" stroke-width="2"/>' +
  T(220, 104, "黑板", 15, "var(--muted)", "middle", "600") +
  '<rect x="470" y="70" width="120" height="46" rx="6" fill="var(--soft)" stroke="var(--line)" stroke-width="2"/>' +
  T(530, 100, "讲台", 14, "var(--muted)", "middle", "600") +
  [0, 1, 2].map(function(i){
    return '<rect x="' + (90 + i * 150) + '" y="150" width="110" height="34" rx="6" fill="var(--warmbg)" stroke="var(--warm)" stroke-width="2"/>';
  }).join("") +
  '<line x1="60" y1="216" x2="600" y2="216" stroke="var(--accent)" stroke-width="4" stroke-dasharray="8 6"/>' +
  T(56, 240, "教室的长", 15, "var(--accent)", "start", "700") +
  T(330, 32, "教室有多长？", 20, "var(--text)", "middle", "700") +
  T(640, 90, "可以用：", 14, "var(--muted)", "middle", "600") +
  T(640, 120, "铅笔 · 手", 15, "var(--text)", "middle", "700") +
  T(640, 148, "脚印 · 课本", 15, "var(--text)", "middle", "700") +
  T(640, 180, "你选哪一种？", 14, "var(--warm)", "middle", "700"), 700, 258);

/* 课桌有多长：4 支铅笔长 / 5 拃长 */
PIC.desk = () => S(
  '<rect x="70" y="150" width="320" height="18" rx="5" fill="var(--soft)" stroke="var(--line)" stroke-width="2.5"/>' +
  '<rect x="86" y="168" width="12" height="58" fill="var(--line2)" stroke="var(--line)" stroke-width="2"/>' +
  '<rect x="362" y="168" width="12" height="58" fill="var(--line2)" stroke="var(--line)" stroke-width="2"/>' +
  T(230, 56, "同一张课桌，两个人量出来不一样", 17, "var(--text)", "middle", "600") +
  '<line x1="70" y1="112" x2="150" y2="112" stroke="var(--accent)" stroke-width="6" stroke-linecap="round"/>' +
  '<line x1="150" y1="112" x2="230" y2="112" stroke="var(--accent)" stroke-width="6" stroke-linecap="round"/>' +
  '<line x1="230" y1="112" x2="310" y2="112" stroke="var(--accent)" stroke-width="6" stroke-linecap="round"/>' +
  '<line x1="310" y1="112" x2="390" y2="112" stroke="var(--accent)" stroke-width="6" stroke-linecap="round" opacity=".35"/>' +
  T(230, 98, "4 支铅笔长", 15, "var(--accent)", "middle", "700") +
  '<rect x="70" y="126" width="320" height="14" rx="4" fill="var(--warmbg)" stroke="var(--warm)" stroke-width="1.5"/>' +
  T(230, 137, "5 拃长", 13, "var(--warm)", "middle", "700") +
  T(470, 112, "工具不一样", 17, "var(--text)", "middle", "700") +
  T(470, 140, "数就不一样", 17, "var(--text)", "middle", "700") +
  T(470, 176, "要先有统一的标准", 16, "var(--warm)", "middle", "700"), 660, 250);

/* 手拉手：10 米 / 100 米 */
PIC.handinhand = () => {
  let kids = "";
  for (let i = 0; i < 7; i++){
    const x = 70 + i * 88;
    kids += '<circle cx="' + x + '" cy="120" r="14" fill="' + ["#f0a63c", "#6fc7d4", "#9aa7f0", "#e19bc0"][i % 4] + '"/>' +
      '<path d="M' + (x - 12) + ' 138 q12 -6 24 0 l4 40 q-16 6 -32 0 z" fill="' + ["#f0a63c", "#6fc7d4", "#9aa7f0", "#e19bc0"][i % 4] + '"/>' +
      (i < 6 ? '<path d="M' + (x + 13) + ' 146 q' + 30 + ' -10 ' + 62 + ' 0" fill="none" stroke="var(--accent)" stroke-width="5" stroke-linecap="round"/>' : "");
  }
  return S(
    GROUND(196) + kids +
    '<line x1="70" y1="60" x2="598" y2="60" stroke="var(--accent)" stroke-width="3" stroke-dasharray="7 5"/>' +
    T(330, 46, "手拉手站成一排：10 米有多长？100 米呢？", 18, "var(--text)", "middle", "700") +
    T(330, 226, "100 米大约要走 200 步；1000 米就是 10 个 100 米", 15, "var(--muted)", "middle"), 660, 250);
};
window.KIDS.pic = PIC;
})();
