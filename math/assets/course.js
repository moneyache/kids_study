/* ============================================================
   学习馆 · 互动课堂共享引擎
   用法：
     <link rel="stylesheet" href="../assets/course.css">
     <script src="../assets/course.js"></script>
     <script src="../assets/widgets.geo.js"></script>   （按主题可选）
     <script src="data.js"></script>                    （window.COURSE_DATA）
     <script>KIDS.boot(window.COURSE_DATA);</script>
   数据格式：{ key, title, sub, desc, lessons:[{id,title,sub,steps:[...],quiz:[...]}], art }
   步骤类型：{t:"say",title,text,art?} {t:"play",title,text?,widget,...} {t:"ask",...} {t:"end"}
   ============================================================ */
window.KIDS = window.KIDS || { W: {}, ART: {} };
(function(){
"use strict";
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
window.KIDS.$ = $; window.KIDS.$$ = $$;

let S = null, prog = {}, cur = { li: 0, si: 0 };
let qmode = false, qi = 0, qres = [];

/* ---------- 存储 ---------- */
function save(){ try { localStorage.setItem(S.key, JSON.stringify(prog)); } catch (e) {} }
function P(id){ if (!prog[id]) prog[id] = { done: false, first: {}, solved: {}, missQ: {} };
  if (!prog[id].solved) prog[id].solved = {};
  if (!prog[id].missQ) prog[id].missQ = {};
  return prog[id]; }

/* ---------- 统计 ---------- */
function asks(L){ return L.steps.filter(function(s){ return s.t === "ask"; }).length; }
function totalQs(){ return S.lessons.reduce(function(a, L){ return a + asks(L); }, 0); }
function solvedQs(){
  return S.lessons.reduce(function(a, L){ const p = prog[L.id]; return a + (p ? Object.keys(p.solved).length : 0); }, 0);
}
function updateProgress(){
  const t = totalQs(), s = solvedQs();
  const qd = S.lessons.filter(function(L){ const p = prog[L.id]; return p && p.quiz; }).length;
  $("#prog-txt").textContent = "练习 " + s + " / " + t + " 题　·　小考 " + qd + " / " + S.lessons.length + " 课";
  $("#prog-bar").style.width = (t ? (s / t * 100) : 0) + "%";
}

/* ---------- 侧栏 ---------- */
function renderRail(){
  $("#railList").innerHTML = S.lessons.map(function(L, i){
    const p = P(L.id), qn = asks(L), ok = Object.keys(p.solved).length;
    let qi2 = "";
    if (L.quiz && L.quiz.length){
      const best = p.quiz ? Math.max(p.quiz.best || 0, p.quiz.score || 0) : 0;
      qi2 = " · 小考 " + best + "/" + L.quiz.length;
    }
    return '<button class="ls ' + (p.done ? "done" : "") + '" data-li="' + i + '" aria-current="' + (i === cur.li) + '">' +
      '<span class="no">' + (p.done ? "✓" : (i + 1)) + '</span>' +
      '<span><span class="tt">' + L.title + '</span><br><span class="sub">' + L.sub + ' · ' + ok + '/' + qn + ' 题' + qi2 + '</span></span>' +
      (p.done ? '<span class="chk">★</span>' : "") + '</button>';
  }).join("");
  $$(".ls").forEach(function(b){
    b.onclick = function(){ cur.li = +b.dataset.li; cur.si = 0; qmode = false; renderStage(); };
  });
}

/* ---------- 通用 ---------- */
function navBtn(label, disabled){
  return '<div class="lnav"><button class="btn primary" id="nav-next"' + (disabled ? " disabled" : "") + '>' + label + '</button></div>';
}
function dotsHtml(L, i){
  const idx = (i === undefined ? cur.si : i);
  return '<div class="dots">' + L.steps.map(function(_, j){
    return '<i class="' + (j < idx ? "past" : (j === idx ? "on" : "")) + '"></i>';
  }).join("") + '</div>';
}
function artHtml(key){
  if (!key) return "";
  const fn = (S.art && S.art[key]) || (window.KIDS.ART && window.KIDS.ART[key]);
  return fn ? fn() : "";
}
/* 情境插图（KIDS.pic 里预置的场景）与自定义场景 HTML */
function picHtml(key){
  const fn = key && window.KIDS.pic && window.KIDS.pic[key];
  return fn ? '<div class="viz">' + fn() + '</div>' : "";
}
function sceneHtml(s){
  return (s.art ? artHtml(s.art) : "") + picHtml(s.pic) + (s.html ? '<div class="viz">' + s.html + '</div>' : "");
}
/* 分步演示里模拟"点一下/拖一下"部件上的控件 */
function runAct(a){
  if (!a) return;
  const host = $("#whost") || document;
  if (typeof a === "string"){
    const el = host.querySelector(a) || document.querySelector(a);
    if (el) el.click();
  } else if (a.sel){
    const el = host.querySelector(a.sel) || document.querySelector(a.sel);
    if (!el) return;
    if (a.value !== undefined) el.value = a.value;
    if (a.click) el.click();
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }
}
function norm(v){
  return String(v).replace(/[０-９．－]/g, function(c){
    return c === "．" ? "." : (c === "－" ? "-" : String.fromCharCode(c.charCodeAt(0) - 65248));
  }).replace(/\s/g, "");
}
function isRight(s, got){
  if (s.type === "choice") return (+got === s.answer);
  const v = parseFloat(norm(got));
  return isFinite(v) && Math.abs(v - s.answer) <= (s.tol || 0.001);
}
function answerText(s){
  return s.type === "choice" ? s.options[s.answer] : (s.answer + " " + (s.unit || ""));
}
function mark(s, ok){
  const p = P(S.lessons[cur.li].id);
  if (!(cur.si in p.first)) { p.first[cur.si] = !!ok; }
  if (ok) { p.solved[cur.si] = true; delete p.missQ[cur.si]; }
  else { p.missQ[cur.si] = s.q || ""; }
  save();
}

/* ---------- 课堂（教学步骤） ---------- */
function renderStage(){
  if (qmode) return renderQuiz();
  const L = S.lessons[cur.li], s = L.steps[cur.si], st = $("#stage");
  let html = dotsHtml(L) + '<div class="kicker">第 ' + (cur.li + 1) + ' 课 · ' + L.title + '　' + (cur.si + 1) + '/' + L.steps.length + '</div>';

  if (s.t === "say"){
    html += '<h2>' + (s.title || "") + '</h2><p class="big">' + s.text + '</p>' + sceneHtml(s) + navBtn("看明白了，继续 →");
  } else if (s.t === "play"){
    html += '<h2>' + (s.title || "动手试试") + '</h2>' + (s.text ? '<p class="big">' + s.text + '</p>' : "") +
      '<div class="widget" id="whost"></div>' + navBtn("我试过了，继续 →");
  } else if (s.t === "demo"){
    const dc = s.script || [];
    html += '<h2>' + (s.title || "看一看") + '</h2>' + (s.text ? '<p class="big">' + s.text + '</p>' : "") +
      sceneHtml(s) +
      '<div class="widget" id="whost"></div>' +
      '<div class="demo">' +
        (dc.length ? '<div class="dots" id="d-dots">' + dc.map(function(_, i){ return '<i class="' + (i === 0 ? "on" : "") + '"></i>'; }).join("") + '</div>' +
          '<p class="narration" id="d-say"><span class="nico">🔎</span><span>' + dc[0] + '</span></p>' : "") +
        '<div class="lnav">' + (dc.length > 1 ? '<button class="btn" id="d-next">下一步 →</button>' : "") + '</div>' +
      '</div>' + navBtn("继续 →", dc.length > 1);

  } else if (s.t === "ask"){
    const qn = L.steps.slice(0, cur.si + 1).filter(function(x){ return x.t === "ask"; }).length;
    let body;
    if (s.type === "choice"){
      body = '<div class="opts">' + s.options.map(function(o, i){
        return '<button class="opt" data-i="' + i + '"><span class="ol">' + "ABCD"[i] + '</span><span>' + o + '</span></button>';
      }).join("") + '</div>';
    } else {
      body = '<div class="numrow"><input class="numin" id="ans-in" type="text" inputmode="decimal" placeholder="数字"><span class="unit">' + (s.unit || "") +
        '</span><button class="btn primary" id="ans-go">提交</button></div>';
    }
    html += '<div class="kicker">第 ' + qn + ' 题</div><h2>' + s.q + '</h2>' + body + '<div class="fb" id="ans-fb"></div>' + navBtn("继续 →", true);
  } else if (s.t === "note"){
    html += sceneHtml(s) + '<div class="notecard"><span class="nico">' + (s.icon || "💡") + '</span><div>' + s.text +
      (s.small ? '<small>' + s.small + '</small>' : "") + '</div></div>' + navBtn("记住了，继续 →");
  } else {
    const p = P(L.id);
    const first = Object.keys(p.first).filter(function(k){ return p.first[k]; }).length;
    p.done = true; save();
    const next = cur.li < S.lessons.length - 1 ? S.lessons[cur.li + 1].title : "全课结束";
    const hasQuiz = !!(L.quiz && L.quiz.length);
    const best = p.quiz ? Math.max(p.quiz.best || 0, p.quiz.score || 0) : 0;
    html += '<h2>这一课学完了 ' + "★".repeat(Math.max(first, 0)) + '</h2>' +
      '<p class="big">' + L.title + '：一共 ' + asks(L) + ' 道练习，你第一次就答对了 <b>' + first + '</b> 道。' +
      (first === asks(L) ? '<br>全部一次答对，太稳了！' : '<br>答错的那些，回头再做一遍就记住了。') + '</p>' +
      '<div class="note">下一课：' + next + '</div>' +
      (hasQuiz ? '<p class="big" style="margin-top:14px">📝 想知道这一课掌握了多少？做一张 <b>本课小考</b>，' + L.quiz.length + ' 道题，做完立刻出成绩。' +
        (best ? '（上次最好成绩 <b>' + best + ' / ' + L.quiz.length + '</b>）' : '') + '</p>' : '') +
      '<div class="lnav">' +
      (hasQuiz ? '<button class="btn primary" id="go-quiz">开始本课小考（' + L.quiz.length + ' 题）</button>' : "") +
      '<button class="btn" id="nav-next">' + (cur.li < S.lessons.length - 1 ? "先不考，下一课 →" : "回到第 1 课") + '</button>' +
      '<button class="btn ghost" id="nav-prev">← 重做这一课</button>' +
      '</div>';
  }
  st.innerHTML = html;

  if ((s.t === "play" || s.t === "demo") && window.KIDS.W[s.widget]) window.KIDS.W[s.widget]($("#whost"), s);
  if (s.t === "demo" && (s.script || []).length > 1){
    const dc = s.script, acts = s.acts || [], nbx = $("#nav-next");
    if (nbx) nbx.disabled = true;
    let di = 0;
    $("#d-next").onclick = function(){
      di++;
      const say = $("#d-say");
      if (say) say.innerHTML = '<span class="nico">🔎</span><span>' + (dc[di] || "") + '</span>';
      $$("#d-dots i").forEach(function(d, i){ d.className = (i === di ? "on" : (i < di ? "past" : "")); });
      runAct(acts[di - 1]);
      if (di >= dc.length - 1){ this.disabled = true; if (nbx) nbx.disabled = false; }
    };
  }
  if (s.t === "ask") bindAsk(s);
  const nb = $("#nav-next");
  if (nb) nb.onclick = function(){
    const LL = S.lessons[cur.li];
    if (cur.si < LL.steps.length - 1) cur.si++;
    else { cur.li = cur.li < S.lessons.length - 1 ? cur.li + 1 : 0; cur.si = 0; }
    renderStage();
  };
  const pb = $("#nav-prev");
  if (pb) pb.onclick = function(){ cur.si = 0; renderStage(); };
  const gq = $("#go-quiz");
  if (gq) gq.onclick = function(){ startQuiz(); };

  renderRail(); updateProgress();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindAsk(s){
  const fb = $("#ans-fb"), btn = $("#nav-next");
  function judge(got){
    if (!btn.disabled) return;
    if (isRight(s, got)){
      fb.className = "fb show ok";
      fb.innerHTML = "<b>答对了！</b>" + (s.why || "");
      btn.disabled = false;
      mark(s, true);
      if (s.type === "choice") $$(".opt").forEach(function(o){ if (+o.dataset.i === s.answer) o.classList.add("right"); });
      btn.focus();
    } else {
      fb.className = "fb show no";
      fb.innerHTML = "<b>再想想：</b>" + (s.hint || "把上面的图画一遍，也许就看出来了。");
      mark(s, false);
      if (s.type === "choice") $$(".opt").forEach(function(o){ if (+o.dataset.i === +got) { o.classList.add("wrong"); setTimeout(function(){ o.classList.remove("wrong"); }, 400); } });
    }
  }
  if (s.type === "choice"){
    $$(".opt").forEach(function(o){ o.onclick = function(){ judge(o.dataset.i); }; });
  } else {
    const inp = $("#ans-in");
    $("#ans-go").onclick = function(){ if (btn.disabled) judge(inp.value); };
    inp.onkeydown = function(e){ if (e.key === "Enter" && btn.disabled) judge(inp.value); };
    inp.focus();
  }
}

/* ---------- 本课小考 ---------- */
function curQuiz(){ return S.lessons[cur.li].quiz || []; }
function startQuiz(){ qmode = true; qi = 0; qres = []; renderQuiz(); }
function renderQuiz(){
  const L = S.lessons[cur.li], Q = curQuiz(), st = $("#stage");
  if (!Q.length){ qmode = false; return renderStage(); }
  const n = Q.length;
  let html = '<div class="qbar"><span class="pill">📝 本课小考</span>' +
    '<span class="kicker" style="margin:0">第 ' + (cur.li + 1) + ' 课 · ' + L.title + '</span></div>' +
    '<div class="dots">' + Q.map(function(_, i){
      return '<i class="' + (i < qi ? "past" : (i === qi ? "on" : "")) + '"></i>';
    }).join("") + '</div>';

  if (qi < n){
    const s = Q[qi];
    let body;
    if (s.type === "choice"){
      body = '<div class="opts">' + s.options.map(function(o, i){
        return '<button class="opt" data-i="' + i + '"><span class="ol">' + "ABCD"[i] + '</span><span>' + o + '</span></button>';
      }).join("") + '</div>';
    } else {
      body = '<div class="numrow"><input class="numin" id="ans-in" type="text" inputmode="decimal" placeholder="数字"><span class="unit">' + (s.unit || "") +
        '</span><button class="btn primary" id="ans-go">提交</button></div>';
    }
    html += '<div class="kicker">第 ' + (qi + 1) + ' / ' + n + ' 题</div><h2>' + s.q + '</h2>' + body +
      '<div class="fb" id="ans-fb"></div>' +
      '<div class="lnav"><button class="btn primary" id="q-next" disabled>' + (qi === n - 1 ? "看成绩 →" : "下一题 →") + '</button></div>';
  } else {
    const score = qres.filter(function(x){ return x === "ok"; }).length;
    const p = P(L.id);
    const best = Math.max(p.quiz ? Math.max(p.quiz.best || 0, p.quiz.score || 0) : 0, score);
    const wrongs = Q.map(function(s, i){ return { s: s, i: i }; }).filter(function(w){ return qres[w.i] !== "ok"; });
    p.quiz = { score: score, total: n, best: best, when: Date.now() };
    p.quizMiss = wrongs.map(function(w){ return w.s.q; });
    save();
    const verdict = score === n ? "满分！这一课是真的拿下了。" :
      (score >= Math.ceil(n * 0.75) ? "不错，大部分都掌握了。" : "有几题还不太稳，建议把这一课再走一遍。");
    html += '<div class="scoreBox"><div class="big">' + score +
        ' <span style="font-size:22px;color:var(--muted);font-weight:600">/ ' + n + '</span></div>' +
      '<div class="stars">' + "★".repeat(score) + "☆".repeat(n - score) + '</div>' +
      '<p class="big" style="margin:0">' + verdict + '</p>' +
      (best > score ? '<p class="big" style="margin-top:6px;color:var(--muted);font-size:15px">最好成绩：' + best + ' / ' + n + '</p>' : "") +
      '</div>' +
      (wrongs.length ? '<div class="wsum" style="background:var(--panel2);color:var(--text)">错的题：' +
        wrongs.map(function(w){
          return '<div class="missItem">' + w.s.q + '<br>正确答案：<span class="ans">' + answerText(w.s) + '</span>　' + (w.s.why || "") + '</div>';
        }).join("") + '</div>' : '') +
      '<div class="lnav"><button class="btn primary" id="q-again">再考一次</button>' +
      '<button class="btn" id="q-done">' + (cur.li < S.lessons.length - 1 ? "进入下一课 →" : "回到第 1 课") + '</button>' +
      '<button class="btn ghost" id="q-back">← 回到本课内容</button></div>';
  }
  st.innerHTML = html;

  if (qi < n){
    bindQuizAsk(Q[qi]);
  } else {
    $("#q-again").onclick = function(){ startQuiz(); };
    $("#q-done").onclick = function(){
      qmode = false;
      cur.li = cur.li < S.lessons.length - 1 ? cur.li + 1 : 0;
      cur.si = 0; renderStage();
    };
    $("#q-back").onclick = function(){ qmode = false; renderStage(); };
  }
  renderRail(); updateProgress();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function bindQuizAsk(s){
  const fb = $("#ans-fb"), btn = $("#q-next");
  let answered = false;
  function judge(got){
    if (answered) return;
    const ok = isRight(s, got);
    answered = true;
    qres[qi] = ok ? "ok" : "no";
    if (ok){
      fb.className = "fb show ok";
      fb.innerHTML = "<b>答对了！</b>" + (s.why || "");
      if (s.type === "choice") $$(".opt").forEach(function(o){ if (+o.dataset.i === s.answer) o.classList.add("right"); });
    } else {
      fb.className = "fb show no";
      fb.innerHTML = "<b>这题记下了。</b>正确答案是 <b>" + answerText(s) + "</b>　" + (s.why || "");
      if (s.type === "choice") $$(".opt").forEach(function(o){ if (+o.dataset.i === +got) o.classList.add("wrong"); });
    }
    btn.disabled = false;
    btn.focus();
  }
  if (s.type === "choice"){
    $$(".opt").forEach(function(o){ o.onclick = function(){ judge(o.dataset.i); }; });
  } else {
    const inp = $("#ans-in");
    $("#ans-go").onclick = function(){ judge(inp.value); };
    inp.onkeydown = function(e){ if (e.key === "Enter") judge(inp.value); };
    inp.focus();
  }
  btn.onclick = function(){ qi++; renderQuiz(); };
}

/* ---------- 主题 ---------- */
function setTheme(t){
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem("kids-theme", t); } catch (e) {}
}
try {
  const t = localStorage.getItem("kids-theme");
  if (t === "dark") setTheme("dark");
} catch (e) {}
document.addEventListener("keydown", function(e){
  if (e.target.matches("input, select, textarea")) return;
  if (e.key === "t" || e.key === "T") setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

function shell(){
  $("#brand").innerHTML = S.title + ' <small>' + (S.sub || "") + '</small>';
  $("#topbar").innerHTML =
    '<span id="prog-txt">练习 0 / 0 题</span>' +
    '<div class="pbar"><i id="prog-bar"></i></div>' +
    '<a class="lnk" href="' + (S.backHref || "../index.html") + '">← ' + (S.backLabel || "数学") + '</a>' +
    '<a class="lnk" href="' + (S.teacherHref || "outline.html") + '">教师版（掌握程度 / 考察题）</a>' +
    '<button class="ico" id="themeBtn" title="切换深浅色 (T)">◐</button>';
  $("#helpcard").innerHTML = '<h2 style="font-size:16px">怎么用</h2>' +
    '<p class="big" style="font-size:15.5px;margin:8px 0 0">' +
    '一步一步往下点就行。<b>蓝色的按钮都是可以动手玩的</b>；遇到题目，答错不会扣分，会给你一句提示，再试一次就好。' +
    '每课学完还有一张<b>小考卷</b>，做完立刻出成绩，错题会记给家长看。</p>';
  $("#pagefoot").innerHTML =
    '<div>' + (S.desc || S.title) + '</div>' +
    '<div>内容按北京师范大学出版社《义务教育教科书·数学》的编排顺序整理；文字、图示、练习均为原创制作，本站不收录教材原文或扫描件。</div>' +
    '<div>教材版权属北京师范大学出版社。本站仅作个人学习用途。源码仓库：<a href="https://github.com/moneyache/kids_study">github.com/moneyache/kids_study</a></div>';
  $("#themeBtn").onclick = function(){ setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"); };
}

function boot(cfg){
  if (!cfg || !cfg.lessons) { console.error("KIDS.boot: 缺少 lessons"); return; }
  S = cfg;
  if (!S.art) S.art = window.KIDS.ART || null;
  try { prog = JSON.parse(localStorage.getItem(S.key) || "{}") || {}; } catch (e) { prog = {}; }
  shell();
  renderStage();
  /* 供自动化测试与其它页面读取 */
  window.GEO_COURSE = { LESSONS: S.lessons, state: function(){ return { li: cur.li, si: cur.si }; }, key: S.key };
  window.KIDS.current = function(){ return S; };
}
window.KIDS.boot = boot;
})();
