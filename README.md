# 杨田 · 学术主页

参考张凯学术主页的双栏版式，独立实现的中英双语学术个人网站。首页采用简介、四个快捷入口、研究方向卡片与临床方向标签的结构。包含简介、代表论文、软件、学术报告、教学、简历、科普、联系与资料来源页面。支持浅色/深色主题、论文关键词搜索与分类筛选、复制引用和打印简历。

## 本地运行

需要 Node.js 18 或更新版本，无需安装依赖：

```powershell
node build.mjs
node server.mjs
```

访问 http://127.0.0.1:4173 。输出位于 `dist/`，可部署至 GitHub Pages 等静态托管服务。页面使用相对路径，支持 `/yangtian/` 项目路径及各子页面刷新。

## 修改内容

- `assets/site-data.js`：姓名、职称、邮箱、15篇代表论文与公开资料来源。
- `assets/academic-data.js`：提供的简历和考核材料整理出的教育、工作、任职、课题、荣誉与统计口径。
- `assets/app.js`：各页面中英文介绍、导航与交互。
- `assets/styles.css`：颜色、排版和响应式布局。
- `assets/yang-tian.png`：人物肖像。
- `index.html`：所有页面共享的 HTML 外壳。

更新后运行 `node build.mjs`。双语内容成对维护，论文应保留 DOI / PubMed 原始记录。

## 内容依据

资料核对时间：2026年11月。身份与肖像来自[徐州医科大学2025年官方讲座介绍](https://kjc.xzhmu.edu.cn/info/1013/3223.htm)；研究与科普动态参考[新华网2026年人物报道](https://app.xinhuanet.com/news/article.html?articleId=859f0850627e52d6c4e8f272829e52d2)。公开学术邮箱来自[徐州医科大学导师页](https://yjsxxgl.xzhmu.edu.cn/gmis/dsfc/dsfcgrxx/CFFDC405F5A1A21B531B6161BE90B511)；研究方向另参考[蚌埠医科大学导师介绍](https://yjsy.bbmu.edu.cn/info/1070/4622.htm)。论文均附 PubMed 与 DOI。

## GitHub Pages

仓库提供 `.github/workflows/pages.yml`。源码推送到 `main` 后，在 GitHub 仓库 Settings → Pages → Build and deployment 中选择 GitHub Actions，即可通过该工作流部署。默认项目网址为 `https://drealllll.github.io/yangtian/`；该地址是否已启用，以仓库 Pages 设置和 Actions 运行结果为准。

### 自定义域名 yangtian.me

先在仓库 Settings → Pages → Custom domain 填写 `yangtian.me` 并保存，再在域名的 DNS 管理平台配置：

| 主机记录 | 类型 | 记录值 |
| --- | --- | --- |
| @ | A | 185.199.108.153 |
| @ | A | 185.199.109.153 |
| @ | A | 185.199.110.153 |
| @ | A | 185.199.111.153 |
| www | CNAME | drealllll.github.io |

解析成功、证书签发后，在 Pages 中勾选 Enforce HTTPS。此仓库使用 GitHub Actions 发布，添加 `CNAME` 文件不能代替 Pages 中的域名设置。具体步骤以 [GitHub 官方说明](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)为准。

工作流从 Pages 设置自动读取网站地址，生成各页面的 canonical 与分享链接。修改域名设置后重新运行部署即可同步这些链接。本地运行 `node build.mjs` 默认使用 GitHub 项目网址；可设置环境变量 `SITE_URL=https://yangtian.me` 检查自定义域名输出。域名是否已生效，应以公共 DNS 和实际访问结果为准。

2026年11月根据维护者提供的《杨田简历》和《期满考核评价表》补充了院内职务、教育及工作经历、临床与科研累计数据、学术服务、项目、荣誉、教学和科普。累计数量按提供材料版本引用，不代表实时统计；近期选录不与累计数字相加。任职按明确任期显示，2024年杰青获选与2025—2029年项目执行期分别标注。

论文列表共15篇，包含考核表全部10篇、原有其他4篇和ASAP原始研究1篇。题名、作者顺序、DOI及PubMed编号已核对；未核实PubMed编号的条目仅提供DOI。研究工具栏目展示ASAP、GAMAD研究及软件著作权信息；页面不展示本站项目、源码或GitHub入口，未实现临床风险计算器。原始简历、考核文件及临时核查资料不进入公开仓库。头像沿用大学公开讲座介绍中的照片。

版式参考：https://zhangkaicr.github.io/software/?lang=zh 。本站使用原生 HTML/CSS/JavaScript，未使用或声称使用 Jekyll / AcademicPages 的代码。
