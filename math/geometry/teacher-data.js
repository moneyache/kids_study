/* 教师数据 · 图形与几何 */
window.TEACHER_DATA = {
 "key": "geo-course-v1",
 "title": "图形与几何",
 "theme": "geometry",
 "curriculum": [
  {
   "id": "L1",
   "title": "认识立体图形",
   "practice": 2,
   "quiz": 4
  },
  {
   "id": "L2",
   "title": "面在体上",
   "practice": 2,
   "quiz": 4
  },
  {
   "id": "L3",
   "title": "长度和单位",
   "practice": 2,
   "quiz": 4
  },
  {
   "id": "L4",
   "title": "角：只看张口",
   "practice": 2,
   "quiz": 4
  },
  {
   "id": "L5",
   "title": "周长是一条线",
   "practice": 2,
   "quiz": 4
  },
  {
   "id": "L6",
   "title": "面积是一片面",
   "practice": 2,
   "quiz": 4
  },
  {
   "id": "L7",
   "title": "形状变了，什么没变",
   "practice": 3,
   "quiz": 4
  },
  {
   "id": "L8",
   "title": "体积是一个体",
   "practice": 2,
   "quiz": 4
  },
  {
   "id": "L9",
   "title": "圆：量出来的 3.14",
   "practice": 2,
   "quiz": 4
  },
  {
   "id": "L10",
   "title": "闯关：整条线走一遍",
   "practice": 8,
   "quiz": 5
  }
 ],
 "errors": [
  [
   "周长、面积不分",
   "周长是一条线，面积是一片面。"
  ],
  [
   "把长度单位当面积单位",
   "面积单位 = 长度单位前加「平方」：厘米 → 平方厘米。"
  ],
  [
   "进率混用，全都记成 10",
   "长度相邻 ×10，面积 ×100，体积 ×1000 —— 面有两条边、体有三条边同时放大。"
  ],
  [
   "看边长判断角的大小",
   "角的大小只看张口，与边画多长无关。"
  ],
  [
   "底和高不对应",
   "高必须垂直于所画的底；平行四边形有两组底和高。"
  ],
  [
   "三角形、梯形面积忘 ÷2",
   "÷2 是「两个拼一个」的记账，不是口诀。"
  ],
  [
   "圆锥体积忘 ÷3",
   "等底等高的圆锥，倒三次水才灌满圆柱。"
  ],
  [
   "半圆周长漏了直径",
   "半圆周长 = πr + 2r，不是 πr。"
  ],
  [
   "以为拉一拉面积不变",
   "长方形拉成平行四边形：周长不变，面积变小（高变小）。"
  ],
  [
   "把正方体叫正方形",
   "一年级起就把「体」和「形」分开念。"
  ]
 ],
 "questions": [
  {
   "q": "用同样长的绳子围长方形，面积能一样吗？",
   "a": "周长相同（例如 20 cm）时，1×9 的面积只有 9 cm²，5×5 却有 25 cm²。<b>周长一样，面积可以差很多</b>；正方形是其中最大的。→ 动手实验 ①"
  },
  {
   "q": "两个正方形拼成一个长方形，周长变了吗？面积变了吗？",
   "a": "面积不变（还是那两个正方形），<b>周长变小</b>：拼在一起的两条边被“藏”进去了，少了 2 条边长。"
  },
  {
   "q": "把长方形框拉成平行四边形，周长和面积谁变？",
   "a": "<b>周长不变，面积变小</b>。因为四条边的长度没变，但高变小了（高 = 斜边 × cosθ）。→ 动手实验 ⑤"
  },
  {
   "q": "圆柱的体积公式和长方体有什么关系？",
   "a": "都是<b>底面积 × 高</b>。长方体 V = abh（底面 a×b），圆柱 V = πr²h（底面 πr²）。所有直柱体都统一在这个式子里。→ 动手实验 ②"
  },
  {
   "q": "面积单位为什么是 100 的进率，长度却是 10？",
   "a": "边长从 1 cm 变成 1 dm 是 ×10；面积是两条边相乘，所以是 10×10 = <b>100</b>。体积再多一条边，就是 10×10×10 = <b>1000</b>。→ 动手实验 ④"
  },
  {
   "q": "1 平方米等于多少平方厘米？",
   "a": "100 × 100 = <b>10000</b> 平方厘米。"
  },
  {
   "q": "三角形的面积为什么要除以 2？",
   "a": "两个<b>完全一样</b>的三角形能拼成一个平行四边形，这个平行四边形的面积是「底 × 高」，一个三角形正好是它的一半。→ 动手实验 ⑤ 同款“拼一拼”思路"
  },
  {
   "q": "圆周率 3.14 是背下来的，还是一个固定的事实？",
   "a": "是固定的事实：<b>不管圆多大，周长 ÷ 直径总是同一个数</b>，约 3.14159…。应该让孩子用绳子量出来，而不是背。→ 动手实验 ③"
  }
 ],
 "outlineHtml": "    <h2 class=\"sec\">一句话总纲</h2>\n    <p class=\"lede\">同一个图形，先认出来，再量出来，最后动起来。翻页顺序是螺旋，知识本体是三条直线。</p>\n\n    <div class=\"thesis\">\n      12 册里「图形」出现过十几次，其实只有三件事各走了三遍：<b>认识</b>（它是什么样）、\n      <b>度量</b>（它有多大）、<b>运动</b>（它怎么变）。\n      三条线的关系是：<span class=\"hl\">认识给对象，度量给数，运动给关系</span>。\n    </div>\n\n    <div class=\"strandgrid\">\n      <div class=\"strand\">\n        <h3><i class=\"dot rec\"></i>认识 · 它是什么样</h3>\n        <p>升级的是「特征越来越准、分类越来越严」，不是换新东西。</p>\n        <div class=\"chain\">实物（1上）→ 平面图形（1下）→ 角（2下）→ 三角形四边形（4下）→ 圆（6上）→ 圆柱圆锥（6下）</div>\n      </div>\n      <div class=\"strand\">\n        <h3><i class=\"dot mea\"></i>度量 · 它有多大</h3>\n        <p>升级的是「量什么 / 用什么单位 / 为什么是这个单位」。</p>\n        <div class=\"chain\">长度（2上·2下）→ 角（4上）→ 周长（3上）→ 面积（3下）→ 多边形面积（5上）→ 体积（5下）→ 圆的度量（6上）</div>\n      </div>\n      <div class=\"strand\">\n        <h3><i class=\"dot mot\"></i>运动 · 它怎么变</h3>\n        <p>升级的是「从看形状变了，到看什么没变」。</p>\n        <div class=\"chain\">图形的变化（2上）→ 图形的运动（3下）→ 轴对称和平移（5上）→ 旋转（6下）</div>\n      </div>\n    </div>\n\n    <div class=\"kpis\" style=\"margin-bottom:16px\">\n      <div class=\"kpi\"><b>12</b><span>册教材，1—6 年级</span></div>\n      <div class=\"kpi\"><b>10</b><span>属于本线的单元</span></div>\n      <div class=\"kpi\"><b>4</b><span>次「观察物体」</span></div>\n      <div class=\"kpi\"><b>3</b><span>次关键对比</span></div>\n      <div class=\"kpi\"><b>8</b><span>个检验问题</span></div>\n    </div>\n\n    <h2 class=\"sec\">三条螺旋升层表</h2>\n    <p class=\"lede\">同一个主题，隔一两册升一层，而不是“换一个世界”。</p>\n    <div class=\"tblwrap\">\n      <table>\n        <thead><tr><th style=\"width:92px\">主题</th><th>第一层（1—2 年级）</th><th>第二层（3—4 年级）</th><th>第三层（5—6 年级）</th></tr></thead>\n        <tbody>\n          <tr><td><i class=\"dot rec\"></i> 认识</td><td>立体 / 平面的命名<br><span class=\"pageinfo\">1上·六 · 1下·四</span></td><td>角、三角形四边形的特征与分类<br><span class=\"pageinfo\">2下·六 · 4下·二</span></td><td>圆的特征、圆柱圆锥<br><span class=\"pageinfo\">6上·一 · 6下·一</span></td></tr>\n          <tr><td><i class=\"dot mea\"></i> 度量</td><td>长度单位：厘米米 → 分米毫米千米<br><span class=\"pageinfo\">2上·六 · 2下·四</span></td><td>角、周长、面积<br><span class=\"pageinfo\">4上·二 · 3上·五 · 3下·五</span></td><td>多边形面积、体积、圆的度量<br><span class=\"pageinfo\">5上·四 · 5下·四 · 6上·一</span></td></tr>\n          <tr><td><i class=\"dot mot\"></i> 运动</td><td>图形的变化<br><span class=\"pageinfo\">2上·四</span></td><td>图形的运动、轴对称和平移<br><span class=\"pageinfo\">3下·二 · 5上·二</span></td><td>旋转<br><span class=\"pageinfo\">6下·三</span></td></tr>\n          <tr><td><span class=\"pageinfo\">贯穿</span></td><td>观察物体<br><span class=\"pageinfo\">1下·二</span></td><td>观察物体<br><span class=\"pageinfo\">3上·二 · 4下·四</span></td><td>观察物体<br><span class=\"pageinfo\">6上·三</span></td></tr>\n        </tbody>\n      </table>\n    </div>\n\n    <h2 class=\"sec\" style=\"margin-top:22px\">度量链：本线主轴</h2>\n    <p class=\"lede\">长度 → 面积 → 体积 是<b>同一个动作</b>重复三遍：用单位去铺，只是铺在线上、面上、体里。</p>\n    <div class=\"chainline\">长度 → 角 → 周长(一条线) → 面积(一片面) → 多边形面积(转化) → 体积(一个体) → 圆(量出来的 π) → 柱锥(底面积×高)</div>\n    <div class=\"card\" style=\"margin-top:14px\">\n      <div class=\"rows\">\n        <div class=\"row\"><span class=\"lbl\">第 1 句话</span><div>长度、面积、体积不是三件事，是同一个动作在一维、二维、三维各做一遍。</div></div>\n        <div class=\"row\"><span class=\"lbl\">第 2 句话</span><div>进率随维度变：长度相邻 <b>×10</b>，面积相邻 <b>×100</b>，体积相邻 <b>×1000</b> —— 因为面积有两条边同时放大 10 倍，体积有三条边。</div></div>\n        <div class=\"row\"><span class=\"lbl\">第 3 句话</span><div>公式不是背的，是“数单位个数”数出来的：面积和体积公式都能从长方形出发推出来。</div></div>\n      </div>\n    </div>\n\n    <h2 class=\"sec\" style=\"margin-top:22px\">★ 三次关键对比</h2>\n    <p class=\"lede\">全大纲最值得停下来的三个地方，每个都配了一个可动手的实验。</p>\n    <div class=\"strandgrid\">\n      <div class=\"strand\"><h3>① 线 vs 面</h3><p><b>3上·五 周长</b> ↔ <b>3下·五 面积</b>。同一张纸，「框」是一圈线，「铺满」是一片面。</p><p style=\"color:var(--accent)\">→ 动手实验 ①</p></div>\n      <div class=\"strand\"><h3>② 面 vs 体</h3><p><b>5下·二 表面积</b> ↔ <b>5下·四 体积</b>。同一个盒子，「展开」是面，「塞满」是体。</p><p style=\"color:var(--accent)\">→ 动手实验 ②</p></div>\n      <div class=\"strand\"><h3>③ 形变 vs 量变</h3><p><b>5上·四 首节「分割移补」</b> + 长方形拉成平行四边形：形状变了，<b>什么没变</b>？</p><p style=\"color:var(--accent)\">→ 动手实验 ⑤</p></div>\n    </div>\n  \n<h2 class=\"sec\" style=\"margin-top:26px\">逐册大纲</h2>\n<p class=\"lede\">只列属于「图形与几何」这条线的单元，按册排列。</p>\n<h3 class=\"bookhd\">一年级上册 · 一上 <span class=\"pageinfo\">共 109 页 PDF</span></h3><article class=\"unit\" data-s=\"rec\"><div class=\"uhead\"><h3>六 认识图形</h3><span class=\"chip rec\">认识</span><span class=\"chip ghost\">起点</span></div><p class=\"what\">只做一件事：摸与认。长方体、正方体、圆柱、球，全是「体」。</p><div class=\"rows\"><div class=\"row\"><span class=\"lbl\">怎么讲</span><div><ul><li>鞋盒、魔方、易拉罐、皮球各来一个，滚一滚、推一推、摞一摞，按「能不能滚、有几个平平的面」分类。</li><li>不要求说定义，只要求叫得出、分得开。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">易错</span><div><ul><li>把「正方体」叫成「正方形」、把「球」叫成「圆」。从这一课起就把「体 / 形」两个字分开念。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">前连后接</span><div>1下·四 有趣的图形（面在体上）</div></div></div><div class=\"anchor\">一句话锚点：「这样的是「体」。」</div></article><article class=\"unit\" data-s=\"rec\"><div class=\"uhead\"><h3>五 位置与顺序</h3><span class=\"chip rec\">认识</span><span class=\"chip ghost\">铺垫</span></div><p class=\"what\">上下、前后、左右。为 1下「观察物体」预备方位语感。</p><div class=\"rows\"><div class=\"row\"><span class=\"lbl\">怎么讲</span><div><ul><li>站在教室中间说清“谁在谁的前面”，不必当图形课讲。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">前连后接</span><div>1下·二 观察物体</div></div></div></article><h3 class=\"bookhd\">一年级下册 · 一下 <span class=\"pageinfo\">共 99 页 PDF</span></h3><article class=\"unit\" data-s=\"rec\"><div class=\"uhead\"><h3>二 观察物体</h3><span class=\"chip rec\">认识</span><span class=\"chip ghost\">第 1 遍</span></div><p class=\"what\">从不同方向看同一个物体，看到的样子不同。</p><div class=\"rows\"><div class=\"row\"><span class=\"lbl\">怎么讲</span><div><ul><li>同一组积木，四个年级反复用：这里只要求“看到的不一样”。</li><li>单元名 OCR 未清，按教材常规单元名。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">前连后接</span><div>3上·二 · 4下·四 · 6上·三</div></div></div><div class=\"anchor\">一句话锚点：「换个位置看，样子就变了。」</div></article><article class=\"unit\" data-s=\"rec\"><div class=\"uhead\"><h3>四 有趣的图形</h3><span class=\"chip rec\">认识</span></div><p class=\"what\">平面图形：长方形、正方形、三角形、圆。</p><div class=\"rows\"><div class=\"row\"><span class=\"lbl\">怎么讲</span><div><ul><li>由立体「印」出平面：印一印、描一描。第一句话就是「面在体上」。</li><li>把 1上·六 的积木拿来，用它的面印出图形，孩子自己发现“原来这个面是这个形”。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">易错</span><div><ul><li>仍要守住「形」与「体」的区别。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">前连后接</span><div>1上·六 认识图形（立体）→ 本单元（平面），一次课连讲</div></div></div><div class=\"anchor\">一句话锚点：「面在体上。」</div></article><h3 class=\"bookhd\">二年级上册 · 二上 <span class=\"pageinfo\">共 119 页 PDF</span></h3><article class=\"unit\" data-s=\"mea\"><div class=\"uhead\"><h3>六 测量</h3><span class=\"chip mea\">度量</span><span class=\"chip ghost\">度量线的起点</span></div><p class=\"what\">厘米、米。</p><div class=\"rows\"><div class=\"row\"><span class=\"lbl\">怎么讲</span><div><ul><li>先制造困境：用铅笔量、用手量，为什么会吵架？逼出“要有一根人人一样长的尺子”。</li><li>再给厘米尺，让孩子量自己的课桌、铅笔。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">易错</span><div><ul><li>不从刻度 0 起量。</li><li>断尺量法：从刻度 3 量到 8，是 5 厘米，不是 8 厘米。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">前连后接</span><div>2下·四 测量（分米、毫米、千米）</div></div></div><div class=\"anchor\">一句话锚点：「量长度，要先有「单位」。」</div></article><article class=\"unit\" data-s=\"mot\"><div class=\"uhead\"><h3>四 图形的变化</h3><span class=\"chip mot\">运动</span><span class=\"chip ghost\">内容待核</span></div><p class=\"what\">观察图形的变化（目录仅给出单元名，具体内容以教材为准）。</p><div class=\"rows\"><div class=\"row\"><span class=\"lbl\">怎么讲</span><div><ul><li>作为运动线的起点，只要求“看出来变了”。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">前连后接</span><div>3下·二 图形的运动</div></div></div><div class=\"anchor\">一句话锚点：「变了吗？哪里变了？」</div></article><h3 class=\"bookhd\">二年级下册 · 二下 <span class=\"pageinfo\">共 109 页 PDF</span></h3><article class=\"unit\" data-s=\"mea\"><div class=\"uhead\"><h3>四 测量</h3><span class=\"chip mea\">度量</span></div><p class=\"what\">分米、毫米、千米。长度单位家族成形。</p><div class=\"rows\"><div class=\"row\"><span class=\"lbl\">怎么讲</span><div><ul><li>毫米 < 厘米 < 分米 < 米 < 千米，相邻进率 10（米 → 千米为 1000）。</li><li>用“身体尺”（一拃、一步）估一估，再用尺核实。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">易错</span><div><ul><li>单位换算只记 10，忘了米与千米之间是 1000。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">前连后接</span><div>2上·六 → 本单元 → 3上·五 周长</div></div></div><div class=\"anchor\">一句话锚点：「长度单位相邻 ×10。」</div></article><article class=\"unit\" data-s=\"rec\"><div class=\"uhead\"><h3>六 认识图形</h3><span class=\"chip rec\">认识</span></div><p class=\"what\">认识角：直角、锐角、钝角。</p><div class=\"rows\"><div class=\"row\"><span class=\"lbl\">怎么讲</span><div><ul><li>做活动角：两根硬纸条钉在一起，张一张、合一合。</li><li>角的大小用张口比，不用边比。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">易错</span><div><ul><li>角的大小与边画的长短无关 —— 全小学最顽固的一个错，必须用活动角反复演示。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">前连后接</span><div>4上·二 线与角（角的度量）</div></div></div><div class=\"anchor\">一句话锚点：「角的大小只看张口。」</div></article><h3 class=\"bookhd\">三年级上册 · 三上 <span class=\"pageinfo\">共 111 页 PDF</span></h3><article class=\"unit\" data-s=\"rec\"><div class=\"uhead\"><h3>二 观察物体</h3><span class=\"chip rec\">认识</span><span class=\"chip ghost\">第 2 遍</span></div><p class=\"what\">从不同方向看物体，看到的形状不同（第二遍）。</p><div class=\"rows\"><div class=\"row\"><span class=\"lbl\">怎么讲</span><div><ul><li>同一组积木，这次要求“画出看到的形状”。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">前连后接</span><div>1下·二 · 4下·四</div></div></div></article><article class=\"unit\" data-s=\"mea\"><div class=\"uhead\"><h3>五 周长</h3><span class=\"chip mea\">度量</span><span class=\"chip ghost\">★关键对比一</span></div><p class=\"what\">一条线：封闭图形一周的长度。长方形 C = 2(a+b)，正方形 C = 4a。</p><div class=\"rows\"><div class=\"row\"><span class=\"lbl\">怎么讲</span><div><ul><li>用绳子沿边绕一圈，再拉直去量。</li><li>把“一圈线”这个词说够，别急着上公式。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">易错</span><div><ul><li>与面积混用。</li><li>拼合后周长会变：两个正方形拼成长方形，少了 2 条边。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">前连后接</span><div>3下·五 面积（★对讲） · 2上·六 / 2下·四 长度单位</div></div></div><div class=\"anchor\">一句话锚点：「周长是一条线。」</div></article><h3 class=\"bookhd\">三年级下册 · 三下 <span class=\"pageinfo\">共 113 页 PDF</span></h3><article class=\"unit\" data-s=\"mea\"><div class=\"uhead\"><h3>五 面积</h3><span class=\"chip mea\">度量</span><span class=\"chip ghost\">★关键对比一</span></div><p class=\"what\">一个面：物体表面或封闭图形的大小。面积单位 cm²、m²；长方形 S = ab，正方形 S = a²。</p><div class=\"rows\"><div class=\"row\"><span class=\"lbl\">怎么讲</span><div><ul><li>与周长对讲：同一张纸，“框”是周长，“铺满”是面积。</li><li>用 1 cm² 小方格铺满再数，公式是数出来的。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">易错</span><div><ul><li>面积相邻单位进率是 100，不是 10（与长度不同，必须专门强调）。</li><li>周长与面积的单位混用（cm 与 cm²）。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">前连后接</span><div>3上·五 周长（★对讲） · 5上·四 多边形的面积</div></div></div><div class=\"anchor\">一句话锚点：「周长是一条线，面积是一片面。」</div><div class=\"verified\"><b>已核对</b>：教材用 1 平方厘米小纸片铺 1 平方分米大正方形，得出 1 平方分米 = 100 平方厘米、1 平方米 = 100 平方分米（PDF 第 60 页）。</div></article><article class=\"unit\" data-s=\"mea\"><div class=\"uhead\"><h3>四 千克、克、吨</h3><span class=\"chip mea\">度量</span><span class=\"chip ghost\">旁置</span></div><p class=\"what\">结构上同属「度量」：我们量过线、量过面，现在量“重量”。</p><div class=\"rows\"><div class=\"row\"><span class=\"lbl\">怎么讲</span><div><ul><li>顺带讲清“量什么用什么单位”。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">易错</span><div><ul><li>把质量单位与长度、面积单位混着估。</li></ul></div></div></div><div class=\"anchor\">一句话锚点：「量什么，用什么单位。」</div></article><article class=\"unit\" data-s=\"mot\"><div class=\"uhead\"><h3>二 图形的运动</h3><span class=\"chip mot\">运动</span><span class=\"chip ghost\">第 2 遍</span></div><p class=\"what\">图形的运动（第二遍）。</p><div class=\"rows\"><div class=\"row\"><span class=\"lbl\">怎么讲</span><div><ul><li>与 5上·二 轴对称和平移对看。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">前连后接</span><div>5上·二 轴对称和平移</div></div></div></article><h3 class=\"bookhd\">四年级上册 · 四上 <span class=\"pageinfo\">共 115 页 PDF</span></h3><article class=\"unit\" data-s=\"mea\"><div class=\"uhead\"><h3>二 线与角</h3><span class=\"chip mea\">度量</span><span class=\"chip ghost\">度量 + 认识</span></div><p class=\"what\">直线 / 射线 / 线段；角的度量（度）与量角器；锐角、直角、钝角、平角、周角。</p><div class=\"rows\"><div class=\"row\"><span class=\"lbl\">怎么讲</span><div><ul><li>角还可以“量”：给它一个数，就从“认角”升到“量角”。</li><li>量角器对齐：中心对顶点、零线对一边。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">易错</span><div><ul><li>量角器有两圈刻度，读错极其常见。</li><li>再次强调角的大小与边长无关。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">前连后接</span><div>2下·六 认识角</div></div></div><div class=\"anchor\">一句话锚点：「角也有大小，可以用「度」说出来。」</div></article><h3 class=\"bookhd\">四年级下册 · 四下 <span class=\"pageinfo\">共 117 页 PDF</span></h3><article class=\"unit\" data-s=\"rec\"><div class=\"uhead\"><h3>二 认识三角形和四边形</h3><span class=\"chip rec\">认识</span></div><p class=\"what\">三角形按角 / 按边分类；内角和 180°；三边关系；平行四边形与梯形的特征与高。</p><div class=\"rows\"><div class=\"row\"><span class=\"lbl\">怎么讲</span><div><ul><li>把三个角撕下来拼成一个平角，验证内角和。</li><li>画高：从顶点向对边作垂线。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">易错</span><div><ul><li>底与高必须互相垂直。</li><li>平行四边形有两组底和高。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">前连后接</span><div>5上·四 多边形的面积（前置）</div></div></div><div class=\"anchor\">一句话锚点：「三角形内角和 180°。」</div></article><article class=\"unit\" data-s=\"rec\"><div class=\"uhead\"><h3>四 观察物体</h3><span class=\"chip rec\">认识</span><span class=\"chip ghost\">第 3 遍</span></div><p class=\"what\">观察物体（第三遍），开始涉及“看到的范围”。</p><div class=\"rows\"><div class=\"row\"><span class=\"lbl\">怎么讲</span><div><ul><li>同一组积木，这次问“挡住什么、看到多大范围”。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">前连后接</span><div>1下·二 · 3上·二 · 6上·三</div></div></div></article><h3 class=\"bookhd\">五年级上册 · 五上 <span class=\"pageinfo\">共 125 页 PDF</span></h3><article class=\"unit\" data-s=\"mea\"><div class=\"uhead\"><h3>四 多边形的面积</h3><span class=\"chip mea\">度量</span><span class=\"chip ghost\">转化核心</span></div><p class=\"what\">平行四边形、三角形、梯形面积公式，但真正要讲的是「转化」。</p><div class=\"rows\"><div class=\"row\"><span class=\"lbl\">怎么讲</span><div><ul><li>所有公式都从长方形推出来：平行四边形 → 剪拼成长方形；三角形 → 两个拼成平行四边形；梯形 → 两个拼成平行四边形。</li><li>抓住“转化”，三个公式不用背。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">易错</span><div><ul><li>底与高不对应。</li><li>三角形与梯形公式里的 ÷2 是“两个拼一个”的记账，别当口诀背。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">前连后接</span><div>3下·五 面积 → 本单元 → 5下·四 体积</div></div></div><div class=\"anchor\">一句话锚点：「形状变了，面积没变 —— 所以能转化。」</div><div class=\"verified\"><b>已核对</b>：单元首节就是「比较图形的面积」，用分割、移补说明“图形变了、面积没变”，这是全单元的钥匙（5上 印刷 49 → PDF 第 53 页）。</div></article><article class=\"unit\" data-s=\"mea\"><div class=\"uhead\"><h3>六 组合图形的面积</h3><span class=\"chip mea\">度量</span></div><p class=\"what\">分割法 / 添补法求组合图形面积。</p><div class=\"rows\"><div class=\"row\"><span class=\"lbl\">怎么讲</span><div><ul><li>对“转化”的第二次练习：把不会算的图形，切成会算的图形。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">易错</span><div><ul><li>切错导致重复计算或漏算。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">前连后接</span><div>5上·四 多边形的面积</div></div></div><div class=\"anchor\">一句话锚点：「切成会算的。」</div></article><article class=\"unit\" data-s=\"mot\"><div class=\"uhead\"><h3>二 轴对称和平移</h3><span class=\"chip mot\">运动</span></div><p class=\"what\">轴对称、平移，运动线的中段。</p><div class=\"rows\"><div class=\"row\"><span class=\"lbl\">怎么讲</span><div><ul><li>与 3下·二 连看：从“看出来”到“画出来”。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">易错</span><div><ul><li>轴对称图形与“画对称轴”混。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">前连后接</span><div>3下·二 · 6下·三 旋转</div></div></div><div class=\"anchor\">一句话锚点：「动的是位置，不是形状。」</div></article><h3 class=\"bookhd\">五年级下册 · 五下 <span class=\"pageinfo\">共 111 页 PDF</span></h3><article class=\"unit\" data-s=\"mea\"><div class=\"uhead\"><h3>二 长方体（一）</h3><span class=\"chip mea\">度量</span><span class=\"chip ghost\">★关键对比二</span></div><p class=\"what\">面 / 棱 / 顶点；展开图；表面积。</p><div class=\"rows\"><div class=\"row\"><span class=\"lbl\">怎么讲</span><div><ul><li>表面积 = 把立体“展开成一张纸”求面积。</li><li>拿真盒子剪开，孩子自己数出六个面。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">易错</span><div><ul><li>展开图找不准，六个面配对待错。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">前连后接</span><div>本册·四 长方体（二）体积（★对讲）</div></div></div><div class=\"anchor\">一句话锚点：「展开，就变成了一个面积问题。」</div><div class=\"verified\"><b>已核对</b>：首节「长方体的认识」，面 / 棱 / 顶点，并明确讨论「正方体是特殊的长方体吗」（PDF 第 15 页）。</div></article><article class=\"unit\" data-s=\"mea\"><div class=\"uhead\"><h3>四 长方体（二）</h3><span class=\"chip mea\">度量</span><span class=\"chip ghost\">★关键对比二</span></div><p class=\"what\">体积与容积：cm³ / dm³ / m³，长 × 宽 × 高，1 dm³ = 1 L。</p><div class=\"rows\"><div class=\"row\"><span class=\"lbl\">怎么讲</span><div><ul><li>体积 = 往里面塞 1 cm³ 小方块，数有多少个。</li><li>与表面积并排对比“面”与“体”。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">易错</span><div><ul><li>cm² 与 cm³ 混。</li><li>容积与体积的差别（容器壁厚）。</li><li>体积相邻进率 1000。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">前连后接</span><div>6上·一 圆 → 6下·一 圆柱体积（底面积×高）</div></div></div><div class=\"anchor\">一句话锚点：「塞满它，数方块。」</div></article><h3 class=\"bookhd\">六年级上册 · 六上 <span class=\"pageinfo\">共 117 页 PDF</span></h3><article class=\"unit\" data-s=\"mea\"><div class=\"uhead\"><h3>一 圆</h3><span class=\"chip mea\">度量</span><span class=\"chip ghost\">认识 + 度量</span></div><p class=\"what\">圆心、半径、直径；周长 C = πd = 2πr；面积 S = πr²（化圆为方，剪拼成近似长方形）。</p><div class=\"rows\"><div class=\"row\"><span class=\"lbl\">怎么讲</span><div><ul><li>让孩子自己用绳子量“周长 ÷ 直径”≈ 3.14 —— 把圆周率做成一次发现，而不是给一个公式。</li><li>面积用剪拼：把圆平均分成若干份，拼成近似长方形，长是半周长、宽是半径。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">易错</span><div><ul><li>周长与面积公式混（2πr 与 πr²）。</li><li>半圆周长还要加直径。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">前连后接</span><div>6下·一 圆柱与圆锥</div></div></div><div class=\"anchor\">一句话锚点：「圆大圆小，周长 ÷ 直径都是同一个数。」</div><div class=\"verified\"><b>已核对</b>：首节「圆的认识（一）」从「套圈游戏公不公平」引入，得到圆心、半径、直径与 d = 2r（PDF 第 6 页）。</div></article><article class=\"unit\" data-s=\"rec\"><div class=\"uhead\"><h3>三 观察物体</h3><span class=\"chip rec\">认识</span><span class=\"chip ghost\">第 4 遍</span></div><p class=\"what\">观察物体（第四遍），含根据平面图形还原立体。</p><div class=\"rows\"><div class=\"row\"><span class=\"lbl\">怎么讲</span><div><ul><li>同上，最高阶的一遍。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">前连后接</span><div>1下·二 · 3上·二 · 4下·四</div></div></div></article><h3 class=\"bookhd\">六年级下册 · 六下 <span class=\"pageinfo\">共 119 页 PDF</span></h3><article class=\"unit\" data-s=\"mea\"><div class=\"uhead\"><h3>一 圆柱与圆锥</h3><span class=\"chip mea\">度量</span><span class=\"chip ghost\">收官</span></div><p class=\"what\">圆柱表面积 = 两个底面圆 + 侧面展开成长方形；圆柱体积 = 底面积 × 高；圆锥体积 = 等底等高圆柱的 1/3。</p><div class=\"rows\"><div class=\"row\"><span class=\"lbl\">怎么讲</span><div><ul><li>圆柱体积就是 5下“底面积 × 高”的直接推广 —— 所有直柱体统一。</li><li>圆锥的 1/3 用等底等高倒水实验验证：倒三次才灌满圆柱。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">易错</span><div><ul><li>圆锥体积忘 ÷3。</li><li>侧面积与表面积混（题目要不要加两个底面）。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">前连后接</span><div>6上·一 圆 → 本单元，两册开头连讲最顺</div></div></div><div class=\"anchor\">一句话锚点：「底面积 × 高，管所有直柱体。」</div><div class=\"verified\"><b>已核对</b>：本章练习就是立体图形展开图求表面积、圆柱形钢柱、粮仓容积等实际问题（PDF 第 18 页）—— 6下开篇就在复用 6上的圆。</div></article><article class=\"unit\" data-s=\"mot\"><div class=\"uhead\"><h3>三 图形的运动</h3><span class=\"chip mot\">运动</span><span class=\"chip ghost\">第 3 遍</span></div><p class=\"what\">图形的运动（第三遍），加入旋转。</p><div class=\"rows\"><div class=\"row\"><span class=\"lbl\">怎么讲</span><div><ul><li>旋转三要素：中心、方向、角度。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">易错</span><div><ul><li>顺时针 / 逆时针说反。</li></ul></div></div><div class=\"row\"><span class=\"lbl\">前连后接</span><div>5上·二 轴对称和平移</div></div></div><div class=\"anchor\">一句话锚点：「转的是方向，不是形状。」</div></article>\n    <h2 class=\"sec\">跨册讲授路线</h2>\n    <p class=\"lede\">把螺旋重排成连续模块：同一个模块里的内容，本来就是一个整体，跨册连讲比按册讲顺得多。★ 是三次关键对比。</p>\n    <div class=\"mods\"><div class=\"mod \"><div class=\"no\">A</div><div><h3>体与形分家</h3><div class=\"compose\">1上·六 认识图形 + 1下·四 有趣的图形 + 1下·二 观察物体（+ 1上·五 位置与顺序 铺垫）</div><p>把「体」和「形」两个字分开，并且是「面在体上」地分开 —— 从立体的面上印出平面图形。</p></div></div><div class=\"mod \"><div class=\"no\">B</div><div><h3>给长度定规矩</h3><div class=\"compose\">2上·六 测量 + 2下·四 测量</div><p>单位是怎么来的（因为不统一就会吵架），以及长度相邻进率 10。</p></div></div><div class=\"mod \"><div class=\"no\">C</div><div><h3>线的长度与面的角</h3><div class=\"compose\">2下·六 认识图形 + 4上·二 线与角</div><p>角可以比张口，也可以量成度数；始终守住「角的大小与边长无关」。</p></div></div><div class=\"mod star\"><div class=\"no\">D</div><div><h3>★ 线 vs 面<span class=\"chip rec\">关键对比</span></h3><div class=\"compose\">3上·五 周长 + 3下·五 面积（+ 3下·四 千克克吨 顺带）</div><p>「框」与「铺满」的对讲；面积进率 100 与长度进率 10 的对比。本大纲第一次必须停下来的地方。</p></div></div><div class=\"mod \"><div class=\"no\">E</div><div><h3>转化</h3><div class=\"compose\">5上·四 多边形的面积 + 5上·六 组合图形的面积（前置 4下·二 三角形四边形）</div><p>三个面积公式都由长方形推出来；抓住转化，就不用背公式。</p></div></div><div class=\"mod star\"><div class=\"no\">F</div><div><h3>★ 面 vs 体<span class=\"chip rec\">关键对比</span></h3><div class=\"compose\">5下·二 长方体（一）+ 5下·四 长方体（二）</div><p>展开是面，塞满是体；进率 1000 与面积 100 的对比。同一册里天然并列，正好对比。</p></div></div><div class=\"mod star\"><div class=\"no\">G</div><div><h3>★ 圆与柱锥<span class=\"chip rec\">关键对比</span></h3><div class=\"compose\">6上·一 圆 + 6下·一 圆柱与圆锥</div><p>圆周率是量出来的；底面积 × 高统一所有直柱体。两册开头连讲最顺 —— 6下开篇练习就在用 6上的圆。</p></div></div></div>\n    <div class=\"card\" style=\"margin-top:16px\">\n      <h3 style=\"font-size:15.5px\">两条并行的贯穿线</h3>\n      <div class=\"rows\" style=\"margin-top:10px\">\n        <div class=\"row\"><span class=\"lbl\">运动线</span><div>2上·四 → 3下·二 → 5上·二 → 6下·三。每个年级都问同一句：<b>变的是形状，不变的是什么？</b></div></div>\n        <div class=\"row\"><span class=\"lbl\">观察物体</span><div>1下·二 → 3上·二 → 4下·四 → 6上·三。<b>用同一组积木</b>贯穿四个年级，只升级“看的角度”与“看到的范围”。</div></div>\n      </div>\n    </div>\n  "
};
