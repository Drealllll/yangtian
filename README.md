# 杨田 · 学术主页

参考张凯学术主页的双栏版式，独立实现的中英双语学术个人网站。首页采用简介、四个快捷入口、研究方向卡片与临床方向标签的结构。包含简介、代表论文、软件、学术报告、教学、简历、科普、联系与资料来源页面。支持浅色/深色主题、论文关键词搜索与分类筛选、复制引用和打印简历。

## 本地运行

需要 Node.js 18 或更新版本，无需安装依赖：

```powershell
node build.mjs
node server.mjs
```

访问 http://127.0.0.1:4173 。输出位于 `dist/`，可部署至 GitHub Pages 等静态托管服务。页面使用相对路径，支持 `/yangtiancr/` 项目路径及各子页面刷新。

## 修改内容

- `assets/site-data.js`：姓名、职称、邮箱、论文与资料来源。
- `assets/app.js`：各页面中英文介绍、导航与交互。
- `assets/styles.css`：颜色、排版和响应式布局。
- `assets/yang-tian.png`：人物肖像。
- `index.html`：所有页面共享的 HTML 外壳。

更新后运行 `node build.mjs`。双语内容成对维护，论文应保留 DOI / PubMed 原始记录。

## 内容依据

资料核对时间：2026年11月。身份与肖像来自[徐州医科大学2025年官方讲座介绍](https://kjc.xzhmu.edu.cn/info/1013/3223.htm)；研究与科普动态参考[新华网2026年人物报道](https://app.xinhuanet.com/news/article.html?articleId=859f0850627e52d6c4e8f272829e52d2)。公开学术邮箱来自[徐州医科大学导师页](https://yjsxxgl.xzhmu.edu.cn/gmis/dsfc/dsfcgrxx/CFFDC405F5A1A21B531B6161BE90B511)；研究方向另参考[蚌埠医科大学导师介绍](https://yjsy.bbmu.edu.cn/info/1070/4622.htm)。论文均附 PubMed 与 DOI。

## GitHub Pages

仓库提供 `.github/workflows/pages.yml`。源码推送到 `main` 后，在 GitHub 仓库 Settings → Pages → Build and deployment 中选择 GitHub Actions，即可通过该工作流部署。默认项目网址为 `https://drealllll.github.io/yangtiancr/`；该地址是否已启用，以仓库 Pages 设置和 Actions 运行结果为准。

论文为部分选录，不是完整发表列表。行政职务、总论文数、H指数、ORCID与社交账号未在未确认的情况下补写。软件栏目展示本站实际源码，未将参考站作者的软件署给杨田。头像使用公开学术活动中的人物照片，来源保留在网页中，可随时替换为本人提供的授权照片。

版式参考：https://zhangkaicr.github.io/software/?lang=zh 。本站使用原生 HTML/CSS/JavaScript，未使用或声称使用 Jekyll / AcademicPages 的代码。
