/* ============================================================
   学习馆 · 教师版共享引擎
   用法：
     <link rel="stylesheet" href="../assets/teacher.css">
     <div class="brand" id="brand"></div><nav class="tabs" id="tabs"></nav><button class="iconbtn" id="themeBtn">◐</button>
     ...
     <script src="../assets/teacher.js"></script>
     <script src="teacher-data.js"></script>     （window.TEACHER_DATA）
     <script>KIDS_TEACHER.boot(window.TEACHER_DATA);</script>
   ============================================================ */
window.KIDS_TEACHER = window.KIDS_TEACHER || {};
(function(){
"use strict";
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
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
const VIEWS = { progress: ["view-progress"], qa: ["view-qa"], teach: ["view-teach"] };
function showView(v){
  const set = VIEWS[v] || ["view-" + v];
  $$(".view").forEach(x => x.classList.toggle("active", set.indexOf(x.id) >= 0));
  $$(".tab[data-v]").forEach(x => x.setAttribute("aria-selected", String(x.dataset.v === v)));
  try { localStorage.setItem("kids-tab", v); } catch (e) {}
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderProgress(){
  const p = readProg();
  let doneQ = 0, doneLessons = 0, stars = 0, qScore = 0, qTotal = 0, qLessons = 0;
  const rows = [], miss = [];
  D.curriculum.forEach(function(c, i){
    const st = p[c.id] || {};
    const solved = Object.keys(st.solved || {}).length;
    const firstRight = Object.keys(st.first || {}).filter(function(k){ return st.first[k]; }).length;
    const quiz = st.quiz || null;
    doneQ += solved; stars += firstRight;
    if (st.done) doneLessons++;
    if (quiz){ qScore += quiz.score; qTotal += quiz.total; qLessons++; }
    if (st.missQ) Object.keys(st.missQ).forEach(function(k){ miss.push({ lesson: c.title, q: st.missQ[k], kind: "练习" }); });
    (st.quizMiss || []).forEach(function(q){ miss.push({ lesson: c.title, q: q, kind: "小考" }); });
    rows.push("<tr><td>" + (i + 1) + "</td><td>" + c.title + "</td><td>" + solved + " / " + c.practice + "</td><td>" +
      (firstRight ? "★" + firstRight : "—") + "</td><td>" + (quiz ? quiz.score + " / " + quiz.total : "还没考") + "</td><td>" +
      (st.done ? "学完" : "没学完") + "</td></tr>");
  });
  const totalQ = D.curriculum.reduce(function(a, c){ return a + c.practice; }, 0);
  const avg = qTotal ? Math.round(qScore / qTotal * 100) + "%" : "还没考";
  $("#pgKpis").innerHTML = [
    ["练习答对", doneQ + " / " + totalQ],
    ["学完的课", doneLessons + " / " + D.curriculum.length],
    ["小考平均", avg],
    ["一次就答对", stars + " 题"]
  ].map(function(x, i){
    return '<div class="kpi' + (i === 2 ? " quiz" : "") + '"><b>' + x[1] + '</b><span>' + x[0] + '</span></div>';
  }).join("");
  $("#pgTable").innerHTML = "<thead><tr><th>#</th><th>课</th><th>练习答对</th><th>一次答对</th><th>小考成绩</th><th>状态</th></tr></thead><tbody>" +
    rows.join("") + "</tbody>";
  $("#pgMiss").innerHTML = miss.length
    ? '<div class="card"><h3 style="font-size:15.5px">还需要再过一遍的题（' + miss.length + ' 道）</h3>' +
      '<div class="rows" style="margin-top:10px">' + miss.map(function(m){
        return '<div class="row"><span class="lbl">' + m.kind + '</span><div>' + m.q +
          '<br><span class="pageinfo">' + m.lesson + '</span></div></div>';
      }).join("") + '</div></div>'
    : '<div class="card" style="color:var(--muted)">暂时没有需要补的题。孩子做完练习和小考之后，答错的题会集中列在这里。</div>';
  $("#pgHint").textContent = progStale()
    ? "这套内容刚按课本重写过，旧进度已自动作废 —— 让孩子从第 1 课重新走一遍就好。"
    : (doneQ === 0
      ? "还没有开始。让孩子先去互动课堂从第 1 课走起。"
      : (miss.length ? "这些题就是下一步的复习清单。" : "到目前为止没有答错的题。"));
}

function boot(cfg){
  if (!cfg || !cfg.curriculum) { console.error("KIDS_TEACHER.boot: 缺少 curriculum"); return; }
  D = cfg;
  const T = D.title || "";
  document.title = "教师版 · " + T + " — 学习馆";
  $("#brand").innerHTML = '教师版 · 掌握程度与讲解大纲 <small>北师大版小学数学 · ' + T + '</small>';
  $("#tabs").innerHTML =
    '<button class="tab" role="tab" data-v="progress" aria-selected="true">掌握程度</button>' +
    '<button class="tab" role="tab" data-v="qa" aria-selected="false">易错与提问</button>' +
    '<button class="tab" role="tab" data-v="teach" aria-selected="false">教学大纲</button>' +
    '<a class="tab" href="' + (D.backHref || "../index.html") + '" style="text-decoration:none">← ' + (D.backLabel || "数学") + '</a>' +
    '<a class="tab" href="' + (D.courseHref || "course.html") + '" style="text-decoration:none">🎓 互动课堂（孩子版）</a>';
  $("#view-progress").innerHTML =
    '<h2 class="sec">孩子的掌握程度</h2>' +
    '<p class="lede">数据来自这台设备上「' + T + '」互动课堂的作答记录 —— 孩子每做完一课的小考，这里就会更新。进度存在浏览器里，换设备不同步。</p>' +
    '<div class="kpis" id="pgKpis"></div>' +
    '<div class="tblwrap" style="margin-top:16px"><table id="pgTable"></table></div>' +
    '<div id="pgMiss" style="margin-top:16px"></div>' +
    '<div class="filterbar" style="margin-top:16px;align-items:center">' +
      '<a class="fbtn" href="' + (D.courseHref || "course.html") + '" style="text-decoration:none">打开互动课堂 →</a>' +
      '<button class="fbtn" id="pgReset">清除本机进度</button>' +
      '<span class="pageinfo" id="pgHint"></span>' +
    '</div>';
  $("#view-qa").innerHTML =
    '<h2 class="sec">易错清单</h2><p class="lede">左边是孩子常说错的，右边是可以直接说出口的一句纠正。</p>' +
    '<div class="errgrid" id="errList"></div>' +
    '<h2 class="sec" style="margin-top:24px">可以问孩子的问题</h2>' +
    '<p class="lede">检验理解，不考记忆。点开看期望回答。</p><div id="qList"></div>';
  $("#view-teach").innerHTML = D.outlineHtml || "";
  $("#pagefoot").innerHTML =
    '<div>内容按北京师范大学出版社《义务教育教科书·数学》1—6 年级的编排顺序整理；文字、图示、练习均为原创制作，本站不收录教材原文或扫描件。</div>' +
    '<div>教材版权属北京师范大学出版社。本站仅作个人学习用途。源码仓库：<a href="https://github.com/moneyache/kids_study">github.com/moneyache/kids_study</a></div>';

  $("#errList").innerHTML = (D.errors || []).map(function(e){
    return '<div class="err"><div class="bad">' + e[0] + '</div><div class="fix">' + e[1] + '</div></div>';
  }).join("");
  $("#qList").innerHTML = (D.questions || []).map(function(x){
    return '<details><summary>' + x.q + '</summary><div class="ans">' + x.a + '</div></details>';
  }).join("");
  $$(".tab[data-v]").forEach(function(b){ b.onclick = function(){ showView(b.dataset.v); }; });
  $("#pgReset").onclick = function(){
    if (!confirm("清除这台设备上的学习进度？之后可以从第 1 课重新走一遍。")) return;
    try { localStorage.removeItem(D.key); } catch (e) {}
    renderProgress();
  };
  $("#themeBtn").onclick = function(){ setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"); };
  try {
    const t = localStorage.getItem("kids-theme");
    if (t === "dark") setTheme("dark");
  } catch (e) {}
  document.addEventListener("keydown", function(e){
    if (e.target.matches("input, select, textarea")) return;
    if (e.key === "t" || e.key === "T") setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
    if (e.key === "1") showView("progress");
    if (e.key === "2") showView("qa");
    if (e.key === "3") showView("teach");
  });
  renderProgress();
  try {
    const t = localStorage.getItem("kids-tab");
    if (t && VIEWS[t]) showView(t);
  } catch (e) {}
  window.KIDS_TEACHER.render = renderProgress;
}
window.KIDS_TEACHER.boot = boot;
})();
