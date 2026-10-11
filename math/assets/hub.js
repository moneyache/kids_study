/* ============================================================
   学习馆 · 数学首页（主题 tab）
   需要先加载：topics.js（window.TOPICS）+ 各主题的 data.js（登记到 window.KIDS_DATA）
   用法：KIDS_HUB.boot();
   ============================================================ */
window.KIDS_HUB = window.KIDS_HUB || {};
(function(){
"use strict";
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
let cur = 0;

function setTheme(t){
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem("kids-theme", t); } catch (e) {}
}
function readProg(key, v){
  try {
    const p = JSON.parse(localStorage.getItem(key) || "{}") || {};
    return (p.__v === v) ? p : {};              /* 内容版本不符 → 旧进度作废 */
  } catch (e) { return {}; }
}
function progStale(key, v){
  try {
    const p = JSON.parse(localStorage.getItem(key) || "{}") || {};
    return Object.keys(p).length > 0 && p.__v !== v;
  } catch (e) { return false; }
}
function dataOf(key){
  return (window.KIDS_DATA && window.KIDS_DATA[key]) || null;
}
function statsOf(t){
  const data = dataOf(t.key), p = readProg(t.key, data && data.v);
  const s = { lessons: 0, practice: 0, quiz: 0, ok: 0, done: 0, qScore: 0, qTotal: 0, has: !!data };
  if (data) data.lessons.forEach(function(L){
    s.lessons++;
    s.practice += L.steps.filter(function(x){ return x.t === "ask"; }).length;
    s.quiz += (L.quiz || []).length;
    const st = p[L.id];
    if (!st) return;
    s.ok += Object.keys(st.solved || {}).length;
    if (st.done) s.done++;
    if (st.quiz){ s.qScore += st.quiz.score; s.qTotal += st.quiz.total; }
  });
  s.avg = s.qTotal ? Math.round(s.qScore / s.qTotal * 100) + "%" : "—";
  s.pct = s.practice ? Math.round(s.ok / s.practice * 100) : 0;
  return s;
}

function renderTabs(){
  $("#topicTabs").innerHTML = window.TOPICS.map(function(t, i){
    const s = statsOf(t);
    const badge = s.has ? (s.ok ? s.ok + "/" + s.practice : "未开始") : "制作中";
    return '<button class="ttab' + (i === cur ? " on" : "") + '" data-i="' + i + '">' +
      '<span class="em">' + t.emoji + '</span>' + t.title +
      '<span class="bd">' + badge + '</span></button>';
  }).join("");
  $$(".ttab").forEach(function(b){
    b.onclick = function(){
      cur = +b.dataset.i;
      try { localStorage.setItem("kids-math-topic", window.TOPICS[cur].dir); } catch (e) {}
      renderTabs(); renderPanel();
    };
  });
}

function renderPanel(){
  const t = window.TOPICS[cur], data = dataOf(t.key), s = statsOf(t);
  if (!s.has){
    $("#panel").innerHTML = '<div class="panel"><h2 class="sec" style="margin-top:0">' + t.emoji + " " + t.title + '</h2>' +
      '<p class="lede">' + (t.desc || "") + '</p><p style="color:var(--muted)">这个主题的课程正在制作中，先把位置留出来。</p></div>';
    return;
  }
  const p = readProg(t.key, data && data.v);
  const stale = progStale(t.key, data && data.v);
  const rows = data.lessons.map(function(L, i){
    const st = p[L.id] || {};
    const q = Object.keys(st.solved || {}).length;
    const pr = L.steps.filter(function(x){ return x.t === "ask"; }).length;
    const stars = Object.keys(st.first || {}).filter(function(k){ return st.first[k]; }).length;
    return '<div class="lrow' + (st.done ? " done" : "") + '">' +
      '<span class="n">' + (st.done ? "✓" : (i + 1)) + '</span>' +
      '<span class="t">' + L.title + '<br><span class="q">' + L.sub + '</span></span>' +
      '<span class="q">练习 ' + q + '/' + pr + '</span>' +
      '<span class="q">小考 ' + (st.quiz ? st.quiz.score + "/" + st.quiz.total : "—") + '</span>' +
      '<span class="s">' + (stars ? "★" + stars : "") + '</span></div>';
  }).join("");

  $("#panel").innerHTML =
  '<h2 class="sec" id="p-title">' + t.title + ' <span class="tag">' + (t.tag || "已上线") + '</span></h2>' +
  '<p class="sub">' + (t.desc || data.desc || "") + '</p>' +
  '<div class="grid2">' +
    '<a class="card" href="' + t.dir + '/course.html">' +
      '<h3>🎓 互动课堂 <span class="tag">孩子用</span></h3>' +
      '<p>' + s.lessons + ' 课、一步一步点，边玩边学。每道题立刻判对错。</p>' +
      '<ul>' +
        '<li>' + s.lessons + ' 张本课小考：每课学完一张 4—5 题的考卷，做完立刻出成绩</li>' +
        '<li>' + s.practice + ' 道即时判题：答错给一句提示，不扣分，可以再试</li>' +
        '<li>★ 只记「第一次就答对」的题，进度存在你自己的浏览器里</li>' +
      '</ul>' +
      '<div class="go">开始上课 →</div>' +
    '</a>' +
    '<a class="card" href="' + t.dir + '/outline.html">' +
      '<h3>📋 教师版 <span class="tag">老师 / 家长用</span></h3>' +
      '<p>看孩子掌没掌握，以及每个知识点到底该怎么讲。</p>' +
      '<ul>' +
        '<li>掌握程度：每课练习进度、★、小考成绩，还有「还没答对的题」清单</li>' +
        '<li>易错清单 + 检验理解的问题（点击看答案）</li>' +
        '<li>教学大纲：这个主题怎么讲、和教材哪一册对应</li>' +
      '</ul>' +
      '<div class="go">打开教师版 →</div>' +
    '</a>' +
  '</div>' +
  '<h2 class="sec">掌握程度</h2>' +
  '<p class="sub">根据这台设备上「' + t.title + '」互动课堂的作答记录自动统计。</p>' +
  '<div class="panel">' +
    '<div class="meter"><b>' + s.ok + '</b><span>练习已答对 ／ 共 ' + s.practice + ' 题</span></div>' +
    '<div class="meter"><b>' + s.done + '</b><span>课已上完 ／ 共 ' + s.lessons + ' 课</span></div>' +
    '<div class="meter" style="margin:0"><b>' + s.avg + '</b><span>小考平均分（共 ' + s.quiz + ' 道考卷题）</span></div>' +
    '<div class="pbar"><i style="width:' + s.pct + '%"></i></div>' +
    rows +
    '<div class="rowbtn">' +
      '<a class="btn primary" href="' + t.dir + '/course.html">' + (s.ok === 0 ? "开始上课 →" : (s.ok >= s.practice ? "再走一遍全课 →" : "继续上课 →")) + '</a>' +
      '<button class="btn" data-reset="' + t.key + '">清除本主题进度</button>' +
    '</div>' +
    '<p class="hint">' + (stale ? "这套内容刚按课本重写过，旧进度已自动作废 —— 点「开始上课」从第 1 课重新走一遍就好。"
      : (s.ok === 0 ? "还没有开始（或换了设备）。" : "进度只存在当前浏览器，换设备不同步。")) + '</p>' +
  '</div>' +
  '<h2 class="sec">这个主题讲什么</h2>' +
  '<p class="sub">点开任一课都能随时跳回去重学；顺序是按教材螺旋排的。</p>' +
  '<div class="panel">' + data.lessons.map(function(L, i){
      return '<div class="lrow"><span class="n">' + (i + 1) + '</span>' +
        '<span class="t">' + L.title + '　<span class="q">' + L.sub + '</span></span>' +
        '<span class="q">练习 ' + L.steps.filter(function(x){ return x.t === "ask"; }).length + ' 题 · 小考 ' + (L.quiz || []).length + ' 题</span></div>';
    }).join("") + '</div>';

  $$("[data-reset]").forEach(function(b){
    b.onclick = function(){
      if (!confirm("清除「" + t.title + "」的学习进度？")) return;
      try { localStorage.removeItem(b.dataset.reset); } catch (e) {}
      renderTabs(); renderPanel();
    };
  });
}

function boot(){
  window.TOPICS = window.TOPICS || [];
  try {
    const d = localStorage.getItem("kids-math-topic");
    const i = window.TOPICS.findIndex(function(t){ return t.dir === d; });
    if (i >= 0) cur = i;
  } catch (e) {}
  $("#themeBtn").onclick = function(){ setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"); };
  try {
    const th = localStorage.getItem("kids-theme");
    if (th === "dark") setTheme("dark");
  } catch (e) {}
  document.addEventListener("keydown", function(e){
    if (e.target.matches("input, select, textarea")) return;
    if (e.key === "t" || e.key === "T") setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });
  renderTabs(); renderPanel();
  window.KIDS_HUB.render = function(){ renderTabs(); renderPanel(); };
}
window.KIDS_HUB.boot = boot;
})();
