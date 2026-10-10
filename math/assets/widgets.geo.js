/* 共享部件 · 图形与几何（从原 course.html 抽出，含插图与 14 个部件） */
(function(){
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const S = 44;
const box = (w, h, inner, label, maxw) =>
  '<svg viewBox="0 0 ' + w + ' ' + h + '" style="width:100%;max-height:' + Math.min(560, Math.round(h * 2.6)) + 'px;height:auto" role="img" aria-label="' + label + '">' + inner + '</svg>';

/* ============================================================
   1. 小插图
   ============================================================ */
function solid(kind){
  const A = '<svg viewBox="0 0 100 90" style="width:100%;max-width:88px;height:auto" aria-hidden="true">';
  if (kind === "box") return A +
    '<polygon points="12,38 62,38 62,76 12,76" fill="var(--soft)" stroke="var(--accent)" stroke-width="2.2"/>' +
    '<polygon points="12,38 26,24 76,24 62,38" fill="var(--line2)" stroke="var(--accent)" stroke-width="2.2"/>' +
    '<polygon points="62,38 76,24 76,62 62,76" fill="var(--line2)" stroke="var(--accent)" stroke-width="2.2"/></svg>';
  if (kind === "cube") return A +
    '<polygon points="16,36 54,36 54,74 16,74" fill="var(--soft)" stroke="var(--accent)" stroke-width="2.2"/>' +
    '<polygon points="16,36 30,22 68,22 54,36" fill="var(--line2)" stroke="var(--accent)" stroke-width="2.2"/>' +
    '<polygon points="54,36 68,22 68,60 54,74" fill="var(--line2)" stroke="var(--accent)" stroke-width="2.2"/></svg>';
  if (kind === "can") return A +
    '<rect x="32" y="24" width="36" height="44" fill="var(--soft)" stroke="var(--accent)" stroke-width="2.2"/>' +
    '<ellipse cx="50" cy="24" rx="18" ry="7" fill="var(--line2)" stroke="var(--accent)" stroke-width="2.2"/>' +
    '<path d="M32 68 A18 7 0 0 0 68 68" fill="none" stroke="var(--accent)" stroke-width="2.2"/></svg>';
  if (kind === "ball") return A +
    '<circle cx="50" cy="48" r="27" fill="var(--soft)" stroke="var(--accent)" stroke-width="2.2"/>' +
    '<ellipse cx="40" cy="36" rx="9" ry="6" fill="#fff" opacity=".55"/></svg>';
  if (kind === "tri") return A +
    '<polygon points="22,74 58,74 40,42" fill="var(--soft)" stroke="var(--accent)" stroke-width="2.2"/>' +
    '<polygon points="22,74 36,62 72,62 58,74" fill="var(--line2)" stroke="var(--accent)" stroke-width="2.2"/>' +
    '<polygon points="40,42 54,30 72,62 58,74" fill="var(--line2)" stroke="var(--accent)" stroke-width="2.2"/></svg>';
  return "";
}
function plane(kind, maxw){
  const A = '<svg viewBox="0 0 60 60" style="width:100%;max-width:' + (maxw || 60) + 'px;height:auto" aria-hidden="true">';
  if (kind === "square") return A + '<rect x="12" y="12" width="36" height="36" fill="var(--soft)" stroke="var(--accent)" stroke-width="2.2"/></svg>';
  if (kind === "rect")   return A + '<rect x="5" y="18" width="50" height="24" fill="var(--soft)" stroke="var(--accent)" stroke-width="2.2"/></svg>';
  if (kind === "circle") return A + '<circle cx="30" cy="30" r="24" fill="var(--soft)" stroke="var(--accent)" stroke-width="2.2"/></svg>';
  if (kind === "tri")    return A + '<polygon points="30,8 54,52 6,52" fill="var(--soft)" stroke="var(--accent)" stroke-width="2.2"/></svg>';
  return "";
}
const ART = {
  solids: () => '<div class="art">' +
    [["box","长方体（纸盒）"],["cube","正方体（魔方）"],["can","圆柱（易拉罐）"],["ball","球（皮球）"]]
      .map(x => '<figure>' + solid(x[0]) + '<figcaption>' + x[1] + '</figcaption></figure>').join("") + '</div>',
  planes: () => '<div class="art">' +
    [["rect","长方形"],["square","正方形"],["tri","三角形"],["circle","圆"]]
      .map(x => '<figure>' + plane(x[0], 62) + '<figcaption>' + x[1] + '</figcaption></figure>').join("") + '</div>',
  unitSquare: () => '<div class="viz">' + box(150, 110,
    '<rect x="30" y="20" width="90" height="90" fill="var(--soft)" stroke="var(--accent)" stroke-width="2.5"/>' +
    '<text x="75" y="126" text-anchor="middle" font-size="12" fill="var(--muted)">1 厘米 × 1 厘米 = 1 平方厘米</text>' +
    '<text x="75" y="70" text-anchor="middle" font-size="13" font-weight="700" fill="var(--accent)">1 cm²</text>',
    "1 平方厘米的小方格", 220) + '</div>',
  circle: () => '<div class="viz">' + box(280, 130,
    '<circle cx="55" cy="55" r="40" fill="var(--soft)" stroke="var(--accent)" stroke-width="2.5"/>' +
    '<line x1="15" y1="55" x2="95" y2="55" stroke="var(--warm)" stroke-width="2" stroke-dasharray="4 3"/>' +
    '<text x="55" y="48" text-anchor="middle" font-size="12" fill="var(--warm)">直径 d</text>' +
    '<line x1="130" y1="88" x2="268" y2="88" stroke="var(--accent)" stroke-width="5"/>' +
    '<text x="199" y="110" text-anchor="middle" font-size="12.5" fill="var(--muted)">把边拉直 = 周长 C</text>',
    "圆与它的周长", 330) + '</div>'
};

const W = {};

/* ① 滚一滚 */
KIDS.W.roll = function(host){
  const items = [
    { n: "长方体（纸盒）", k: "box",  r: "不能滚", w: "它的每个面都是平的，放稳了就不会动。" },
    { n: "正方体（魔方）", k: "cube", r: "不能滚", w: "六个面都是正方形，都是平的。" },
    { n: "圆柱（易拉罐）", k: "can",  r: "能滚",   w: "侧面是弯的，躺下来就能滚，走的是直线。" },
    { n: "球（皮球）",     k: "ball", r: "能滚",   w: "整圈都是弯的，往哪边推都能滚。" }
  ];
  host.innerHTML = '<p class="whint">每个都点一下「滚一滚」，看看谁能滚起来。</p><div class="wgrid">' +
    items.map(function(it, i){
      return '<div class="wcard">' + solid(it.k) + '<div class="wname">' + it.n + '</div>' +
        '<button class="wbtn" data-go="' + i + '">滚一滚</button>' +
        '<div class="wres" data-res="' + i + '"></div></div>';
    }).join("") + '</div><div class="wsum" id="roll-sum"></div>';
  let n = 0;
  $$('[data-go]').forEach(function(b){
    b.onclick = function(){
      const i = +b.dataset.go, it = items[i], r = host.querySelector('[data-res="' + i + '"]');
      if (r.dataset.on) return;
      r.dataset.on = "1"; n++;
      r.innerHTML = '<b class="' + (it.r === "能滚" ? "ok" : "no") + '">' + it.r + '</b> ' + it.w;
      if (n === items.length) host.querySelector("#roll-sum").innerHTML =
        "小结：球和圆柱能滚，长方体和正方体不能滚。它们都是「体」，占地方、有厚度。";
    };
  });
};

/* ② 面在体上 */
KIDS.W.print = function(host){
  const items = [
    { n: "正方体（魔方）", k: "cube", f: "square", t: "正方形" },
    { n: "长方体（纸盒）", k: "box",  f: "rect",   t: "长方形" },
    { n: "圆柱（易拉罐）", k: "can",  f: "circle", t: "圆" },
    { n: "三角积木",       k: "tri",  f: "tri",    t: "三角形" }
  ];
  host.innerHTML = '<p class="whint">拿一个「体」，把它的一个面按在纸上描一圈，看看描出什么「形」。</p><div class="wgrid">' +
    items.map(function(it, i){
      return '<div class="wcard">' + solid(it.k) + '<div class="wname">' + it.n + '</div>' +
        '<button class="wbtn" data-p="' + i + '">描一个面</button>' +
        '<div class="stamp" data-s="' + i + '"></div></div>';
    }).join("") + '</div><div class="wsum" id="pr-sum"></div>';
  let n = 0;
  host.querySelectorAll("[data-p]").forEach(function(b){
    b.onclick = function(){
      const i = +b.dataset.p, it = items[i], s = host.querySelector('[data-s="' + i + '"]');
      if (s.dataset.on) return;
      s.dataset.on = "1"; s.innerHTML = plane(it.f, 46) + '<span class="wres">描出 ' + it.t + '</span>'; n++;
      if (n === items.length) host.querySelector("#pr-sum").innerHTML =
        "描出来的都是<b>平的</b>，能画在纸上、能剪下来 —— 这就是「面在体上」。";
    };
  });
};

/* ③ 找出所有的圆 */
KIDS.W.spot = function(host){
  const kinds = ["rect","tri","circle","square","circle","tri","circle","rect","square"];
  host.innerHTML = '<p class="whint">点出所有的圆（一共 3 个），然后点「检查」。</p><div class="sgrid">' +
    kinds.map(function(k, i){ return '<button class="sitem" data-s="' + i + '">' + plane(k, 46) + '</button>'; }).join("") +
    '</div><div class="wrow"><button class="wbtn" id="sp-go">检查</button></div><div class="wsum" id="sp-out"></div>';
  const sel = {};
  host.querySelectorAll(".sitem").forEach(function(el){
    el.onclick = function(){ const i = +el.dataset.s; if (sel[i]) { delete sel[i]; el.classList.remove("sel"); } else { sel[i] = 1; el.classList.add("sel"); } };
  });
  host.querySelector("#sp-go").onclick = function(){
    const pick = Object.keys(sel).map(Number);
    const right = pick.filter(function(i){ return kinds[i] === "circle"; }).length;
    const wrong = pick.length - right;
    host.querySelector("#sp-out").innerHTML = (right === 3 && wrong === 0)
      ? "全找对了！圆没有直直的边，也没有尖尖的角，从中心到边上处处一样远。"
      : "找到 " + right + " 个圆，多圈了 " + wrong + " 个不是圆的。提示：圆是滚起来一点不颠的那个。";
  };
};

/* ④ 拃 vs 尺子 */
KIDS.W.unit = function(host){
  host.innerHTML =
    '<div class="ctl"><label>小明的手（一拃）</label><select id="u1"><option>10</option><option selected>12</option><option>15</option></select><output>厘米</output></div>' +
    '<div class="ctl"><label>小红的手（一拃）</label><select id="u2"><option selected>10</option><option>12</option><option>15</option></select><output>厘米</output></div>' +
    '<div class="wsum" id="u-out"></div>';
  function r(){
    const a = +host.querySelector("#u1").value, b = +host.querySelector("#u2").value, desk = 60;
    const na = desk / a, nb = desk / b;
    host.querySelector("#u-out").innerHTML =
      "同一张桌子，长 " + desk + " 厘米。<br>小明量出约 <b>" + na + "</b> 拃，小红量出约 <b>" + nb + "</b> 拃。" +
      (na === nb ? "<br>这次碰巧一样，换个人又会不一样。" : "<br>数不一样，谁都说服不了谁 —— 所以要有<b>大家都一样的单位</b>。");
  }
  host.querySelector("#u1").onchange = r;
  host.querySelector("#u2").onchange = r;
  r();
};

/* ⑤ 尺子读数 */
KIDS.W.ruler = function(host){
  const len = 7, MAX = 15;
  host.innerHTML =
    '<div class="ctl"><label>铅笔从刻度</label><input type="range" id="r-st" min="0" max="5" step="1" value="2"><output id="r-stv">2</output></div>' +
    '<div class="viz" id="r-viz"></div><div class="wsum" id="r-out"></div>';
  function draw(){
    const st = +host.querySelector("#r-st").value, end = st + len, s = 26, pad = 16, H = 96;
    const Wd = (MAX + 1) * s + pad * 2;
    let t = "";
    for (let i = 0; i <= MAX; i++){
      const x = pad + i * s, big = i % 5 === 0;
      t += '<line x1="' + x + '" y1="44" x2="' + x + '" y2="' + (big ? 30 : 37) + '" stroke="var(--muted)" stroke-width="1.2"/>';
      t += '<text x="' + x + '" y="' + (big ? 26 : 22) + '" text-anchor="middle" font-size="' + (big ? 11 : 9) + '" fill="var(--muted)">' + i + '</text>';
    }
    const ruler = '<rect x="' + pad + '" y="44" width="' + (MAX * s) + '" height="16" rx="3" fill="var(--line2)" stroke="var(--line)"/>';
    const pencil = '<rect x="' + (pad + st * s) + '" y="26" width="' + (len * s) + '" height="14" rx="4" fill="var(--accent)"/>' +
      '<text x="' + (pad + st * s + len * s / 2) + '" y="72" text-anchor="middle" font-size="11" fill="var(--accent)" font-weight="700">铅笔</text>';
    host.querySelector("#r-viz").innerHTML = box(Wd, H, ruler + t + pencil, "带刻度尺与铅笔", 460);
    host.querySelector("#r-stv").textContent = st;
    host.querySelector("#r-out").innerHTML = "开始刻度 <b>" + st + "</b>，结束刻度 <b>" + end + "</b>，长 = " + end + " − " + st +
      " = <b>" + len + " 厘米</b>。" + (st > 0 ? "<br>注意：不能只看结束刻度！要用「结束 − 开始」。" : "");
  }
  host.querySelector("#r-st").oninput = draw;
  draw();
};

/* ⑥ 活动角 */
KIDS.W.angle = function(host){
  host.innerHTML =
    '<div class="ctl"><label>张口大小</label><input type="range" id="a-op" min="10" max="180" step="5" value="60"><output id="a-opv">60°</output></div>' +
    '<div class="ctl"><label>边画多长</label><input type="range" id="a-ln" min="40" max="115" step="5" value="80"><output id="a-lnv">80</output></div>' +
    '<div class="viz" id="a-viz"></div><div class="wsum" id="a-out"></div>';
  function draw(){
    const d = +host.querySelector("#a-op").value, L = +host.querySelector("#a-ln").value;
    const Wd = 270, H = 150, vx = Wd / 2, vy = H - 12, half = d * Math.PI / 360;
    const x1 = vx - Math.sin(half) * L, y1 = vy - Math.cos(half) * L;
    const x2 = vx + Math.sin(half) * L, y2 = vy - Math.cos(half) * L;
    const ar = Math.min(Math.max(L * 0.42, 26), 52);
    const ax1 = vx - Math.sin(half) * ar, ay1 = vy - Math.cos(half) * ar;
    const ax2 = vx + Math.sin(half) * ar, ay2 = vy - Math.cos(half) * ar;
    let inner =
      '<line x1="' + vx + '" y1="' + vy + '" x2="' + x1 + '" y2="' + y1 + '" stroke="var(--accent)" stroke-width="4" stroke-linecap="round"/>' +
      '<line x1="' + vx + '" y1="' + vy + '" x2="' + x2 + '" y2="' + y2 + '" stroke="var(--accent)" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M' + ax1 + ' ' + ay1 + ' A ' + ar + ' ' + ar + ' 0 0 1 ' + ax2 + ' ' + ay2 + '" fill="none" stroke="var(--warm)" stroke-width="2.5"/>' +
      '<circle cx="' + vx + '" cy="' + vy + '" r="4.5" fill="var(--warm)"/>' +
      '<text x="' + vx + '" y="' + (vy - ar - 8) + '" text-anchor="middle" font-size="13" font-weight="700" fill="var(--warm)">' + d + '°</text>';
    if (d === 90) inner += '<rect x="' + vx + '" y="' + (vy - 14) + '" width="14" height="14" fill="none" stroke="var(--accent)" stroke-width="2"/>';
    host.querySelector("#a-viz").innerHTML = box(Wd, H, inner, "两条边组成的角", 400);
    host.querySelector("#a-opv").textContent = d + "°";
    host.querySelector("#a-lnv").textContent = L;
    const name = d < 90 ? "锐角（张口比直角小）" : (d === 90 ? "直角（正正好）" : (d < 180 ? "钝角（张口比直角大）" : "平角（两条边成一条直线）"));
    host.querySelector("#a-out").innerHTML = "现在这个角是 <b>" + name + "</b>。<br>把「边画多长」拖到最大，度数一点没变 —— <b>角的大小只看张口</b>，跟边画多长无关。";
  }
  host.querySelector("#a-op").oninput = draw;
  host.querySelector("#a-ln").oninput = draw;
  draw();
};

/* ⑦ 绕绳量周长 */
KIDS.W.wrap = function(host){
  const w = 4, h = 3, s = 46, pad = 20, Wd = w * s + pad * 2, H = h * s + pad * 2;
  const x = pad, y = pad, Lpx = 2 * (w * s + h * s);
  host.innerHTML = '<div class="viz">' + box(Wd, H,
    '<rect x="' + x + '" y="' + y + '" width="' + w * s + '" height="' + h * s + '" fill="var(--soft)" stroke="var(--line)" stroke-width="1.5"/>' +
    '<path id="wr-rope" d="M' + x + ' ' + y + ' H' + (x + w * s) + ' V' + (y + h * s) + ' H' + x + ' V' + y + '" fill="none" stroke="var(--accent)" stroke-width="6" ' +
      'stroke-linejoin="round" stroke-dasharray="' + Lpx + '" stroke-dashoffset="' + Lpx + '" style="transition:stroke-dashoffset 1.5s linear"/>' +
    '<text x="' + (x + w * s / 2) + '" y="' + (y - 7) + '" text-anchor="middle" font-size="12.5" fill="var(--muted)">4 厘米</text>' +
    '<text x="' + (x + w * s / 2) + '" y="' + (y + h * s + 16) + '" text-anchor="middle" font-size="12.5" fill="var(--muted)">4 厘米</text>' +
    '<text x="' + (x - 6) + '" y="' + (y + h * s / 2 + 4) + '" text-anchor="end" font-size="12.5" fill="var(--muted)">3 厘米</text>' +
    '<text x="' + (x + w * s + 6) + '" y="' + (y + h * s / 2 + 4) + '" font-size="12.5" fill="var(--muted)">3 厘米</text>',
    "长方形与绳子", 300) + '</div>' +
    '<div class="wrow"><button class="wbtn" id="wr-go">让绳子绕一圈</button><button class="wbtn ghost" id="wr-rs" style="background:transparent;color:var(--muted);border-color:var(--line)">重来</button></div>' +
    '<div class="wsum" id="wr-out"></div>';
  function reset(){
    const p = host.querySelector("#wr-rope");
    p.style.transition = "none"; p.setAttribute("stroke-dashoffset", Lpx);
    host.querySelector("#wr-out").innerHTML = "";
  }
  host.querySelector("#wr-rs").onclick = function(){ reset(); requestAnimationFrame(function(){ host.querySelector("#wr-rope").style.transition = "stroke-dashoffset 1.5s linear"; }); };
  host.querySelector("#wr-go").onclick = function(){
    reset();
    requestAnimationFrame(function(){ host.querySelector("#wr-rope").setAttribute("stroke-dashoffset", 0); });
    setTimeout(function(){
      host.querySelector("#wr-out").innerHTML =
        "绳子从一点出发，绕一圈回到起点，量出来 <b>4 + 3 + 4 + 3 = 14 厘米</b>。<br>这就是周长：<b>沿着边走一圈的长度</b>。";
    }, 1550);
  };
};

/* ⑧ 铺方格数面积 */
KIDS.W.fill = function(host){
  const cols = 4, rows = 3, s = 46, pad = 22;
  const Wd = cols * s + pad * 2, H = rows * s + pad * 2;
  let cells = "";
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++){
    const i = r * cols + c;
    cells += '<rect class="cell" data-i="' + i + '" x="' + (pad + c * s) + '" y="' + (pad + r * s) + '" width="' + s + '" height="' + s +
      '" fill="transparent" stroke="var(--line)" stroke-width="1.2" style="transition:fill .18s"/>';
  }
  host.innerHTML = '<div class="viz">' + box(Wd, H, cells, "铺满方格的长方形", 320) + '</div>' +
    '<div class="wrow"><button class="wbtn" id="fl-one">一个一个铺</button><button class="wbtn" id="fl-row">一行一行铺</button>' +
    '<button class="wbtn" id="fl-rs" style="background:transparent;color:var(--muted);border-color:var(--line)">重来</button></div>' +
    '<div class="wsum" id="fl-out"></div>';
  let timer = null;
  function clear(){ if (timer) { clearInterval(timer); timer = null; } }
  function reset(){
    clear();
    host.querySelectorAll(".cell").forEach(function(c){ c.setAttribute("fill", "transparent"); });
    host.querySelector("#fl-out").innerHTML = "";
  }
  host.querySelector("#fl-rs").onclick = reset;
  host.querySelector("#fl-one").onclick = function(){
    reset(); let i = 0;
    timer = setInterval(function(){
      const c = host.querySelector('[data-i="' + i + '"]');
      if (c) c.setAttribute("fill", "var(--accent)");
      i++;
      host.querySelector("#fl-out").innerHTML = "铺了 <b>" + i + "</b> 个 1 平方厘米的小方格…";
      if (i >= cols * rows){
        clear();
        host.querySelector("#fl-out").innerHTML =
          "铺满一共 <b>" + (cols * rows) + " 个</b>小方格，所以面积是 <b>" + (cols * rows) + " 平方厘米</b>。<br>一个一个数太慢，我们换个数法。";
      }
    }, 150);
  };
  host.querySelector("#fl-row").onclick = function(){
    reset(); let r = 0;
    timer = setInterval(function(){
      for (let c = 0; c < cols; c++) host.querySelector('[data-i="' + (r * cols + c) + '"]').setAttribute("fill", "var(--accent)");
      r++;
      host.querySelector("#fl-out").innerHTML = "已经铺了 <b>" + r + "</b> 行，每行 " + cols + " 个 → " + r + " × " + cols + " = <b>" + (r * cols) + "</b> 个";
      if (r >= rows){
        clear();
        host.querySelector("#fl-out").innerHTML =
          "每行 <b>" + cols + "</b> 个，一共 <b>" + rows + "</b> 行 → " + cols + " × " + rows + " = <b>" + (cols * rows) + " 平方厘米</b>。<br>" +
          "所以长方形面积 = 长 × 宽。";
      }
    }, 520);
  };
};

/* ⑨ 周长 / 面积 对照 */
KIDS.W.pavs = function(host){
  const w = 4, h = 3, s = 40, pad = 16;
  const Wd = w * s + pad * 2, H = h * s + pad * 2;
  let cells = "";
  for (let r = 0; r < h; r++) for (let c = 0; c < w; c++)
    cells += '<rect x="' + (pad + c * s) + '" y="' + (pad + r * s) + '" width="' + s + '" height="' + s + '" fill="var(--warm)" opacity=".22" stroke="var(--line)" stroke-width="1"/>';
  const outline = '<rect x="' + pad + '" y="' + pad + '" width="' + w * s + '" height="' + h * s + '" fill="none" stroke="var(--accent)" stroke-width="6"/>';
  host.innerHTML = '<p class="whint">同一个长方形，点一点，看两种量到底在量什么。</p><div class="two">' +
    '<div class="pane" data-k="p"><h4>周长 = 一圈线</h4><div class="viz" style="margin:0">' + box(Wd, H, outline, "只描边的长方形", 240) + '</div><div class="say" data-s="p"></div></div>' +
    '<div class="pane" data-k="a"><h4>面积 = 一片面</h4><div class="viz" style="margin:0">' + box(Wd, H, cells, "铺满方格的长方形", 240) + '</div><div class="say" data-s="a"></div></div>' +
    '</div>';
  const txt = {
    p: "沿边走一圈：4 + 3 + 4 + 3 = <b>14 厘米</b>。单位是「厘米」。",
    a: "里面铺满小方格：4 × 3 = <b>12 平方厘米</b>。单位是「平方厘米」——多了一个「平方」。"
  };
  host.querySelectorAll(".pane").forEach(function(p){
    p.onclick = function(){
      const k = p.dataset.k;
      host.querySelectorAll(".pane").forEach(function(q){ q.classList.toggle("on", q === p); });
      host.querySelector('[data-s="' + k + '"]').innerHTML = txt[k];
    };
  });
};

/* ⑩ 拉一拉 */
KIDS.W.shear = function(host){
  const a = 4, b = 3, s = 42, pad = 24;
  host.innerHTML = '<div class="ctl"><label>拉动的角度</label><input type="range" id="sh-t" min="0" max="60" step="1" value="0"><output id="sh-tv">0°</output></div>' +
    '<div class="viz" id="sh-viz"></div><div class="wsum" id="sh-out"></div>';
  function draw(){
    const th = +host.querySelector("#sh-t").value, rad = th * Math.PI / 180;
    const dx = b * Math.sin(rad) * s, hp = b * Math.cos(rad) * s;
    const Wd = a * s + dx + pad * 2, H = b * s + pad * 2, y0 = H - pad, x0 = pad;
    const inner =
      '<rect x="' + x0 + '" y="' + (y0 - b * s) + '" width="' + (a * s) + '" height="' + (b * s) + '" fill="none" stroke="var(--line)" stroke-width="1.6" stroke-dasharray="5 4"/>' +
      '<polygon points="' + x0 + ',' + y0 + ' ' + (x0 + a * s) + ',' + y0 + ' ' + (x0 + a * s + dx) + ',' + (y0 - hp) + ' ' + (x0 + dx) + ',' + (y0 - hp) + '" ' +
        'fill="var(--accent)" opacity=".14" stroke="var(--accent)" stroke-width="3"/>' +
      '<line x1="' + (x0 + dx) + '" y1="' + (y0 - hp) + '" x2="' + (x0 + dx) + '" y2="' + y0 + '" stroke="var(--warm)" stroke-width="2.4" stroke-dasharray="4 3"/>' +
      '<text x="' + (x0 + dx + 7) + '" y="' + (y0 - hp / 2) + '" font-size="12.5" fill="var(--warm)">高</text>';
    host.querySelector("#sh-viz").innerHTML = box(Wd, H, inner, "拉动中的平行四边形", 400);
    host.querySelector("#sh-tv").textContent = th + "°";
    const hh = b * Math.cos(rad);
    host.querySelector("#sh-out").innerHTML =
      "四条边长度没变：周长 = 2 × (4 + 3) = <b>14 厘米，一直不变</b>。<br>" +
      "但高从 3 厘米变成了 <b>" + hh.toFixed(2) + " 厘米</b>，面积 = 4 × 高 = <b>" + (a * hh).toFixed(2) + " 平方厘米</b>。" +
      (th > 0 ? "<br>边没短，面积却小了 —— <b>形状变了，量不一定跟着变</b>。" : "");
  }
  host.querySelector("#sh-t").oninput = draw;
  draw();
};

/* ⑪ 剪拼：平行四边形 → 长方形 */
KIDS.W.cut = function(host){
  const a = 4, h = 3, off = 2, s = 42, pad = 20;
  const x0 = pad, y0 = h * s + pad, Wd = (a + off) * s + pad * 2, H = h * s + pad * 2;
  const tri = (x0) + "," + y0 + " " + (x0 + off * s) + "," + y0 + " " + (x0 + off * s) + "," + (y0 - h * s);
  const quad = (x0 + off * s) + "," + y0 + " " + (x0 + a * s) + "," + y0 + " " + (x0 + (a + off) * s) + "," + (y0 - h * s) + " " + (x0 + off * s) + "," + (y0 - h * s);
  host.innerHTML = '<div class="viz">' + box(Wd, H,
    '<polygon points="' + quad + '" fill="var(--accent)" opacity=".14" stroke="var(--accent)" stroke-width="2.6"/>' +
    '<polygon id="cu-tri" points="' + tri + '" fill="var(--warm)" opacity=".3" stroke="var(--warm)" stroke-width="2.6" ' +
      'style="transition:transform .9s cubic-bezier(.4,0,.2,1)"/>' +
    '<line id="cu-line" x1="' + (x0 + off * s) + '" y1="' + y0 + '" x2="' + (x0 + off * s) + '" y2="' + (y0 - h * s) + '" ' +
      'stroke="var(--no)" stroke-width="2.5" stroke-dasharray="6 4" opacity="0"/>',
    "平行四边形与剪切线", 380) + '</div>' +
    '<div class="wrow"><button class="wbtn" id="cu-1">① 沿着高剪开</button><button class="wbtn" id="cu-2">② 把三角形移到右边</button>' +
    '<button class="wbtn" id="cu-3" style="background:transparent;color:var(--muted);border-color:var(--line)">重来</button></div>' +
    '<div class="wsum" id="cu-out"></div>';
  host.querySelector("#cu-1").onclick = function(){
    host.querySelector("#cu-line").setAttribute("opacity", "1");
    host.querySelector("#cu-tri").setAttribute("fill", "var(--warm)");
    host.querySelector("#cu-out").innerHTML = "沿高剪开，把它分成一个三角形和一块四边形。剪下来的三角形只是<b>搬家</b>，没有变多也没有变少。";
  };
  host.querySelector("#cu-2").onclick = function(){
    host.querySelector("#cu-tri").style.transform = "translate(" + (a * s) + "px,0)";
    host.querySelector("#cu-out").innerHTML = "三角形搬到了右边，正好补齐缺角 —— 拼成一个 <b>4 × 3 的长方形</b>。<br>面积 = 4 × 3 = <b>12 平方厘米</b>，和原来的平行四边形<b>一样大</b>。";
  };
  host.querySelector("#cu-3").onclick = function(){
    host.querySelector("#cu-tri").style.transform = "translate(0,0)";
    host.querySelector("#cu-tri").setAttribute("fill", "var(--warm)");
    host.querySelector("#cu-line").setAttribute("opacity", "0");
    host.querySelector("#cu-out").innerHTML = "";
  };
};

/* ⑫ 堆方块数体积 */
KIDS.W.volume = function(host){
  const a = 3, b = 2, s = 36, pad = 20;
  let k = 1;
  host.innerHTML = '<div class="ctl"><label>放了层数</label><input type="range" id="vo-h" min="1" max="4" step="1" value="1"><output id="vo-hv">1</output></div>' +
    '<div class="viz" id="vo-viz"></div>' +
    '<div class="wrow"><button class="wbtn" id="vo-add">再放一层</button></div><div class="wsum" id="vo-out"></div>';
  function draw(){
    const dx = b * s * 0.5, dy = b * s * 0.32, fw = a * s, fh = k * s, Wd = fw + dx + pad * 2, H = fh + dy + pad * 2;
    const x0 = pad, y0 = H - pad, L = [];
    for (let i = 1; i < a; i++) L.push([x0 + i * s, y0, x0 + i * s, y0 - fh]);
    for (let j = 1; j < k; j++) L.push([x0, y0 - j * s, x0 + fw, y0 - j * s]);
    for (let j = 1; j < b; j++){ const t = j / b; L.push([x0 + t * dx, y0 - fh - t * dy, x0 + fw + t * dx, y0 - fh - t * dy]); }
    for (let i = 1; i < a; i++) L.push([x0 + i * s, y0 - fh, x0 + i * s + dx, y0 - fh - dy]);
    for (let j = 1; j < b; j++){ const t = j / b; L.push([x0 + fw + t * dx, y0 - t * dy, x0 + fw + t * dx, y0 - fh - t * dy]); }
    for (let i = 1; i < k; i++) L.push([x0 + fw, y0 - i * s, x0 + fw + dx, y0 - i * s - dy]);
    const grid = L.map(function(p){ return '<line x1="' + p[0] + '" y1="' + p[1] + '" x2="' + p[2] + '" y2="' + p[3] + '" stroke="var(--line)" stroke-width="1"/>'; }).join("");
    const faces =
      '<path d="M' + x0 + ' ' + y0 + ' L' + (x0 + fw) + ' ' + y0 + ' L' + (x0 + fw) + ' ' + (y0 - fh) + ' L' + x0 + ' ' + (y0 - fh) + 'Z" fill="var(--accent)" opacity=".12" stroke="var(--accent)" stroke-width="2.2"/>' +
      '<path d="M' + x0 + ' ' + (y0 - fh) + ' L' + (x0 + fw) + ' ' + (y0 - fh) + ' L' + (x0 + fw + dx) + ' ' + (y0 - fh - dy) + ' L' + (x0 + dx) + ' ' + (y0 - fh - dy) + 'Z" fill="var(--warm)" opacity=".16" stroke="var(--warm)" stroke-width="1.8"/>' +
      '<path d="M' + (x0 + fw) + ' ' + y0 + ' L' + (x0 + fw + dx) + ' ' + (y0 - dy) + ' L' + (x0 + fw + dx) + ' ' + (y0 - fh - dy) + ' L' + (x0 + fw) + ' ' + (y0 - fh) + 'Z" fill="var(--warm)" opacity=".1" stroke="var(--warm)" stroke-width="1.8"/>';
    host.querySelector("#vo-viz").innerHTML = box(Wd, H, faces + grid, "装小方块的长方体", 330);
    host.querySelector("#vo-hv").textContent = k;
    host.querySelector("#vo-h").value = k;
    host.querySelector("#vo-out").innerHTML =
      "底面一层能放 " + a + " × " + b + " = <b>6 个</b>小方块；放了 <b>" + k + " 层</b> → 6 × " + k + " = <b>" + (6 * k) + " 立方厘米</b>。<br>" +
      "一层几个叫<b>底面积</b>，层数就是<b>高</b>：底面积 × 高。";
  }
  host.querySelector("#vo-h").oninput = function(){ k = +this.value; draw(); };
  host.querySelector("#vo-add").onclick = function(){ k = k >= 4 ? 1 : k + 1; draw(); };
  draw();
};

/* ⑬ 滚一圈量圆周率 */
KIDS.W.rollc = function(host){
  const s = 26, MAXD = 6, pad = 18;
  const Wd = 300, H = 190;
  let d = 3, C = 0;
  host.innerHTML = '<div class="ctl"><label>圆的直径</label><input type="range" id="rc-d" min="1" max="6" step="1" value="3"><output id="rc-dv">3 cm</output></div>' +
    '<div class="viz" id="rc-viz"></div>' +
    '<div class="wrow"><button class="wbtn" id="rc-go">让它滚一圈</button><button class="wbtn" id="rc-rs" style="background:transparent;color:var(--muted);border-color:var(--line)">重来</button></div>' +
    '<div class="wsum" id="rc-out"></div>';
  function draw(){
    d = +host.querySelector("#rc-d").value; C = Math.PI * d * s;
    const r = d * s / 2, cx = pad + r, cy = 70;
    let marks = "";
    for (let i = 1; i <= 3; i++){
      const x = pad + i * d * s;
      marks += '<line x1="' + x + '" y1="128" x2="' + x + '" y2="' + (x <= pad + C ? 150 : 138) + '" stroke="var(--warm)" stroke-width="2"/>' +
        '<text x="' + x + '" y="164" text-anchor="middle" font-size="10.5" fill="var(--warm)">' + i + 'd</text>';
    }
    const inner =
      '<line x1="' + pad + '" y1="112" x2="' + (Wd - 6) + '" y2="112" stroke="var(--line)" stroke-width="1.5"/>' +
      '<g id="rc-wheel" style="transition:transform 1.3s cubic-bezier(.35,.05,.3,1)">' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="var(--soft)" stroke="var(--accent)" stroke-width="2.6"/>' +
        '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + r) + '" y2="' + cy + '" stroke="var(--accent)" stroke-width="2"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="3" fill="var(--accent)"/>' +
      '</g>' +
      '<rect id="rc-bar" x="' + pad + '" y="116" width="0" height="8" rx="4" fill="var(--accent)" opacity=".85" style="transition:width 1.3s linear"/>' +
      marks +
      '<text x="' + pad + '" y="102" font-size="11.5" fill="var(--muted)">直径 d = ' + d + ' cm</text>' +
      '<text x="' + (Wd - 6) + '" y="102" text-anchor="end" font-size="11.5" fill="var(--accent)">滚过的长度 = 周长 C</text>';
    host.querySelector("#rc-viz").innerHTML = box(Wd, H, inner, "滚动的圆与周长", 430);
    host.querySelector("#rc-dv").textContent = d + " cm";
    host.querySelector("#rc-out").innerHTML = "直径 " + d + " cm 的圆，滚一圈走过约 <b>" + (Math.PI * d).toFixed(2) + " cm</b>。" +
      "<br>这段长度正好是 <b>" + d + "</b> 的 3.14 倍多一点 —— 大约 3 个直径，还多一点。";
  }
  host.querySelector("#rc-d").oninput = draw;
  host.querySelector("#rc-rs").onclick = function(){
    host.querySelector("#rc-wheel").style.transform = "translate(0,0) rotate(0deg)";
    host.querySelector("#rc-bar").style.width = "0px";
    host.querySelector("#rc-out").innerHTML = "";
  };
  host.querySelector("#rc-go").onclick = function(){
    host.querySelector("#rc-wheel").style.transform = "translate(" + C + "px,0) rotate(360deg)";
    host.querySelector("#rc-bar").style.width = C + "px";
    setTimeout(function(){
      host.querySelector("#rc-out").innerHTML = "滚一圈走过的长度就是<b>周长</b>：C = " + (Math.PI * d).toFixed(2) + " cm。" +
        "<br>3 个直径 = " + (3 * d) + " cm，滚过的距离比它长一点点。";
    }, 1350);
  };
  draw();
};

/* ⑭ 进率阶梯 */
KIDS.W.ladder = function(host, step){
  const DIMS = {
    1: { word: "长度", dim: "1 维", list: ["毫米", "厘米", "分米", "米"] },
    2: { word: "面积", dim: "2 维", list: ["平方毫米", "平方厘米", "平方分米", "平方米"] },
    3: { word: "体积", dim: "3 维", list: ["立方毫米", "立方厘米", "立方分米", "立方米"] }
  };
  let dimCur = (step && step.dim) || 2;
  host.innerHTML =
    '<div class="ctl"><label>在量什么</label><select id="la-dim">' +
      '<option value="1">长度（一条线多长）</option>' +
      '<option value="2">面积（一片面多大）</option>' +
      '<option value="3">体积（一个体多大）</option>' +
    '</select></div>' +
    '<div class="ctl"><label>往上跳几级</label><input type="range" id="la-n" min="1" max="3" step="1" value="1"><output id="la-nv">1 级</output></div>' +
    '<div class="ladder" id="la-list"></div><div class="wsum" id="la-out"></div>';
  host.querySelector("#la-dim").value = String(dimCur);
  function draw(){
    dimCur = +host.querySelector("#la-dim").value;
    const n = +host.querySelector("#la-n").value;
    const D = DIMS[dimCur], base = Math.pow(10, dimCur), factor = Math.pow(base, n);
    const from = D.list[0], to = D.list[n] || D.list[D.list.length - 1];
    host.querySelector("#la-list").innerHTML = D.list.map(function(u, i){
      return '<div class="rung' + (i === n ? " hot" : "") + '"><span class="u">1 ' + u + '</span>' +
        '<span class="v">' + (i === 0 ? "起点" : "= " + Math.pow(base, i).toLocaleString() + " " + from) + '</span></div>';
    }).join("");
    host.querySelector("#la-nv").textContent = n + " 级";
    const why = dimCur === 1 ? "一条边 ×10，所以每级 ×10"
      : (dimCur === 2 ? "两条边一起 ×10：10 × 10，所以每级 ×100"
      : "三条边一起 ×10：10 × 10 × 10，所以每级 ×1000");
    host.querySelector("#la-out").innerHTML =
      "1 " + to + " = <b>" + factor.toLocaleString() + " " + from + "</b><br>" + why +
      (dimCur === 1 ? "" : "<br>量" + D.word + "时，边不止一条，所以进率比长度大。");
  }
  host.querySelector("#la-dim").onchange = draw;
  host.querySelector("#la-n").oninput = draw;
  draw();
};

KIDS.box = box; KIDS.solid = solid; KIDS.plane = plane; KIDS.ART = ART;
})();
