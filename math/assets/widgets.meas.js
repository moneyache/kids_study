/* ============================================================
   共享部件 · 测量（量与计量）
   约定：KIDS.W.名字 = function(host, step){ ... }
   本主题自己的 8 个部件：
     readlen   断尺子读数        step {max:20, a:0, b:7}
     pickunit  选合适的单位      step {items:[{n,v,right,why}]}
     convert   单位换算          step {unit:"米"}
     est1m     比 1 米长还是短   step {items:[{n,long,why}]}
     taskline  按要求画线段      step {target:6, max:15, minTick:0, from:0}
     kmwalk    千米有多远        step {lap:400}
     roomtools 教室有多长        step {len:720, tools:[{n,v}]}
     diaryfix  改一改淘气的日记   step {items:[{say,right,why}]}
   另外复用图形部件库里的 unit（拃 vs 尺子）、ruler（尺子上量铅笔）、
   ladder（长度单位阶梯，step {dim:1}）。
   ============================================================ */
window.KIDS = window.KIDS || { W: {}, ART: {}, pic: {} };
(function(){
"use strict";

/* 画布：宽度撑满，高度按比例放大但封顶 */
const B = (w, h, inner, label) =>
  '<svg viewBox="0 0 ' + w + ' ' + h + '" style="width:100%;max-height:' +
  Math.min(560, Math.round(h * 2.6)) + 'px;height:auto" role="img" aria-label="' + (label || "") + '">' + inner + '</svg>';
const T = (x, y, s, size, fill, anchor, weight) =>
  '<text x="' + x + '" y="' + y + '" font-size="' + (size || 14) + '" fill="' + (fill || "var(--muted)") +
  '" text-anchor="' + (anchor || "middle") + '"' + (weight ? ' font-weight="' + weight + '"' : "") + '>' + s + '</text>';
const GOOD = "var(--ok)", BAD = "var(--no)", HL = "var(--accent)", WARM = "var(--warm)";

/* 一排小方格（表示「1 个 10」「1 个 100」） */
function cells(k, per){
  const cols = per || (k <= 10 ? k : 10);
  let out = '<div style="display:grid;grid-template-columns:repeat(' + cols + ',minmax(0,1fr));gap:3px;max-width:660px;margin:12px auto 0">';
  for (let i = 0; i < k; i++) out += '<i style="display:block;height:15px;border-radius:4px;background:var(--soft);border:1px solid var(--line)"></i>';
  return out + '</div>';
}

/* ============================================================
   ① 断尺子读数：左端 / 右端对到东西上，读「结束 − 开始」
   ============================================================ */
KIDS.W.readlen = function(host, step){
  const maxCm = step.max || 20;
  const s = Math.max(24, Math.min(46, Math.floor(880 / maxCm)));
  const pad = 36, W = maxCm * s + pad * 2, H = 168;
  const a0 = step.a !== undefined ? step.a : 0, b0 = step.b !== undefined ? step.b : 7;
  host.innerHTML =
    '<p class="whint">拖下面两个滑块，把「左端」和「右端」对准要量的东西 —— 它到底长几厘米？</p>' +
    '<div class="viz" id="rl-viz"></div>' +
    '<div class="ctl"><label>左端对准刻度</label><input type="range" id="rl-a" min="0" max="' + (maxCm - 1) + '" step="1" value="' + a0 + '"><output id="rl-av">' + a0 + '</output></div>' +
    '<div class="ctl"><label>右端对准刻度</label><input type="range" id="rl-b" min="1" max="' + maxCm + '" step="1" value="' + b0 + '"><output id="rl-bv">' + b0 + '</output></div>' +
    '<div class="wsum" id="rl-out"></div>';
  function draw(){
    const a = +host.querySelector("#rl-a").value, b = +host.querySelector("#rl-b").value;
    host.querySelector("#rl-av").textContent = a;
    host.querySelector("#rl-bv").textContent = b;
    const y = 78;
    let ticks = "";
    for (let i = 0; i <= maxCm; i++){
      const x = pad + i * s, big = i % 5 === 0;
      ticks += '<line x1="' + x + '" y1="' + (y + 24) + '" x2="' + x + '" y2="' + (y + 24 - (big ? 20 : 11)) +
        '" stroke="var(--muted)" stroke-width="' + (big ? 2.4 : 1.6) + '"/>';
      if (big || maxCm <= 12) ticks += T(x, y + 44, String(i), 12.5, "var(--muted)", "middle", "600");
    }
    let mid = "", mark = "";
    if (b > a){
      mid = '<rect x="' + (pad + a * s) + '" y="' + (y - 34) + '" width="' + ((b - a) * s) + '" height="26" rx="7" fill="' + HL + '" opacity=".88"/>' +
        T(pad + (a + (b - a) / 2) * s, y - 15, (b - a) + " 厘米", 16, "#fff", "middle", "700");
      mark = '<line x1="' + (pad + a * s) + '" y1="' + (y - 52) + '" x2="' + (pad + a * s) + '" y2="' + (y + 24) + '" stroke="' + WARM + '" stroke-width="2.5" stroke-dasharray="5 4"/>' +
        '<line x1="' + (pad + b * s) + '" y1="' + (y - 52) + '" x2="' + (pad + b * s) + '" y2="' + (y + 24) + '" stroke="' + WARM + '" stroke-width="2.5" stroke-dasharray="5 4"/>' +
        T(pad + a * s, y - 60, "起点 " + a, 12.5, WARM, "middle", "700") +
        T(pad + b * s, y - 60, "终点 " + b, 12.5, WARM, "middle", "700");
    } else {
      mid = T(pad + W / 2, y - 15, "右端要拖到左端右边，才有一段可以量", 15, BAD, "middle", "700");
    }
    host.querySelector("#rl-viz").innerHTML = B(W, H,
      '<rect x="' + (pad - 6) + '" y="' + y + '" width="' + (maxCm * s + 12) + '" height="28" rx="5" fill="var(--panel2)" stroke="var(--line)" stroke-width="1.5"/>' +
      mid + mark + ticks, "带刻度的尺子");
    host.querySelector("#rl-out").innerHTML = (b > a)
      ? "从左端 <b>" + a + "</b> 读到右端 <b>" + b + "</b>：<b>" + b + " − " + a + " = " + (b - a) + "</b> 厘米。<br>" +
        (a === 0
          ? "起点正好在 0，终点指着几，就是几厘米 —— 这是最省事的量法。"
          : "起点不在 0 也没关系：<b>结束的刻度 − 开始的刻度 = 长度</b>。这就是「断尺子」的读法，很多同学会直接读成 " + b + " 厘米，那就错了。")
      : "右端要拖到左端右边，才有一段可以量。";
  }
  host.querySelector("#rl-a").oninput = draw;
  host.querySelector("#rl-b").oninput = draw;
  draw();
};

/* ============================================================
   ② 选合适的单位：厘米 / 米 / 千米
   ============================================================ */
KIDS.W.pickunit = function(host, step){
  const items = step.items || [
    { n: "一块橡皮的长", v: "4", right: "厘米", why: "橡皮只有几厘米，比 1 米短得多。" },
    { n: "一支铅笔的长", v: "18", right: "厘米", why: "铅笔大约 18 厘米，还不到 1 米。" },
    { n: "教室门的高", v: "2", right: "米", why: "门比大人还高，大约 2 米。" },
    { n: "课桌的高", v: "70", right: "厘米", why: "课桌不到 1 米，所以写成 70 厘米。" },
    { n: "一块黑板的长", v: "4", right: "米", why: "黑板比门还宽，大约 4 米。" },
    { n: "从家到学校的距离", v: "1", right: "千米", why: "路很远，用千米；1 千米 = 1000 米。" },
    { n: "操场跑道一圈的长", v: "400", right: "米", why: "400 米用米，2 圈半才是 1 千米。" }
  ];
  host.innerHTML = '<p class="whint">每个东西后面都缺一个单位。点一下你选的，看看对不对。</p>' +
    items.map(function(it, i){
      return '<div class="wcard" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:10px">' +
        '<b style="min-width:180px">' + it.n + '</b>' +
        '<span style="font-size:22px;font-weight:700">' + it.v + '</span>' +
        ["厘米", "米", "千米"].map(function(u){
          return '<button class="wbtn" data-i="' + i + '" data-u="' + u + '">' + u + '</button>';
        }).join("") +
        '<span class="wres" data-fb="' + i + '" style="flex:1;text-align:left;min-width:200px"></span>' +
        '</div>';
    }).join("") + '<div class="wsum" id="pu-out"></div>';
  const solved = {};
  const refresh = function(){
    const n = Object.keys(solved).length;
    host.querySelector("#pu-out").innerHTML = (n === items.length)
      ? "全部选对了！<b>选单位就看两件事</b>：这个东西大概多长，1 米有多长。"
      : "已经选对 <b>" + n + " / " + items.length + "</b> 个。";
  };
  refresh();
  host.querySelectorAll("[data-u]").forEach(function(b){
    b.onclick = function(){
      const i = +b.dataset.i, it = items[i], fb = host.querySelector('[data-fb="' + i + '"]');
      if (b.dataset.u === it.right){
        fb.innerHTML = '<b style="color:' + GOOD + '">对了！</b>' + it.why;
        solved[i] = 1;
      } else {
        fb.innerHTML = '<b style="color:' + BAD + '">再想想：</b>伸出双臂，大约就是 1 米。比它短很多 → 厘米；门那么高、黑板那么宽 → 米；路那么远 → 千米。';
      }
      refresh();
    };
  });
};

/* ============================================================
   ③ 单位换算：1 米 = 100 厘米 这些「1 个顶几个」
   ============================================================ */
KIDS.W.convert = function(host, step){
  const CHAIN = {
    "厘米": [["毫米", 10]],
    "分米": [["厘米", 10], ["毫米", 100]],
    "米":   [["分米", 10], ["厘米", 100], ["毫米", 1000]],
    "千米": [["米", 1000]]
  };
  const order = ["厘米", "分米", "米", "千米"];
  const u0 = step.unit || "米";
  host.innerHTML =
    '<p class="whint">选一个单位，再拖一拖「几个」，看它等于多少更小的单位。</p>' +
    '<div class="ctl"><label>我要换</label><select id="cv-u">' +
      order.map(function(u){ return '<option value="' + u + '"' + (u === u0 ? " selected" : "") + '>' + u + '</option>'; }).join("") +
    '</select></div>' +
    '<div class="ctl"><label>几个</label><input type="range" id="cv-n" min="1" max="10" step="1" value="1"><output id="cv-nv">1</output></div>' +
    '<div id="cv-vis"></div><div class="wsum" id="cv-out"></div>';
  function draw(){
    const u = host.querySelector("#cv-u").value, n = +host.querySelector("#cv-n").value;
    host.querySelector("#cv-nv").textContent = n;
    const rows = CHAIN[u] || [];
    let out = "", vis = "";
    if (rows.length){
      const chain = rows.map(function(r){ return (r[1] * n) + " " + r[0]; }).join(" = ");
      let prev = 1, prevName = u, steps = [];
      rows.forEach(function(r){
        steps.push(prevName + " → " + r[0] + " ×" + (r[1] / prev));
        prev = r[1]; prevName = r[0];
      });
      out = '<div style="font-size:19px;line-height:2">' + n + " " + u + " = <b>" + chain + "</b></div>" +
        '<div class="whint">每一步的进率：<b>' + steps.join("，") + "</b>。</div>";
    }
    const first = rows[0];
    if (first){
      const k = first[1];
      vis = (k > 100)
        ? '<p class="whint">' + n + " " + u + " = " + (k * n) + " " + first[0] + "，小格太多画不下了 —— 记住上下的进率就够了。</p>"
        : '<p class="whint">把 ' + n + " " + u + " 切开，就是下面这些小格（每格 1 " + first[0] + "）：</p>" + cells(k);
    }
    host.querySelector("#cv-out").innerHTML = out;
    host.querySelector("#cv-vis").innerHTML = vis;
  }
  host.querySelector("#cv-u").onchange = draw;
  host.querySelector("#cv-n").oninput = draw;
  draw();
};

/* ============================================================
   ④ 估一估：比 1 米长，还是比 1 米短？
   ============================================================ */
KIDS.W.est1m = function(host, step){
  const items = step.items || [
    { n: "一块橡皮的长", long: false, why: "橡皮大约 4 厘米，比 1 米短得多。" },
    { n: "一支铅笔的长", long: false, why: "铅笔大约 18 厘米，还是比 1 米短。" },
    { n: "数学书的宽", long: false, why: "书大约 18 厘米，比 1 米短。" },
    { n: "教室门的高", long: true, why: "门大约 2 米，比 1 米高。" },
    { n: "一根跳绳的长", long: true, why: "跳绳大约 2 米，比 1 米长。" },
    { n: "黑板的长", long: true, why: "黑板大约 4 米，比 1 米长。" }
  ];
  host.innerHTML =
    '<div class="viz" style="min-height:0;padding:14px 16px">' + B(700, 150,
      '<line x1="70" y1="112" x2="630" y2="112" stroke="var(--line)" stroke-width="2"/>' +
      '<circle cx="220" cy="46" r="19" fill="' + HL + '"/>' +
      '<path d="M220 66 q-58 8 -66 46 M220 66 q58 8 66 46" fill="none" stroke="' + HL + '" stroke-width="9" stroke-linecap="round"/>' +
      '<line x1="154" y1="112" x2="286" y2="112" stroke="' + WARM + '" stroke-width="4" stroke-dasharray="6 5"/>' +
      T(220, 138, "1 米 ≈ 张开双臂这么宽", 15, WARM, "middle", "700") +
      T(470, 62, "比它长？还是比它短？", 19, "var(--text)", "middle", "700") +
      T(470, 92, "先比一比，再动手量", 15, "var(--muted)", "middle"), "1 米大约有多长") + '</div>' +
    items.map(function(it, i){
      return '<div class="wcard" style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:9px">' +
        '<b style="min-width:180px">' + it.n + '</b>' +
        '<button class="wbtn" data-i="' + i + '" data-a="1">比 1 米长</button>' +
        '<button class="wbtn" data-i="' + i + '" data-a="0">比 1 米短</button>' +
        '<span class="wres" data-fb="' + i + '" style="flex:1;text-align:left;min-width:200px"></span>' +
        '</div>';
    }).join("") + '<div class="wsum" id="es-out"></div>';
  const solved = {};
  const refresh = function(){
    const n = Object.keys(solved).length;
    host.querySelector("#es-out").innerHTML = (n === items.length)
      ? "全部估对了！估长度不用精确，<b>先想 1 米有多长，再比一比</b>就够了。"
      : "已经估对 <b>" + n + " / " + items.length + "</b> 个。";
  };
  refresh();
  host.querySelectorAll("[data-a]").forEach(function(b){
    b.onclick = function(){
      const i = +b.dataset.i, it = items[i], fb = host.querySelector('[data-fb="' + i + '"]');
      const pick = b.dataset.a === "1";
      if (pick === !!it.long){
        fb.innerHTML = '<b style="color:' + GOOD + '">对了！</b>' + it.why;
        solved[i] = 1;
      } else {
        fb.innerHTML = '<b style="color:' + BAD + '">再想想：</b>1 米大约是你张开双臂的宽度。' + it.why;
      }
      refresh();
    };
  });
};

/* ============================================================
   ⑤ 按要求画线段：拖到正确刻度，再检查
   ============================================================ */
KIDS.W.taskline = function(host, step){
  const maxCm = step.max || 15;
  const minTick = step.minTick || 0;                     /* 断尺子：刻度不从 0 开始 */
  const from = step.from !== undefined ? step.from : minTick;
  const target = step.target || 6;
  const want = from + target;
  const span = maxCm - minTick;
  const s = Math.max(34, Math.min(52, Math.floor(820 / span)));
  const pad = 40, W = span * s + pad * 2, H = 170;
  const X = i => pad + (i - minTick) * s;
  const startVal = Math.min(maxCm, Math.max(minTick + 1, from + target + 2));
  host.innerHTML =
    '<p class="whint">' + (minTick ? "尺子前面断掉了，只剩刻度 " + minTick + "—" + maxCm + "。<br>" : "") +
      '任务：画一条 <b>' + target + " 厘米</b>的线段 —— 从刻度 <b>" + from +
      '</b> 开始，把笔尖拖到正确的刻度上，再点「检查」。</p>' +
    '<div class="viz" id="tl-viz"></div>' +
    '<div class="ctl"><label>笔尖对准刻度</label><input type="range" id="tl-n" min="' + (minTick + 1) + '" max="' + maxCm + '" step="1" value="' + startVal + '"><output id="tl-nv">' + startVal + '</output></div>' +
    '<div class="wrow"><button class="wbtn" id="tl-go">检查</button></div><div class="wsum" id="tl-out"></div>';
  function draw(result){
    const n = +host.querySelector("#tl-n").value;
    host.querySelector("#tl-nv").textContent = n;
    const y = 92, len = n - from;
    let ticks = "";
    for (let i = minTick; i <= maxCm; i++){
      const big = i % 5 === 0;
      ticks += '<line x1="' + X(i) + '" y1="' + (y + 22) + '" x2="' + X(i) + '" y2="' + (y + 22 - (big ? 18 : 10)) +
        '" stroke="var(--muted)" stroke-width="' + (big ? 2.3 : 1.5) + '"/>' +
        T(X(i), y + 42, String(i), 12.5, "var(--muted)", "middle", "600");
    }
    const color = result === true ? GOOD : (result === false ? BAD : HL);
    const line = (len > 0)
      ? '<line x1="' + X(from) + '" y1="' + (y - 26) + '" x2="' + X(n) + '" y2="' + (y - 26) +
        '" stroke="' + color + '" stroke-width="7" stroke-linecap="round"/>' +
        '<circle cx="' + X(from) + '" cy="' + (y - 26) + '" r="6" fill="' + color + '"/>' +
        '<circle cx="' + X(n) + '" cy="' + (y - 26) + '" r="6" fill="' + color + '"/>' +
        T((X(from) + X(n)) / 2, y - 40, len + " 厘米", 15, color, "middle", "700")
      : T(pad + span * s / 2, y - 26, "笔尖要拖到 " + from + " 的右边", 15, BAD, "middle", "700");
    host.querySelector("#tl-viz").innerHTML = B(W, H,
      '<rect x="' + (pad - 6) + '" y="' + y + '" width="' + (span * s + 12) + '" height="26" rx="5" fill="var(--panel2)" stroke="var(--line)" stroke-width="1.5"/>' +
      line + ticks, "尺子与线段");
    if (result === true) host.querySelector("#tl-out").innerHTML =
      "<b>正好 " + target + " 厘米！</b>从刻度 " + from + " 画到刻度 " + want + "，数一数中间正好 " + target + " 个小格。";
    else if (result === false) host.querySelector("#tl-out").innerHTML =
      "<b>现在是 " + len + " 厘米</b>，要画 " + target + " 厘米，笔尖再" + (len > target ? "往左收一点" : "往右拖一点") + "。";
  }
  host.querySelector("#tl-n").oninput = function(){ draw(null); };
  host.querySelector("#tl-go").onclick = function(){ draw(+host.querySelector("#tl-n").value === want); };
  draw(null);
};

/* ============================================================
   ⑥ 千米有多远：操场一圈 400 米，跑几圈才是 1 千米
   ============================================================ */
KIDS.W.kmwalk = function(host, step){
  const lap = step.lap || 400;
  let m = 0;
  const W = 700, H = 210;
  host.innerHTML =
    '<p class="whint">操场跑道一圈 ' + lap + ' 米。点按钮跑一跑，看看跑多少才到 <b>1 千米（1000 米）</b>。</p>' +
    '<div class="viz" id="kw-viz"></div>' +
    '<div class="wrow"><button class="wbtn" id="kw-lap">跑一圈（' + lap + ' 米）</button>' +
    '<button class="wbtn" id="kw-half">跑半圈（' + (lap / 2) + ' 米）</button>' +
    '<button class="wbtn" id="kw-rs" style="background:transparent;color:var(--muted);border-color:var(--line)">重来</button></div>' +
    '<div class="wsum" id="kw-out"></div>';
  function draw(){
    const full = Math.min(1, m / 1000);
    const y = 96;
    host.querySelector("#kw-viz").innerHTML = B(W, H,
      '<rect x="60" y="' + y + '" width="580" height="60" rx="30" fill="var(--panel2)" stroke="var(--line)" stroke-width="3"/>' +
      '<rect x="60" y="' + y + '" width="' + (580 * full) + '" height="60" rx="30" fill="' + HL + '" opacity=".22"/>' +
      '<circle cx="' + (60 + 580 * full) + '" cy="' + (y + 30) + '" r="15" fill="' + HL + '"/>' +
      T(60, y - 16, "0 米", 13, "var(--muted)", "start", "600") +
      T(640, y - 16, "1 千米 = 1000 米", 13, WARM, "end", "700") +
      T(350, y + 100, m === 0 ? "还没跑" : ("已经跑了 " + m + " 米"), 21, "var(--text)", "middle", "700") +
      T(350, y + 130, m === 0 ? "" : (m >= 1000 ? ("正好 1 千米！" + (lap === 400 ? " 400 + 400 + 200 = 1000" : "")) : ("还差 " + (1000 - m) + " 米才到 1 千米")), 15, m >= 1000 ? GOOD : "var(--muted)", "middle", "600"),
      "操场跑道与已跑距离");
    host.querySelector("#kw-out").innerHTML = (m >= 1000)
      ? "越跑越远：1 千米就是 <b>1000 米</b>。400 米的跑道跑 <b>2 圈半</b> —— 所以「跑 1 千米」是操场两圈半多一点的感觉。"
      : "跑道一圈 " + lap + " 米，跑 2 圈是 " + (lap * 2) + " 米，还不到 1000 米。想一想：再跑多少？";
  }
  host.querySelector("#kw-lap").onclick = function(){ m = Math.min(1600, m + lap); draw(); };
  host.querySelector("#kw-half").onclick = function(){ m = Math.min(1600, m + lap / 2); draw(); };
  host.querySelector("#kw-rs").onclick = function(){ m = 0; draw(); };
  draw();
};

/* ============================================================
   ⑦ 教室有多长：选一种工具量一量，看各要几个
   （课本 2上·49「选择一种测量工具，量一量、填一填」）
   ============================================================ */
KIDS.W.roomtools = function(host, step){
  const room = step.len || 720;                       /* 教室的长，厘米 */
  const tools = step.tools || [
    { n: "一支铅笔", v: 18 },
    { n: "一拃（手）", v: 10 },
    { n: "一个脚印", v: 24 },
    { n: "一本数学书", v: 20 }
  ];
  const got = {};
  host.innerHTML =
    '<p class="whint">教室的长是 <b>' + room + " 厘米（也就是 " + (room / 100) + " 米）</b>。<br>点下面的按钮，看用不同的工具量，各要几个。</p>" +
    '<div class="wrow">' + tools.map(function(t, i){
      return '<button class="wbtn" data-rt="' + i + '">用' + t.n + '量</button>';
    }).join("") + '</div>' +
    '<div class="wsum" id="rt-out"></div>' +
    '<div class="wsum" id="rt-sum" style="font-size:17px"></div>';
  function refresh(){
    const n = Object.keys(got).length;
    const lines = tools.map(function(t, i){
      return got[i] ? ("教室的长 = <b>" + (room / t.v) + "</b> " + t.n) : null;
    }).filter(Boolean);
    host.querySelector("#rt-out").innerHTML = lines.join("<br>");
    host.querySelector("#rt-sum").innerHTML = (n === tools.length)
      ? "四种工具量出来是 <b>" + tools.map(function(t){ return room / t.v; }).join("、") + "</b> —— 同一个教室，数却完全不一样！<br>" +
        "所以量长度之前，<b>要先有一个人人都一样的标准</b>，这就是「单位」。"
      : (n ? "已经量了 " + n + " 种，再换一种试试。" : "");
  }
  host.querySelectorAll("[data-rt]").forEach(function(b){
    b.onclick = function(){ got[+b.dataset.rt] = 1; refresh(); };
  });
  refresh();
};

/* ============================================================
   ⑧ 改一改淘气的日记：把单位改对
   （课本 2下·35「读一读淘气的日记，把不合理的地方改正过来」）
   ============================================================ */
KIDS.W.diaryfix = function(host, step){
  const items = step.items || [
    { say: "我从 2 分米长的床上起来", right: "米", why: "2 分米只有 20 厘米，比枕头还短，躺不上去。" },
    { say: "拿起 15 毫米长的牙刷刷牙", right: "厘米", why: "15 毫米只有 1 厘米半，比手指头还短。" },
    { say: "用 70 米长的毛巾把脸擦干", right: "厘米", why: "70 米有半个操场那么长，那是毛巾吗？" },
    { say: "学校离我家大约 900 毫米远", right: "米", why: "900 毫米还不到 1 米，一步就走到了。" },
    { say: "拿出 7 厘米厚的语文书", right: "毫米", why: "7 厘米比一块橡皮还厚，那是书还是砖头？" },
    { say: "我坐在 5 毫米高的椅子上", right: "分米", why: "5 毫米只有半厘米高，根本坐不下去。" }
  ];
  const units = ["毫米", "厘米", "分米", "米"];
  host.innerHTML =
    '<p class="whint">淘气写了一篇日记，单位全都用错了。读一读，把每一句的单位改成对的。</p>' +
    items.map(function(it, i){
      return '<div class="wcard" style="margin-bottom:10px">' +
        '<div style="font-size:16.5px;margin-bottom:8px">✍️ 「' + it.say + '」</div>' +
        '<div class="wrow">' + units.map(function(u){
          return '<button class="wbtn" data-di="' + i + '" data-u="' + u + '">' + u + '</button>';
        }).join("") + '<span class="wres" data-df="' + i + '" style="flex:1;min-width:200px;text-align:left"></span></div>' +
        '</div>';
    }).join("") + '<div class="wsum" id="di-out"></div>';
  const ok = {};
  const refresh = function(){
    const n = Object.keys(ok).length;
    host.querySelector("#di-out").innerHTML = (n === items.length)
      ? "全部改对了！<b>写长度一定要带单位，还要想想这个单位合不合理</b> —— 写之前先在心里比一比。"
      : "已经改对 <b>" + n + " / " + items.length + "</b> 句。";
  };
  refresh();
  host.querySelectorAll("[data-di]").forEach(function(b){
    b.onclick = function(){
      const i = +b.dataset.di, it = items[i], fb = host.querySelector('[data-df="' + i + '"]');
      if (b.dataset.u === it.right){
        fb.innerHTML = '<b style="color:' + GOOD + '">改对了！</b>' + it.why;
        ok[i] = 1;
      } else {
        fb.innerHTML = '<b style="color:' + BAD + '">再想想：</b>' + it.why;
      }
      refresh();
    };
  });
};

})();
