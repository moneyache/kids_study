/* ============================================================
   共享部件 · 数与运算（数与数感 / 数与运算 两个主题共用）
   约定：KIDS.W.名字 = function(host, step){ ... }
   可用部件：
     count      十格阵数数        step {n:8}
     bundle     个十百千位值       step {n:13}
     basegroup  数位表滑块        step {max:9999}
     numberline 数轴（含负数）     step {min,max,step,value,neg}
     compare    比大小 >、<、=     step {pairs:[[8,5],[38,42]]}
     make10     凑十法加法         step {a:8,b:5}
     vertical   竖式加减（进退位）  step {a:34,b:28,op:"+"|"-"}
     dotarray   点子阵列（乘/除）   step {rows:4,cols:3,mode:"mul"|"div"}
     timestable 乘法口诀表         step {}
     oprule     运算律            step {mode:"swap"|"group"|"dist"}
   ============================================================ */
window.KIDS = window.KIDS || { W: {}, ART: {} };
(function(){
"use strict";
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const B = (w, h, inner, label, maxw) =>
  '<svg viewBox="0 0 ' + w + ' ' + h + '" style="width:100%;max-width:' + (maxw || w) + 'px;height:auto" role="img" aria-label="' + label + '">' + inner + '</svg>';
const CN = ["","一","二","三","四","五","六","七","八","九"];
function cn(n){
  if (n <= 10) return n === 10 ? "十" : CN[n];
  if (n < 20) return "十" + CN[n % 10];
  const t = Math.floor(n / 10), r = n % 10;
  return CN[t] + "十" + (r ? CN[r] : "");
}
function say10(a, b){
  const x = Math.min(a, b), y = Math.max(a, b), p = a * b;
  return CN[x] + CN[y] + (p < 10 ? "得" + CN[p] : cn(p));
}
function nums(k, max){
  const out = [];
  for (let i = 0; i <= k; i++) out.push(i);
  return out;
}

/* ① 十格阵数数 */
KIDS.W.count = function(host, step){
  const n = step.n || 8, S = 54, pad = 10;
  host.innerHTML = '<div class="viz" id="c-viz"></div><div class="wrow">' +
    '<button class="wbtn" id="c-go">一个一个数</button>' +
    '<button class="wbtn" id="c-rs" style="background:transparent;color:var(--muted);border-color:var(--line)">重来</button></div>' +
    '<div class="wsum" id="c-out"></div>';
  function draw(upTo){
    let inner = "";
    for (let i = 0; i < 10; i++){
      const col = i % 5, row = Math.floor(i / 5);
      const x = pad + col * S, y = pad + row * S;
      const lit = i < upTo;
      inner += '<rect x="' + x + '" y="' + y + '" width="' + (S - 6) + '" height="' + (S - 6) + '" rx="8" fill="' +
        (lit ? "var(--accent)" : "var(--panel)") + '" stroke="var(--line)" stroke-width="1.5"/>';
      if (lit) inner += '<circle cx="' + (x + (S - 6) / 2) + '" cy="' + (y + (S - 6) / 2) + '" r="9" fill="#fff" opacity=".9"/>';
    }
    host.querySelector("#c-viz").innerHTML = B(pad * 2 + S * 5, pad * 2 + S * 2, inner, "十格阵", 320);
  }
  let i = 0, timer = null;
  host.querySelector("#c-go").onclick = function(){
    if (timer) clearInterval(timer);
    i = 0; draw(0);
    timer = setInterval(function(){
      i++; draw(i);
      host.querySelector("#c-out").innerHTML = "数到 <b>" + i + "</b> 了…";
      if (i >= n){
        clearInterval(timer); timer = null;
        host.querySelector("#c-out").innerHTML = "一共 <b>" + n + " 个</b>。" +
          (n === 10 ? "十格阵正好装满 10 个 —— 这是「十」的由来。" : "数数最后一个数，就是一共有几个。");
      }
    }, 240);
  };
  host.querySelector("#c-rs").onclick = function(){
    if (timer){ clearInterval(timer); timer = null; }
    i = 0; draw(0); host.querySelector("#c-out").innerHTML = "";
  };
  draw(0);
};

/* ② 个十百千：捆一捆 */
KIDS.W.bundle = function(host, step){
  let n = step.n || 13;
  host.innerHTML = '<div class="wrow" id="b-sticks" style="gap:4px;align-items:flex-end;min-height:56px"></div>' +
    '<div class="wrow"><button class="wbtn" id="b-go">10 个捆成一捆</button>' +
    '<button class="wbtn" id="b-rs" style="background:transparent;color:var(--muted);border-color:var(--line)">重来</button></div>' +
    '<div class="wsum" id="b-out"></div>';
  let ones = n, tens = 0, hundreds = 0;
  function draw(){
    let h = "";
    for (let i = 0; i < hundreds; i++) h += '<span style="display:inline-block;width:22px;height:44px;background:var(--warm);border-radius:6px;opacity:.85"></span>';
    for (let i = 0; i < tens; i++) h += '<span style="display:inline-block;width:8px;height:40px;background:var(--accent);border-radius:4px"></span>';
    for (let i = 0; i < ones; i++) h += '<span style="display:inline-block;width:9px;height:9px;background:var(--accent);border-radius:50%;margin:0 1px"></span>';
    host.querySelector("#b-sticks").innerHTML = h ||
      '<span style="color:var(--muted)">（没有小棒了）</span>';
    host.querySelector("#b-out").innerHTML = "现在是 <b>" + (hundreds * 100 + tens * 10 + ones) + "</b>：" +
      (hundreds ? "<b>" + hundreds + "</b> 个百　" : "") + (tens ? "<b>" + tens + "</b> 个十　" : "") + "<b>" + ones + "</b> 个一。" +
      (tens ? "<br>1 捆 = 10 个一，所以 1 个十 = 10。" : "");
  }
  host.querySelector("#b-go").onclick = function(){
    if (ones >= 10){ ones -= 10; tens++; }
    else if (tens >= 10){ tens -= 10; hundreds++; }
    else { host.querySelector("#b-out").innerHTML = "剩下的不够 10 个了，不能再捆。<br>现在是 <b>" + (hundreds * 100 + tens * 10 + ones) + "</b>：满十才能进一。"; return; }
    draw();
  };
  host.querySelector("#b-rs").onclick = function(){ ones = n; tens = 0; hundreds = 0; draw(); };
  draw();
};

/* ③ 数位表滑块 */
KIDS.W.basegroup = function(host, step){
  const names = ["个位", "十位", "百位", "千位"], vals = [0, 0, 0, 0];
  host.innerHTML = names.map(function(nm, i){
    return '<div class="ctl"><label>' + nm + '</label><input type="range" class="bg" data-i="' + i + '" min="0" max="9" step="1" value="0"><output data-v="' + i + '">0</output></div>';
  }).join("") + '<div class="wsum" id="bg-out"></div>';
  function draw(){
    let num = 0; const parts = [];
    for (let i = 0; i < 4; i++){
      num += vals[i] * Math.pow(10, i);
      host.querySelector('[data-v="' + i + '"]').textContent = vals[i];
      if (vals[i]) parts.push(vals[i] + " 个" + names[i].slice(0, 1));
    }
    host.querySelector("#bg-out").innerHTML = "组成的数是 <b>" + num + "</b>" +
      (parts.length ? "<br>因为它是：" + parts.join(" + ") + "。" : "") +
      (num !== 0 ? "<br>同一个数字 <b>" + vals.filter(function(v){ return v; })[0] + "</b>，放在个位就是几个一，放在百位就是几个百 —— 位置决定大小。" : "");
  }
  $$(".bg").forEach(function(r){
    r.oninput = function(){ vals[+r.dataset.i] = +r.value; draw(); };
  });
  draw();
};

/* ④ 数轴 */
KIDS.W.numberline = function(host, step){
  const min = step.min !== undefined ? step.min : 0;
  const max = step.max !== undefined ? step.max : 10;
  const stp = step.step || 1;
  const neg = !!step.neg;
  host.innerHTML = '<div class="viz" id="nl-viz"></div>' +
    '<div class="ctl"><label>把小旗拖一拖</label><input type="range" id="nl-v" min="' + min + '" max="' + max + '" step="' + stp + '" value="' + (step.value !== undefined ? step.value : 0) + '"><output id="nl-vv"></output></div>' +
    '<div class="wsum" id="nl-out"></div>';
  function draw(){
    const v = +host.querySelector("#nl-v").value;
    const W = 420, pad = 22, y = 54, span = (max - min) || 1;
    const x = v2 => pad + (v2 - min) / span * (W - pad * 2);
    let inner = '<line x1="' + pad + '" y1="' + y + '" x2="' + (W - pad) + '" y2="' + y + '" stroke="var(--muted)" stroke-width="1.6"/>';
    inner += '<polygon points="' + (W - pad) + ',' + y + ' ' + (W - pad - 9) + ',' + (y - 5) + ' ' + (W - pad - 9) + ',' + (y + 5) + '" fill="var(--muted)"/>';
    const tickStep = span > 12 ? 2 : 1;
    for (let t = min; t <= max; t += tickStep){
      inner += '<line x1="' + x(t) + '" y1="' + (y - 4) + '" x2="' + x(t) + '" y2="' + (y + 4) + '" stroke="var(--muted)"/>';
      if (t % (tickStep * 2) === 0) inner += '<text x="' + x(t) + '" y="' + (y + 20) + '" text-anchor="middle" font-size="11" fill="var(--muted)">' + t + '</text>';
    }
    if (neg) inner += '<circle cx="' + x(0) + '" cy="' + y + '" r="3.5" fill="var(--warm)"/>' +
      '<text x="' + x(0) + '" y="' + (y - 12) + '" text-anchor="middle" font-size="11" fill="var(--warm)">0</text>';
    inner += '<line x1="' + x(v) + '" y1="' + y + '" x2="' + x(v) + '" y2="' + (y - 26) + '" stroke="var(--accent)" stroke-width="2.5"/>' +
      '<circle cx="' + x(v) + '" cy="' + (y - 30) + '" r="6" fill="var(--accent)"/>' +
      '<text x="' + x(v) + '" y="' + (y - 40) + '" text-anchor="middle" font-size="13" font-weight="700" fill="var(--accent)">' + v + '</text>';
    host.querySelector("#nl-viz").innerHTML = B(W, 86, inner, "数轴", 430);
    host.querySelector("#nl-vv").textContent = v;
    const nb = [];
    if (v - stp >= min) nb.push("左边一格是 <b>" + (v - stp) + "</b>");
    if (v + stp <= max) nb.push("右边一格是 <b>" + (v + stp) + "</b>");
    host.querySelector("#nl-out").innerHTML = nb.length ? "现在在 " + v + " 的位置：" + nb.join("，") + "。" : "到最边上了。";
    if (neg) host.querySelector("#nl-out").innerHTML += "<br>" + (v < 0
      ? "它在 0 的<b>左边</b>，比 0 小 " + Math.abs(v) + "，写作 <b>" + v + "</b>，读作「负" + Math.abs(v) + "」。"
      : (v > 0 ? "它在 0 的<b>右边</b>，比 0 大 " + v + "。" : "它就是 0 —— 正数和负数的分界。"));
  }
  host.querySelector("#nl-v").oninput = draw;
  draw();
};

/* ⑤ 比大小 */
KIDS.W.compare = function(host, step){
  const pairs = step.pairs || [[8, 5], [38, 42], [7, 12]];
  host.innerHTML = '<p class="whint">每一行点一下「>」「<」或「=」，看看对不对。</p>' +
    pairs.map(function(p, i){
      return '<div class="wcard" style="display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:10px" data-row="' + i + '">' +
        '<b style="font-size:24px">' + p[0] + '</b>' +
        '<button class="wbtn" data-i="' + i + '" data-op="&gt;">&gt;</button>' +
        '<button class="wbtn" data-i="' + i + '" data-op="&lt;">&lt;</button>' +
        '<button class="wbtn" data-i="' + i + '" data-op="=">=</button>' +
        '<b style="font-size:24px">' + p[1] + '</b>' +
        '<span class="wres" data-fb="' + i + '" style="flex:1;text-align:left"></span>' +
        '</div>';
    }).join("") + '<div class="wsum" id="cp-out"></div>';
  let right = 0;
  $$("[data-op]").forEach(function(b){
    b.onclick = function(){
      const i = +b.dataset.i, a = pairs[i][0], c = pairs[i][1];
      const truth = a > c ? "&gt;" : (a < c ? "&lt;" : "=");
      const fb = host.querySelector('[data-fb="' + i + '"]');
      if (b.dataset.op === truth){
        fb.innerHTML = '<b style="color:var(--ok)">对了！</b>';
        if (!fb.dataset.on){ fb.dataset.on = "1"; right++; }
      } else {
        fb.innerHTML = '<b style="color:var(--no)">再想想</b>';
      }
      const sa = String(a), sc = String(c);
      let why;
      if (sa.length !== sc.length) why = "先看位数：<b>" + sa.length + " 位数</b> 和 <b>" + sc.length + " 位数</b>，位数多的那个大。";
      else if (a === c) why = "一样大，用「=」。";
      else {
        const da = sa.split(""), dc = sc.split("");
        let k = 0; while (da[k] === dc[k]) k++;
        why = "位数一样，从最高位比起：" + (k > 0 ? "前面都一样，看第 " + (k + 1) + " 位 —— " : "") +
              "<b>" + da[k] + "</b> 和 <b>" + dc[k] + "</b>，" + da[k] + " 大。";
      }
      host.querySelector("#cp-out").innerHTML = (right === pairs.length ? "全部答对！" : "") + why;
    };
  });
};

/* ⑥ 凑十法 */
KIDS.W.make10 = function(host, step){
  const a = step.a || 8, b = step.b || 5;
  const need = 10 - a;
  host.innerHTML = '<div class="viz" id="m-viz"></div>' +
    '<div class="wrow"><button class="wbtn" id="m-1">① 把 ' + b + ' 拆成 ' + need + ' 和 ' + (b - need) + '</button>' +
    '<button class="wbtn" id="m-2">② 先凑成 10</button>' +
    '<button class="wbtn" id="m-3">③ 再加剩下的</button></div>' +
    '<div class="wsum" id="m-out"></div>';
  const S = 46, pad = 12;
  function draw(filledA, filledInto, filledRest, label){
    let inner = "";
    for (let i = 0; i < 10; i++){
      const col = i % 5, row = Math.floor(i / 5), x = pad + col * S, y = pad + row * S;
      const on = i < filledA + filledInto;
      inner += '<rect x="' + x + '" y="' + y + '" width="' + (S - 5) + '" height="' + (S - 5) + '" rx="7" fill="' +
        (on ? "var(--accent)" : "var(--panel)") + '" stroke="var(--line)" stroke-width="1.4"/>';
    }
    let rest = "";
    for (let i = 0; i < b - need; i++){
      const x = pad + i * (S - 6), y = pad * 2 + S * 2 - 8;
      rest += '<circle cx="' + (x + 18) + '" cy="' + (y + 14) + '" r="9" fill="' + (i < filledRest ? "var(--warm)" : "var(--line)") + '"/>';
    }
    inner += '<text x="' + pad + '" y="' + (pad * 2 + S * 2 + 34) + '" font-size="13" fill="var(--muted)">' + (label || "") + '</text>';
    host.querySelector("#m-viz").innerHTML = B(pad * 2 + S * 5, pad * 2 + S * 2 + 46, inner + rest, "凑十法", 340);
  }
  draw(0, 0, 0, a + " + " + b);
  host.querySelector("#m-1").onclick = function(){
    draw(0, 0, 0, b + " = " + need + " + " + (b - need) + "　（因为 " + a + " 还差 " + need + " 就凑满 10）");
    host.querySelector("#m-out").innerHTML = a + " 差 <b>" + need + "</b> 就凑满 10，所以把 " + b + " 拆成 <b>" + need + "</b> 和 <b>" + (b - need) + "</b>。";
  };
  host.querySelector("#m-2").onclick = function(){
    draw(a, need, b - need, a + " + " + need + " = 10");
    host.querySelector("#m-out").innerHTML = a + " + " + need + " = <b>10</b>，十格阵正好装满。";
  };
  host.querySelector("#m-3").onclick = function(){
    draw(a, need, b - need, "10 + " + (b - need) + " = " + (a + b));
    host.querySelector("#m-out").innerHTML = "10 + " + (b - need) + " = <b>" + (a + b) + "</b>。所以 " + a + " + " + b + " = " + (a + b) + "。" +
      "<br>凑十法就是把「难算的」变成「一眼看出的」：先凑满 10，再加剩下的。";
  };
};

/* ⑦ 竖式加减 */
KIDS.W.vertical = function(host, step){
  const a = step.a || 34, b = step.b || 28, op = step.op || "+";
  const A = String(Math.max(a, b)).split(""), Bb = String(Math.min(a, b)).split("");
  const width = Math.max(A.length, Bb.length);
  const pad0 = arr => new Array(width - arr.length).fill("0").concat(arr);
  const da = (op === "-" ? String(Math.max(a, b)) : String(a)).padStart(width, "0").split("");
  const db = (op === "-" ? String(Math.min(a, b)) : String(b)).padStart(width, "0").split("");
  const res = (op === "-" ? Math.max(a, b) - Math.min(a, b) : a + b);
  const order = op === "+" ? [width - 1, width - 2, width - 3].filter(function(i){ return i >= 0; })
                           : [width - 1, width - 2, width - 3].filter(function(i){ return i >= 0; });
  const label = ["个位", "十位", "百位"];
  let digits = new Array(width).fill("");
  let carry = 0, stepIdx = 0;
  host.innerHTML = '<div class="viz" id="v-viz"></div>' +
    '<div class="wrow"><button class="wbtn" id="v-go">算下一位</button>' +
    '<button class="wbtn" id="v-rs" style="background:transparent;color:var(--muted);border-color:var(--line)">重来</button></div>' +
    '<div class="wsum" id="v-out"></div>';
  function draw(note){
    const S = 34, pad = 26, y0 = 24;
    let inner = "";
    for (let i = 0; i < width; i++){
      const x = pad + i * S + 26;
      inner += '<text x="' + x + '" y="' + (y0 - 6) + '" text-anchor="middle" font-size="11" fill="var(--muted)">' + (label[width - 1 - i] || "") + '</text>';
      inner += '<text x="' + x + '" y="' + (y0 + 32) + '" text-anchor="middle" font-size="20">' + da[i] + '</text>';
      if (i === width - 1) inner += '<text x="' + (x - 24) + '" y="' + (y0 + 32) + '" text-anchor="middle" font-size="20" fill="var(--accent)">' + op + '</text>';
      inner += '<text x="' + x + '" y="' + (y0 + 62) + '" text-anchor="middle" font-size="20">' + db[i] + '</text>';
      if (carry && i === width - 1 - (stepIdx - 1) && op === "+") inner += '<text x="' + (x + 14) + '" y="' + (y0 + 32) + '" font-size="12" fill="var(--no)">+1</text>';
      inner += '<text x="' + x + '" y="' + (y0 + 106) + '" text-anchor="middle" font-size="22" font-weight="700" fill="var(--accent)">' + (digits[i] === "" ? "" : digits[i]) + '</text>';
    }
    inner += '<line x1="' + pad + '" y1="' + (y0 + 74) + '" x2="' + (pad + width * S + 52) + '" y2="' + (y0 + 74) + '" stroke="var(--line)" stroke-width="2"/>';
    if (note) inner += '<text x="' + pad + '" y="' + (y0 + 132) + '" font-size="12.5" fill="var(--muted)">' + note + '</text>';
    host.querySelector("#v-viz").innerHTML = B(pad * 2 + width * S + 60, 200, inner, "竖式", 300);
  }
  draw("");
  host.querySelector("#v-go").onclick = function(){
    if (stepIdx >= width) return;
    const i = width - 1 - stepIdx;
    const x = +da[i], y = +db[i];
    if (op === "+"){
      let s = x + y + carry;
      const old = carry; carry = s >= 10 ? 1 : 0;
      digits[i] = String(s % 10);
      draw(label[stepIdx] + "：" + x + " + " + y + (old ? " + " + old : "") + " = " + s + (carry ? "，写 " + (s % 10) + " 进 1" : ""));
      host.querySelector("#v-out").innerHTML = label[stepIdx] + "相加：" + x + " + " + y + (old ? " + 进位 " + old : "") + " = <b>" + s + "</b>" +
        (carry ? "，满十了 —— 写 <b>" + (s % 10) + "</b>，向前<b>进 1</b>。" : "。");
    } else {
      let x2 = x;
      let note = label[stepIdx] + "：";
      if (x2 < y){ x2 += 10; const prev = width - 2 - stepIdx, borrow = stepIdx + 1;
        if (prev >= 0) da[prev] = String(+da[prev] - 1);
        note += x + " 不够减 " + y + "，向" + (label[stepIdx + 1] || "前一位") + "借 1（借 1 当 10）→ " + x2 + " − " + y + " = " + (x2 - y);
      } else note += x2 + " − " + y + " = " + (x2 - y);
      digits[i] = String(x2 - y);
      draw(note);
      host.querySelector("#v-out").innerHTML = note + "，写 <b>" + digits[i] + "</b>。";
    }
    stepIdx++;
    if (stepIdx >= width) host.querySelector("#v-out").innerHTML += "<br>答案是 <b>" + res + "</b>。";
  };
  host.querySelector("#v-rs").onclick = function(){ digits = new Array(width).fill(""); carry = 0; stepIdx = 0; draw(""); host.querySelector("#v-out").innerHTML = ""; };
};

/* ⑧ 点子阵列 */
KIDS.W.dotarray = function(host, step){
  let rows = step.rows || 4, cols = step.cols || 3;
  const mode = step.mode || "mul";
  host.innerHTML = '<div class="viz" id="d-viz"></div>' +
    '<div class="ctl"><label>' + (mode === "mul" ? "每行几个" : "一行几个") + '</label><input type="range" id="d-c" min="2" max="6" step="1" value="' + cols + '"><output id="d-cv">' + cols + '</output></div>' +
    '<div class="ctl"><label>几行</label><input type="range" id="d-r" min="2" max="6" step="1" value="' + rows + '"><output id="d-rv">' + rows + '</output></div>' +
    '<div class="wsum" id="d-out"></div>';
  function draw(){
    const S = 26, pad = 10;
    let inner = "", k = 0;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++){
      k++;
      inner += '<circle cx="' + (pad + c * S + 10) + '" cy="' + (pad + r * S + 10) + '" r="7" fill="var(--accent)" opacity="' + (0.45 + 0.1 * r) + '"/>';
    }
    host.querySelector("#d-viz").innerHTML = B(pad * 2 + cols * S, pad * 2 + rows * S, inner, "点子阵列", 260);
    host.querySelector("#d-cv").textContent = cols;
    host.querySelector("#d-rv").textContent = rows;
    host.querySelector("#d-out").innerHTML = mode === "mul"
      ? "每行 <b>" + cols + "</b> 个，一共 <b>" + rows + "</b> 行 → " + cols + " + … 加 " + rows + " 次 = <b>" + (rows * cols) + "</b>。" +
        "<br>写成乘法：<b>" + rows + " × " + cols + " = " + (rows * cols) + "</b>（" + rows + " 个 " + cols + " 相加）。"
      : "<b>" + (rows * cols) + "</b> 个点子，每 " + cols + " 个一行，能分成 <b>" + rows + "</b> 行 → <b>" + (rows * cols) + " ÷ " + cols + " = " + rows + "</b>。" +
        "<br>除法就是「平均分」：分给几行、每行几个，用乘法口诀反着找。";
  }
  host.querySelector("#d-c").oninput = function(){ cols = +this.value; draw(); };
  host.querySelector("#d-r").oninput = function(){ rows = +this.value; draw(); };
  draw();
};

/* ⑨ 乘法口诀表 */
KIDS.W.timestable = function(host, step){
  host.innerHTML = '<p class="whint">点一个格子，看它和对面那格的口诀。</p><div id="tt-tbl" style="display:inline-grid;grid-template-columns:repeat(10,minmax(30px,1fr));gap:3px"></div>' +
    '<div class="wsum" id="tt-out"></div>';
  const host2 = host.querySelector("#tt-tbl");
  let h = '<span></span>' + nums(9).slice(1).map(function(c){ return '<span style="text-align:center;font-size:11.5px;color:var(--muted)">' + c + '</span>'; }).join("");
  for (let r = 1; r <= 9; r++){
    h += '<span style="text-align:center;font-size:11.5px;color:var(--muted)">' + r + '</span>';
    for (let c = 1; c <= 9; c++){
      h += '<button class="wbtn tt-1" data-r="' + r + '" data-c="' + c + '" style="padding:6px 2px;font-size:12px;min-height:32px">' + (r * c) + '</button>';
    }
  }
  host2.innerHTML = h;
  host2.querySelectorAll("[data-r]").forEach(function(b){
    b.onclick = function(){
      const r = +b.dataset.r, c = +b.dataset.c;
      host2.querySelectorAll("[data-r]").forEach(function(x){ x.style.outline = "none"; });
      b.style.outline = "2px solid var(--accent)";
      const mirror = host2.querySelector('[data-r="' + c + '"][data-c="' + r + '"]');
      if (mirror) mirror.style.outline = "2px dashed var(--warm)";
      host.querySelector("#tt-out").innerHTML = "口诀：<b>" + say10(r, c) + "</b>（" + r + " × " + c + " = " + (r * c) + "）。" +
        (r === c ? "<br>这是「正方形」那一格，自己跟自己。" : "<br>看虚线那格：" + c + " × " + r + " = " + (r * c) + " —— <b>口诀是同一句</b>，所以只需要背左边的 45 句。");
    };
  });
};

/* ⑩ 运算律 */
KIDS.W.oprule = function(host, step){
  let mode = step.mode || "swap";
  host.innerHTML = '<div class="wrow">' +
    '<button class="wbtn" data-m="swap">交换</button><button class="wbtn" data-m="group">结合</button><button class="wbtn" data-m="dist">分配</button></div>' +
    '<div class="viz" id="o-viz"></div><div class="wsum" id="o-out"></div>';
  function dots(n, color, y, x0, per){
    let s = "";
    for (let i = 0; i < n; i++){
      const c = i % per, r = Math.floor(i / per);
      s += '<circle cx="' + (x0 + c * 20 + 10) + '" cy="' + (y + r * 20 + 10) + '" r="7" fill="' + color + '" opacity=".85"/>';
    }
    return s;
  }
  function draw(){
    let inner = "", out = "";
    const W = 360, H = 130;
    if (mode === "swap"){
      inner += dots(3, "var(--accent)", 10, 10, 10) + dots(5, "var(--warm)", 10, 90, 10);
      inner += dots(5, "var(--warm)", 70, 10, 10) + dots(3, "var(--accent)", 70, 130, 10);
      inner += '<text x="10" y="62" font-size="12.5" fill="var(--muted)">3 + 5 = 8</text>' +
               '<text x="190" y="62" font-size="12.5" fill="var(--muted)">5 + 3 = 8</text>';
      out = "交换两个加数的位置，和不变：<b>3 + 5 = 5 + 3</b>。<br>乘也一样：4 × 5 = 5 × 4。";
    } else if (mode === "group"){
      inner += dots(3, "var(--accent)", 10, 10, 10) + dots(4, "var(--warm)", 10, 90, 10) + dots(5, "var(--ok)", 10, 180, 10);
      inner += '<text x="10" y="112" font-size="12.5" fill="var(--muted)">(3 + 4) + 5：先把前两组并起来</text>';
      out = "三组点子先并哪两组，最后总数都一样：<b>(3 + 4) + 5 = 3 + (4 + 5)</b>，都等于 12。<br>所以算 28 + 37 + 63 时，可以先算 37 + 63 = 100。";
    } else {
      inner += dots(6, "var(--accent)", 10, 10, 10) + dots(8, "var(--warm)", 10, 90, 10);
      inner += dots(6, "var(--accent)", 70, 10, 10) + dots(8, "var(--warm)", 70, 90, 10);
      inner += '<text x="10" y="62" font-size="12.5" fill="var(--muted)">(6 + 8) × 2：两行</text>' +
               '<text x="200" y="62" font-size="12.5" fill="var(--muted)">6×2 + 8×2</text>';
      out = "两行一起算，和分开算一样多：<b>(6 + 8) × 2 = 6 × 2 + 8 × 2</b>。<br>所以算 25 × 12 可以拆成 25 × 10 + 25 × 2。";
    }
    host.querySelector("#o-viz").innerHTML = B(W, H, inner, "运算律演示", 330);
    host.querySelector("#o-out").innerHTML = out;
  }
  host.querySelectorAll("[data-m]").forEach(function(b){
    b.onclick = function(){ mode = b.dataset.m; draw(); };
  });
  draw();
};
})();
