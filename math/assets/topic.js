/* ============================================================
   学习馆 · 主题页共享引擎（一个数学主题的首页）
   用法：
     <link rel="stylesheet" href="../assets/topic.css">
     <div class="wrap" id="wrap"></div>
     <script src="data.js"></script>          （window.COURSE_DATA）
     <script src="../assets/topic.js"></script>
     <script>KIDS_TOPIC.boot({ data: window.COURSE_DATA, backHref: "../index.html" });</script>
   ============================================================ */
window.KIDS_TOPIC = window.KIDS_TOPIC || {};
(function(){
"use strict";
const $ = s => document.querySelector(s);
let D = null;

function setTheme(t){
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem("kids-theme", t); } catch (e) {}
}
function readProg(){
  try {
    const p = JSON.parse(localStorage.getItem(D.key) || "{}") || {};
    return (p.__v === D.v) ? p : {};            /* 内容版本不符 → 旧进度作废 */
  } catch (e) { return {}; }
}
function progStale(){
  try {
    const p = JSON.parse(localStorage.getItem(D.key) || "{}") || {};
    return Object.keys(p).length > 0 && p.__v !== D.v;
  } catch (e) { return false; }
}
function boot(cfg){
  const data = cfg.data;
  if (!data || !data.lessons){ console.error("KIDS_TOPIC.boot: 缺少 data.lessons"); return; }
  D = { key: data.key, v: data.v, title: data.title, sub: data.sub, desc: data.desc, lessons: data.lessons,
        courseHref: cfg.courseHref || "course.html", teacherHref: cfg.teacherHref || "outline.html",
        backHref: cfg.backHref || "../index.html", backLabel: cfg.backLabel || "数学" };
  document.title = data.title + " — 学习馆 · 数学";
  const C = D.lessons.map(function(L){
    return { id: L.id, title: L.title,
             desc: L.sub,
             practice: L.steps.filter(function(s){ return s.t === "ask"; }).length,
             quiz: (L.quiz || []).length };
  });
  const TOTAL = C.reduce(function(a, c){ return a + c.practice; }, 0);
  const TOTALQ = C.reduce(function(a, c){ return a + c.quiz; }, 0);
  const HOST = "https://moneyache.github.io/kids_study";

  $("#wrap").innerHTML =
  '<div class="crumb">' +
    '<a href="' + D.backHref + '">← ' + D.backLabel + '</a>' +
    '<span style="color:var(--muted)">数学 · ' + D.title + '</span>' +
    '<span class="sp"></span>' +
    '<button class="ico" id="themeBtn" title="切换深浅色 (T)">◐</button>' +
  '</div>' +
  '<header class="hero">' +
    '<div class="kicker">MATH · ' + (data.theme || "").toUpperCase() + '</div>' +
    '<h1>' + D.title + '<small style="display:block;font-size:15px;font-weight:500;color:var(--muted);margin-top:8px">' + (D.desc || "") + '</small></h1>' +
  '</header>' +
  '<h2 class="sec">两个入口</h2>' +
  '<p class="sub">孩子用左边，老师 / 家长用右边。</p>' +
  '<div class="grid2">' +
    '<a class="card" href="' + D.courseHref + '">' +
      '<h3>🎓 互动课堂 <span class="tag">孩子用</span></h3>' +
      '<p>' + C.length + ' 课、一步一步点，边玩边学。每道题立刻判对错。</p>' +
      '<ul>' +
        '<li>' + C.length + ' 张本课小考：每课学完一张 4—5 题的考卷，做完立刻出成绩</li>' +
        '<li>' + TOTAL + ' 道即时判题：答错给一句提示，不扣分，可以再试</li>' +
        '<li>★ 只记「第一次就答对」的题，进度存在你自己的浏览器里</li>' +
      '</ul>' +
      '<div class="go">开始上课 →</div>' +
    '</a>' +
    '<a class="card" href="' + D.teacherHref + '">' +
      '<h3>📋 教师版 <span class="tag">老师 / 家长用</span></h3>' +
      '<p>看孩子掌没掌握，以及每个知识点到底该怎么讲。</p>' +
      '<ul>' +
        '<li>掌握程度：每课练习进度、★、小考成绩，还有「还没答对的题」清单</li>' +
        '<li>易错清单 + 检验理解的问题（点击看答案）</li>' +
        '<li>教学大纲：这个主题怎么讲、分几课、和前后册怎么连</li>' +
      '</ul>' +
      '<div class="go">打开教师版 →</div>' +
    '</a>' +
  '</div>' +
  '<h2 class="sec">掌握程度</h2>' +
  '<p class="sub">根据这台设备上「互动课堂」的作答记录自动统计。</p>' +
  '<div class="panel">' +
    '<div class="meter"><b id="m-ok">0</b><span>练习已答对 ／ 共 ' + TOTAL + ' 题</span></div>' +
    '<div class="meter"><b id="m-lesson">0</b><span>课已上完 ／ 共 ' + C.length + ' 课</span></div>' +
    '<div class="meter" style="margin:0"><b id="m-quiz">—</b><span>小考平均分（共 ' + TOTALQ + ' 道考卷题）</span></div>' +
    '<div class="pbar"><i id="m-bar"></i></div>' +
    '<div id="lessonList"></div>' +
    '<div class="rowbtn">' +
      '<a class="btn primary" href="' + D.courseHref + '" id="cta">开始上课 →</a>' +
      '<button class="btn" id="reset">清除本机进度</button>' +
    '</div>' +
    '<p class="hint" id="hint"></p>' +
  '</div>' +
  '<h2 class="sec">这个主题讲什么</h2>' +
  '<p class="sub">按「认识 → 度量 → 用起来」的顺序排，和教材的螺旋顺序对齐但更适合连续讲。</p>' +
  '<div class="panel" id="syllabus"></div>' +
  '<footer>' +
    '<div>内容按北京师范大学出版社《义务教育教科书·数学》1—6 年级的编排顺序整理；文字、图示、练习均为原创制作，本站不收录教材原文或扫描件。</div>' +
    '<div>教材版权属北京师范大学出版社。本站仅作个人学习用途。</div>' +
    '<div>源码仓库：<a href="' + HOST + '">github.com/moneyache/kids_study</a></div>' +
  '</footer>';

  function render(){
    const p = readProg();
    let ok = 0, done = 0, qScore = 0, qTotal = 0, qLessons = 0;
    C.forEach(function(c){
      const st = p[c.id];
      if (!st) return;
      ok += Object.keys(st.solved || {}).length;
      if (st.done) done++;
      if (st.quiz){ qScore += st.quiz.score; qTotal += st.quiz.total; qLessons++; }
    });
    const avg = qTotal ? Math.round(qScore / qTotal * 100) + "%" : "—";
    $("#m-ok").textContent = ok;
    $("#m-lesson").textContent = done;
    $("#m-quiz").textContent = avg;
    $("#m-bar").style.width = (TOTAL ? Math.round(ok / TOTAL * 100) : 0) + "%";
    $("#cta").textContent = ok === 0 ? "开始上课 →" : (ok >= TOTAL ? "再走一遍全课 →" : "继续上课 →");
    $("#hint").textContent = progStale()
      ? "这套内容刚按课本重写过，旧进度已自动作废 —— 点「开始上课」从第 1 课重新走一遍就好。"
      : (ok === 0
      ? "还没有开始（或换了设备）。点「开始上课」从第 1 课走起。"
      : (ok >= TOTAL ? "练习全部答对过了。" + (qLessons ? "小考做了 " + qLessons + " 张，平均 " + avg + "。" : "建议把小考都做一遍，看看是不是真掌握了。")
                     : "进度只存在当前浏览器，换设备不同步；点「清除本机进度」可以让孩子从头再走一遍。"));
    $("#lessonList").innerHTML = C.map(function(c, i){
      const st = p[c.id] || {};
      const q = Object.keys(st.solved || {}).length;
      const stars = Object.keys(st.first || {}).filter(function(k){ return st.first[k]; }).length;
      return '<div class="lrow' + (st.done ? " done" : "") + '">' +
        '<span class="n">' + (st.done ? "✓" : (i + 1)) + '</span>' +
        '<span class="t">' + c.title + '<br><span class="q">' + c.desc + '</span></span>' +
        '<span class="q">练习 ' + q + '/' + c.practice + '</span>' +
        '<span class="q">小考 ' + (st.quiz ? st.quiz.score + "/" + st.quiz.total : "—") + '</span>' +
        '<span class="s">' + (stars ? "★" + stars : "") + '</span></div>';
    }).join("");
    $("#syllabus").innerHTML = C.map(function(c, i){
      return '<div class="lrow"><span class="n">' + (i + 1) + '</span>' +
        '<span class="t">' + c.title + '　<span class="q">' + c.desc + '</span></span>' +
        '<span class="q">练习 ' + c.practice + ' 题 · 小考 ' + c.quiz + ' 题</span></div>';
    }).join("");
  }
  $("#themeBtn").onclick = function(){ setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"); };
  try {
    const t = localStorage.getItem("kids-theme");
    if (t === "dark") setTheme("dark");
  } catch (e) {}
  $("#reset").onclick = function(){
    if (!confirm("清除本机学习进度？之后可以从第 1 课重新走一遍。")) return;
    try { localStorage.removeItem(D.key); } catch (e) {}
    render();
  };
  document.addEventListener("keydown", function(e){
    if (e.target.matches("input, select, textarea")) return;
    if (e.key === "t" || e.key === "T") setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });
  render();
  window.KIDS_TOPIC.render = render;
}
window.KIDS_TOPIC.boot = boot;
})();
