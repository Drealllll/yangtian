(() => {
  'use strict';
  const data = window.SITE_DATA;
  const root = new URL(document.body.dataset.base, location.href);
  const pages = ['home','publications','software','talks','teaching','cv','outreach','contact','sources'];
  const names = {
    home:['关于我','About'], publications:['论文','Publications'], software:['研究工具','Research tools'],
    talks:['学术报告','Talks'], teaching:['教学','Teaching'], cv:['简历','CV'],
    outreach:['科普','Outreach'], contact:['联系','Contact'], sources:['资料来源','Sources']
  };
  let lang = new URLSearchParams(location.search).get('lang');
  try { lang = lang || localStorage.getItem('yt-language'); } catch {}
  if (!['zh','en'].includes(lang)) lang = 'zh';
  let page = document.body.dataset.page || 'home';
  let filter = 'all';
  const t = (zh,en) => lang === 'zh' ? zh : en;
  const tr = value => value[lang];
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icons = {
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
    moon:'<path d="M21 12.8A9 9 0 0 1 11.2 3 9 9 0 1 0 21 12.8Z"/>',
    menu:'<path d="M4 6h16M4 12h16M4 18h16"/>', close:'<path d="m6 6 12 12M6 18 18 6"/>',
    location:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    building:'<path d="M4 21h16M6 21V3h12v18M9 7h1m4 0h1M9 11h1m4 0h1M10 21v-6h4v6"/>',
    mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
    book:'<path d="M12 5c-3-2-6-2-10-1v15c4-1 7-1 10 1 3-2 6-2 10-1V4c-4-1-7-1-10 1Zm0 0v15"/>',
    code:'<path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18"/>',
    flask:'<path d="M9 3h6m-5 0v7L4 20c-.3.6.2 1 1 1h14c.8 0 1.3-.4 1-1l-6-10V3M7 15h10"/>',
    chart:'<path d="M4 3v17h17M8 15l4-5 4 2 5-7"/>',
    liver:'<path d="M3 8c3-4 8-5 12-2l5 1c2 1 2 4 0 5l-5 2-4 6c-2 2-4 1-5-1C3 15 2 12 3 8Z"/><path d="m14 6-1 7-5 2"/>',
    search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    copy:'<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V3H3v13h5"/>',
    download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
    check:'<path d="m5 12 4 4L19 6"/>', up:'<path d="m6 14 6-6 6 6"/>',
    link:'<path d="m10 13 4-4m-6 7-1 1a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m0 12a4 4 0 0 0 6 0l5-5a4 4 0 0 0-6-6l-1 1"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6m10-6v6M3 11h18"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>'
  };
  const icon = name => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.link}</svg>`;
  const url = key => new URL((key === 'home' ? '' : key + '/') + '?lang=' + lang, root).href;
  const local = (key,label,classes='') => `<a href="${url(key)}" data-page="${key}" class="${classes}">${label}</a>`;
  const external = (href,label,classes='text-link') => `<a href="${esc(href)}" class="${classes}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  const heading = (eyebrow,title,description='') => `<header class="page-heading"><p class="eyebrow">${eyebrow}</p><h1 class="page-title">${title}</h1>${description ? `<p class="page-description">${description}</p>` : ''}</header>`;
  const tags = list => `<div class="tag-list">${list.map(x=>`<span class="tag">${x}</span>`).join('')}</div>`;
  function renderShell() {
    document.querySelector('link[rel="icon"]').href = new URL('assets/favicon.svg', root).href;
    document.documentElement.lang = t('zh-CN','en');
    document.title = `${names[page][lang === 'zh' ? 0 : 1]} · ${t('杨田','Tian Yang')}`;
    document.querySelector('.brand-name').innerHTML = t('杨田 <span class="brand-subtitle">· 学术主页</span>','Tian Yang <span class="brand-subtitle">· Academic</span>');
    const nav = pages.filter(x=>!['home','sources'].includes(x)).map(key=>`<a class="nav-link" data-page="${key}" href="${url(key)}"${page===key ? ' aria-current="page"' : ''}>${names[key][lang==='zh'?0:1]}</a>`).join('');
    document.querySelector('.desktop-nav').innerHTML = nav;
    document.querySelector('.mobile-nav').innerHTML = local('home',t('关于我','About'),'nav-link') + nav;
    document.querySelector('.brand').href = url('home');
    document.querySelector('.brand').dataset.page = 'home';
    document.querySelectorAll('[data-language]').forEach(button=>button.setAttribute('aria-pressed', String(button.dataset.language===lang)));
    updateTheme();
    document.getElementById('menu-toggle').innerHTML = icon('menu');
    document.querySelector('.back-top').innerHTML = icon('up');
    const p = data.profile;
    document.querySelector('.profile-sidebar').innerHTML = `
      <div class="portrait-wrap"><img class="portrait" src="${new URL('assets/yang-tian.png',root)}" alt="${t('杨田教授肖像','Portrait of Professor Tian Yang')}" width="176" height="220"><span class="portrait-caption">TIAN YANG, MD</span></div>
      <div class="profile-summary"><h2 class="profile-name">${tr(p.name)}</h2><p class="profile-name-en">${t('Tian Yang, MD','杨田 · 医学博士')}</p><p class="profile-role">${tr(p.role)}</p><p class="profile-bio">${tr(p.bio)}</p></div>
      <div class="profile-details"><div class="profile-divider"></div><ul class="profile-links">
        <li class="profile-location"><span class="profile-icon">${icon('location')}</span>${t('上海，中国','Shanghai, China')}</li>
        <li class="profile-location"><span class="profile-icon">${icon('building')}</span><span>${tr(p.affiliation).replaceAll('\n','<br>')}</span></li>
        <li><a class="profile-link" href="mailto:${p.email}"><span class="profile-icon">${icon('mail')}</span>${t('学术邮箱','Email')}</a></li>
        <li>${external(p.pubmed,`<span class="profile-icon">${icon('book')}</span>PubMed`,'profile-link')}</li>
      </ul></div>`;
    document.querySelector('.footer-inner').innerHTML = `<div class="footer-top"><div><strong>${t('杨田','Tian Yang')}</strong><span class="footer-tagline">${t('临床 · 研究 · 分享','Practice · Research · Sharing')}</span></div><nav class="footer-nav" aria-label="${t('页脚导航','Footer navigation')}">${local('contact',t('联系','Contact'))}</nav></div><div class="footer-bottom"><span>© 2026 ${t('杨田 · 学术主页','Tian Yang · Academic Homepage')}</span><span>${t('最后整理：2026年11月 · 中英双语','Updated November 2026 · 中文 / English')}</span></div>`;
  }
  const source = id => data.sources.find(s => s.id === id);
  const paper = id => data.publications.find(p => p.id === id);
  const section = (zh, en, content, id = '') => `<section${id ? ` id="${id}"` : ''}><h2 class="section-heading">${t(zh, en)}</h2>${content}</section>`;
  const stats = () => `<div class="achievement-grid">${data.stats.map(s => `<div class="achievement"><strong>${s.value}</strong><span>${tr(s.label)}</span></div>`).join('')}</div><p class="data-caption">${t('累计数据据所提供简历整理。', 'Cumulative figures from the supplied CV.')}</p>`;
  const academicList = items => `<div class="academic-list">${items.map(x => `<article class="academic-row"><span class="academic-period">${esc(x.period)}${x.period.endsWith('–') ? t('至今', 'present') : ''}</span><div><h3>${x.url ? external(x.url, esc(tr(x.title)), '') : esc(tr(x.title))}</h3>${tr(x.detail) ? `<p>${esc(tr(x.detail))}</p>` : ''}</div></article>`).join('')}</div>`;
  const literatureSearch = () => `<div class="literature-search">${external(data.profile.pubmedHcc, 'PubMed')}</div>`;
  const patentList = () => `<div class="patent-list">${data.patents.map(p => `<article class="patent-card"><p class="patent-date">${t('授权日期', 'Granted')} · <time datetime="${p.granted}">${p.granted}</time></p><h3>${esc(tr(p.title))}</h3>${lang === 'en' ? `<p class="patent-original-title" lang="zh-CN">${esc(p.title.zh)}</p>` : ''}<dl class="patent-identifiers"><div><dt>${t('专利号', 'Patent number')}</dt><dd>${p.number}</dd></div><div><dt>${t('授权公告号', 'Grant publication')}</dt><dd>${external(p.url, p.publication)}</dd></div></dl><p class="patent-inventors">${t('发明人', 'Inventors')}：${esc(tr(p.inventors))}</p></article>`).join('')}</div>`;
  function researchCards() {
    return `<div class="research-grid">${data.research.map(c => `<article class="research-card"><span class="research-icon">${icon(c.icon)}</span><h3>${esc(tr(c.title))}</h3>${lang === 'zh' ? `<p class="research-subtitle">${c.subtitle}</p>` : ''}<p>${esc(tr(c.text))}</p></article>`).join('')}</div>`;
  }
  function publication(p, compact = false) {
    if (!p) return '';
    const primary = p.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${p.pmid}/` : `https://doi.org/${p.doi}`;
    return `<article class="publication"><div class="publication-meta"><span class="publication-year">${p.year}</span><span class="publication-journal">${esc(p.journal)}</span></div><h3 class="publication-title">${external(primary, esc(p.title), '')}</h3><p class="publication-authors">${esc(p.authors).replace(/\bYang T\b/g, '<strong>Yang T</strong>')} ${esc(p.citation)}.</p>${compact ? '' : `<p class="publication-topic">${tr(p.topic)}</p>`}<div class="publication-links">${p.pmid ? external(`https://pubmed.ncbi.nlm.nih.gov/${p.pmid}/`, 'PubMed') : ''}${p.doi ? external(`https://doi.org/${p.doi}`, 'DOI') : ''}${compact ? '' : `<button type="button" class="text-link" data-cite="${p.id}">${icon('copy')} ${t('复制引用', 'Copy citation')}</button>`}</div></article>`;
  }
  function gamadFeature() {
    return `<article class="content-card research-feature"><p class="eyebrow">GAMAD · MOLECULAR BIOMEDICINE · 2026</p><h3>${t('整合 ctDNA 甲基化与血清标志物的肝癌早诊模型', 'A liver cancer detection model combining ctDNA methylation and serum biomarkers')}</h3><p>${t('GAMAD 联合性别、年龄、HepaAiQ 甲基化评分、AFP 和 DCP，在多中心前瞻性研究中完成训练、验证和独立测试。', 'GAMAD combines sex, age, the HepaAiQ methylation score, AFP and DCP, with training, validation and independent testing in a prospective multicenter study.')}</p><div class="research-metrics"><div><strong>1,692</strong><span>${t('研究总样本量', 'Total study participants')}</span></div><div><strong>0.952</strong><span>${t('独立测试队列 AUC', 'Independent test cohort AUC')}</span></div><div><strong>86.5%</strong><span>${t('测试队列 0/A 期敏感性', 'Stage 0/A sensitivity in test cohort')}</span></div></div><p class="data-caption">${t('AUC 95% CI：0.931–0.973。以上为该研究队列结果；模型定位为高危人群标准影像检查的辅助工具。', 'AUC 95% CI: 0.931–0.973. These are study-cohort results; the intended role is to complement standard imaging in high-risk populations.')}</p>${external('https://doi.org/10.1186/s43556-026-00426-3', t('阅读原始研究', 'Read the original study'))}</article>`;
  }
  function news() {
    return `<div class="news-list"><article class="news-item"><time class="news-date" datetime="2026-03">2026.03</time><div class="news-body"><h3 class="news-title">${external('https://doi.org/10.1186/s43556-026-00426-3', t('GAMAD 肝癌早诊研究发表于 Molecular Biomedicine', 'GAMAD detection study published in Molecular Biomedicine'), '')}</h3><p>${t('多中心前瞻性研究，整合 ctDNA 甲基化与常规血清标志物。', 'A prospective multicenter study integrating ctDNA methylation with serum biomarkers.')}</p></div></article><article class="news-item"><time class="news-date" datetime="2026-01-27">2026.01</time><div class="news-body"><h3 class="news-title">${external(source('xinhua').url, t('新华网人物报道：杨田的医者之路', 'Xinhua profile: Tian Yang’s career in medicine'), '')}</h3><p>${t('肝癌临床研究、早诊探索与医学科普。', 'Clinical research, early detection and public engagement.')}</p></div></article><article class="news-item"><time class="news-date" datetime="2025">2025</time><div class="news-body"><h3 class="news-title">${local('cv', t('获第十二届树兰医学奖青年奖', 'Received the 12th Shulan Medicine Youth Award'))}</h3><p>${t('人才荣誉、科研项目与学术任职详见简历。', 'See the CV for awards, research funding and academic service.')}</p></div></article></div>`;
  }
  function home() {
    return `<section class="home-intro"><h1 class="sr-only">${t('杨田 · 学术主页', 'Tian Yang · Academic Homepage')}</h1><p class="home-lead">${esc(tr(data.profile.intro))}</p><p class="home-research-intro">${esc(tr(data.profile.researchIntro))}</p><div class="intro-actions">${local('publications', t('论文成果', 'Publications'), 'button button-primary')}${local('software', t('研究工具', 'Research tools'), 'button button-secondary')}${local('cv', t('学术简历', 'CV'), 'button button-secondary')}${local('contact', t('联系我', 'Contact'), 'button button-secondary')}</div>${stats()}</section>${section('研究方向 <span>Research Focus</span>', 'Research Focus', researchCards())}${section('近期研究', 'Research highlight', gamadFeature())}${section('临床专长', 'Clinical expertise', `<div class="clinical-focus">${[t('复杂肝癌切除', 'Complex liver cancer resection'), t('腹腔镜肝切除', 'Laparoscopic liver resection'), t('胰十二指肠切除', 'Pancreaticoduodenectomy'), t('术前三维可视化规划', '3D preoperative planning')].map(x => `<span class="clinical-pill">${x}</span>`).join('')}</div>`)}${section('近期动态', 'Recent updates', news())}${section('代表论文', 'Selected publications', `<div class="publication-list">${['gamad2026', 'sdt2026', 'methylation2025'].map(id => publication(paper(id), true)).join('')}</div>${local('publications', t('查看全部选录论文', 'Browse all selected publications'), 'text-link')}`)}`;
  }
  function publications() {
    return heading('PUBLICATIONS', t('代表论文', 'Selected publications'), t('收录考核表中的10篇近期代表作，并保留早期研究、方法学与公共健康论文。', 'Ten recent papers from the assessment record, alongside earlier research, methodological and public health work.')) + literatureSearch() + `<div class="toolbar"><label class="search-field">${icon('search')}<input type="search" id="publication-search" placeholder="${t('搜索标题、期刊或年份…', 'Search title, journal or year…')}" aria-label="${t('搜索论文', 'Search publications')}"></label><div class="filter-group" role="group" aria-label="${t('论文分类', 'Publication category')}">${[['all',t('全部','All')],['research',t('原创研究','Original research')],['review',t('综述','Reviews')],['perspective',t('述评与观点','Perspectives')]].map(([key,label])=>`<button class="filter-button" type="button" data-filter="${key}" aria-pressed="${filter===key}">${label}</button>`).join('')}</div></div><p class="results-count" aria-live="polite"></p><div class="publication-list" id="publication-results"></div><p class="note">${t('本站为代表论文选录。发表年份按期刊卷期整理，可能与在线发表日期不同；完整作者顺序、通讯作者身份及单位以期刊原文为准。', 'This is a selected bibliography. Years follow journal issue records and may differ from online publication dates. Consult the original article for the full author order, correspondence and affiliations.')} ${external(data.profile.pubmed, t('在 PubMed 中检索', 'Search PubMed'))}</p>`;
  }
  function software() {
    return heading('RESEARCH MODELS & SOFTWARE', t('研究模型与软件', 'Research models & software'), t('肝癌早期诊断模型与研究成果转化。', 'Liver cancer detection models and research translation.')) + gamadFeature() + `<p class="registration-note">${t('GAMAD 肝癌早期诊断模型系统：计算机软件著作权登记号 2025SR0922079（2025年，单位署名；据考核材料）。', 'GAMAD early liver cancer diagnostic model system: software copyright registration 2025SR0922079 (2025, institutional attribution; assessment record).')}</p><article class="content-card"><p class="eyebrow">ASAP · CLINICAL CHEMISTRY · 2019</p><h2>${t('基于血清标志物的肝癌检测模型', 'A serum biomarker model for HCC detection')}</h2><p>${t('ASAP 联合年龄、性别、AFP 与 PIVKA-II，研究乙肝人群的肝癌检测。该方向为后续多标志物联合建模与临床转化奠定基础。', 'ASAP combines age, sex, AFP and PIVKA-II to study HCC detection in people with hepatitis B, informing subsequent biomarker modeling and translation.')}</p>${external('https://doi.org/10.1373/clinchem.2019.308965', t('查看原始研究', 'View the original study'))}</article>${section('授权发明专利（选列）', 'Selected granted invention patents', patentList())}${section('其他知识产权与成果转化', 'Other intellectual property & translation', `<div class="prose"><p>${t('累计获授权发明专利4项、实用新型专利8项、计算机软件著作权25项。', 'The CV records four granted invention patents, eight utility model patents and 25 software copyrights.')}</p><p>${t('实用新型专利：“一种新型可降解的创面填塞止血纱布”，2023年授权，专利号 ZL202221799939.5。GAMAD 肝癌早期诊断模型系统为计算机软件著作权，登记号 2025SR0922079。', 'Utility model patent: a biodegradable wound-packing hemostatic gauze, granted in 2023, patent ZL202221799939.5. The GAMAD early liver cancer diagnostic model system is a software copyright, registration 2025SR0922079.')}</p></div>`)}`;
  }
  function talks() {
    return heading('TALKS & PRESENTATIONS',t('学术报告', 'Talks & presentations'),t('交流临床问题、研究方法与肝癌诊疗研究进展。', 'Sharing clinical questions, research methods and advances in liver cancer research.')) + `<div class="content-card"><h2>${t('国际学术交流', 'International academic exchange')}</h2><p>${t('据提供简历，累计在国际会议作口头报告58次、特邀报告12次，4次担任 IHPBA 和 A-PHPBA 大会分会场主席。', 'The supplied CV records 58 oral presentations, 12 invited presentations and four session-chair appointments at IHPBA and A-PHPBA congresses.')}</p></div>${section('代表性国际会议经历', 'Selected international congresses', academicList(data.conferences))}${section('会议荣誉', 'Conference recognition', academicList(data.conferenceAwards))}${section('公开讲座', 'Public lecture', `<div class="timeline"><article class="timeline-item"><div class="timeline-date">2025.03.25</div><div class="timeline-content"><span class="badge">${t('特邀报告', 'Invited lecture')}</span><h3>${t('青年医务人员如何挖掘科研第一桶金', 'Getting started with clinical research as a young physician')}</h3><p>${t('徐州医科大学 · 大学发展论坛第246讲', 'Xuzhou Medical University · Development Forum 246')}</p>${external(source('university').url,t('官方报告信息', 'Official lecture announcement'))}</div></article></div>`)}<div class="content-card"><h3>${t('报告邀请', 'Speaking invitations')}</h3><p>${t('学术交流与报告邀请，请通过学术邮箱联系。', 'Please get in touch by email for academic exchange or speaking invitations.')}</p>${local('contact',t('联系杨田', 'Contact Tian Yang'), 'text-link')}</div>`;
  }
  function teaching() {
    return heading('TEACHING & MENTORSHIP', t('教学与团队', 'Teaching & mentorship'), t('以临床问题为起点，培养外科思维与研究能力。', 'Developing surgical judgment and research skills through clinical questions.')) + `<article class="content-card"><p class="eyebrow">2023–2026</p><h2>${t('外科学与野战外科学：围术期处理', 'Surgery and field surgery: perioperative management')}</h2><p>${t('长期承担“围术期处理”章节主讲任务，将术前评估、术中管理与术后恢复贯通，帮助学员建立围术期全程管理的临床思维。', 'Teaching perioperative management, connecting preoperative assessment, intraoperative care and postoperative recovery to develop clinical reasoning across the surgical pathway.')}</p></article>${section('研究生培养', 'Research supervision', `<div class="prose"><p>${t('担任博士生导师及博士后合作导师。据简历，累计指导本校及兄弟院校博硕研究生和本科生90余人，协助带教博士、硕士研究生40余人；两项数字对应不同培养口径，不作加总。', 'A PhD supervisor and postdoctoral co-supervisor. The CV records more than 90 graduate and undergraduate mentees, alongside co-supervision of over 40 doctoral and master’s students. These are different, potentially overlapping categories.')}</p><p>${t('GAMAD 项目考核材料记录完成4名硕士研究生培养。', 'The GAMAD project assessment records completion of training for four master’s students.')}</p></div>`)}${section('Young Team 科研协作', 'Young Team research collaboration', `<div class="prose"><p>${t('组织国内30余家肝胆中心参与的 Young Team 科研团队，围绕肝癌外科、复发预测与临床结局开展协作。据简历，团队累计发表 SCI 论文120余篇，多名成员在国际会议报告并获奖。', 'Organizing Young Team, a research network involving more than 30 hepatobiliary centers in China, with work on liver cancer surgery, recurrence prediction and clinical outcomes. The CV records over 120 team SCI publications and members presenting and receiving awards at international meetings.')}</p><p>${t('在福建医科大学孟超肝胆医院、清华大学附属长庚医院等11家单位担任客座教授或特聘教授。', 'Visiting or distinguished professorial roles at 11 institutions, including Mengchao Hepatobiliary Hospital of Fujian Medical University and Beijing Tsinghua Changgung Hospital.')}</p></div>`)}${section('研究方法与学习资源', 'Research methods & learning resources', `<article class="content-card"><h3>${t('青年医务人员如何挖掘科研第一桶金', 'Getting started with clinical research as a young physician')}</h3><p>${t('2025年3月25日 · 徐州医科大学', '25 March 2025 · Xuzhou Medical University')}</p>${external(source('university').url, t('查看讲座信息', 'View lecture details'))}</article><div class="publication-list">${publication(paper('yang2020'))}</div>`)}`;
  }
  function cv() {
    return heading('CURRICULUM VITAE', t('学术简历', 'Academic CV'), t('杨田 · 医学博士 · 肝胆外科', 'Tian Yang · MD · Hepatobiliary Surgery')) + `<div class="intro-actions"><button class="button button-secondary" id="print-cv" type="button">${icon('download')} ${t('打印 / 保存为 PDF', 'Print / Save as PDF')}</button></div><nav class="cv-jump" aria-label="${t('简历章节', 'CV sections')}">${[['education',t('教育经历','Education')],['career',t('工作经历','Career')],['funding',t('科研项目','Funding')],['service',t('学术任职','Service')],['awards',t('荣誉奖励','Awards')],['patents',t('发明专利','Patents')]].map(([id,label])=>`<a href="#${id}">${label}</a>`).join('')}</nav>${section('现任职务', 'Hospital & academic appointments', `<div class="prose"><p><strong>${tr(data.profile.appointments)}</strong></p><p>${tr(data.profile.academicRole)}<br>${t('海军军医大学第三附属医院（上海东方肝胆外科医院）', 'Eastern Hepatobiliary Surgery Hospital, Naval Medical University')}</p></div>`)}${stats()}${section('教育与海外研修', 'Education & international training', academicList(data.education), 'education')}${section('工作经历', 'Professional experience', academicList(data.career), 'career')}${section('临床与科研概况', 'Clinical practice & research', `<div class="prose"><p>${t('自2003年起从事肝胆外科临床工作，开展复杂肝癌切除、胰十二指肠切除、腹腔镜肝切除及三维可视化辅助术前规划。据简历，累计实施肝胆外科手术6700余例，年均开展肝胆胰脾手术200余例。', 'Working in hepatobiliary surgery since 2003, with expertise in complex liver resection, pancreaticoduodenectomy, laparoscopic liver resection and 3D preoperative planning. The CV records more than 6,700 hepatobiliary operations and over 200 hepatobiliary, pancreatic and splenic operations annually.')}</p><p>${t('以第一或通讯作者发表 SCI 论著、综述和述评206篇；29项研究纳入国内外肝癌诊疗指南。主持国家自然科学基金6项、省部级基金12项及国家科技重大专项子课题1项。上述为所提供简历中的累计统计。', 'The supplied CV records 206 SCI research articles, reviews and commentaries as first or corresponding author, and 29 studies incorporated into liver cancer guidelines. Funding led includes six NSFC projects, 12 provincial or ministerial projects and one subproject of a national major science and technology program. These are cumulative CV figures.')}</p></div>`)}${section('代表性科研项目', 'Selected funded projects', academicList(data.projects), 'funding')}${section('学术任职', 'Academic service', `<p class="data-caption">${t('以下任期按考核材料列示；已结束的任期保留为历史经历。', 'Terms follow the assessment record; completed terms are retained as past service.')}</p>${academicList(data.appointments)}<h3 class="subsection-heading">${t('其他学术服务', 'Additional academic service')}</h3><ul class="service-list">${data.additionalAppointments.map(x=>`<li>${tr(x)}</li>`).join('')}</ul><p class="data-caption">${t('其他学术服务据提供简历，未列任期。', 'Additional roles are reported in the CV without term dates.')}</p>`, 'service')}${section('人才荣誉与科技奖励', 'Honors & awards', academicList(data.awards), 'awards')}${section('授权发明专利（选列）', 'Selected granted invention patents', patentList(), 'patents')}${section('代表研究', 'Selected research', `<div class="publication-list">${['gamad2026','methylation2025','asap2019'].map(id=>publication(paper(id),true)).join('')}</div>${local('publications', t('完整选录论文列表', 'Full selected bibliography'), 'text-link')}`)}`;
  }
  function outreach() {
    return heading('SCIENCE & PUBLIC ENGAGEMENT',t('科普与分享','Public engagement'),t('从肝胆健康知识到医学人文，让研究与临床经验走近公众。','Sharing liver health knowledge, clinical experience and perspectives on medicine.')) + `<div class="outreach-grid"><article class="content-card"><p class="eyebrow">2020–</p><h2>${t('田哥话肝胆','“田哥话肝胆” · Liver health, explained')}</h2><p>${t('通过微信视频号、抖音和快手开展肝胆疾病科普，围绕乙肝、肝癌、胆囊疾病等主题分享医学知识。', 'Health education on WeChat Channels, Douyin and Kuaishou, covering hepatitis B, liver cancer and gallbladder disease.')}</p>${external(source('xinhua').url,t('阅读新华网人物报道','Read the Xinhua profile'))}</article><article class="content-card"><p class="eyebrow">2015–</p><h2>${t('肝胆相照','“肝胆相照” · Hepatobiliary health')}</h2><p>${t('通过微信公众号持续开展肝胆科普与健康知识分享。', 'A WeChat public account sharing hepatobiliary health knowledge.')}</p></article></div>${section('公众交流与科普荣誉','Public communication & recognition',`<div class="prose"><p>${t('据提供简历，累计参加线下科普宣教40余场、媒体科普节目50余场。2021年获全国助力医学“科普之星”，2023年获上海市首届健康科普杰出人物提名。','The supplied CV records more than 40 public education events and 50 media science communication appearances, with a national science communication recognition in 2021 and a Shanghai health communication award nomination in 2023.')}</p></div>`)}${section('公共健康与医学人文','Public health & medical humanities',`<div class="prose"><p>${t('关注乙肝相关歧视与患者处境，在专业研究之外参与公共健康讨论。','Engaging with hepatitis B stigma and patients’ experiences alongside clinical research.')}</p></div><div class="publication-list">${publication(paper('yang2011'))}</div>`)}${section('相关动态','Related updates',news())}`;
  }
  function contact() {
    return heading('CONTACT & COLLABORATION',t('联系与合作','Get in touch'),t('肝癌早期诊断、外科临床研究、转化医学与学术交流。','Early HCC detection, surgical research, translational medicine and academic exchange.')) + `<div class="contact-grid"><article class="contact-card"><span class="research-icon">${icon('mail')}</span><h2>${t('学术邮箱','Academic email')}</h2><a class="contact-email" href="mailto:${data.profile.email}">${data.profile.email}</a><p>${t('用于研究合作、学术交流与报告邀请。','For research collaboration, academic exchange and speaking invitations.')}</p><button type="button" class="button button-secondary" id="copy-email">${icon('copy')} ${t('复制邮箱','Copy email')}</button></article><article class="contact-card"><span class="research-icon">${icon('building')}</span><h2>${t('工作单位','Affiliation')}</h2><p><strong>${t('上海东方肝胆外科医院','Eastern Hepatobiliary Surgery Hospital')}</strong><br>${t('海军军医大学第三附属医院','Naval Medical University')}<br>${t('中国 · 上海','Shanghai, China')}</p><p>${t('肝外一科 · 临床研究院','Hepatic Surgery Unit I · Clinical Research Institute')}</p></article></div>${section('学术检索','Literature search',literatureSearch())}<p class="note">${t('门诊与就医安排请以医院官方发布为准。','For clinical appointments, please refer to the hospital’s official channels.')}</p>`;
  }
  function sources() {
    return heading('SOURCES & ACKNOWLEDGEMENTS',t('资料来源','Sources & acknowledgements'),t('结合提供的履历材料与可追溯的公开文献。','A profile grounded in supplied records and traceable public literature.')) + `<div class="source-list">${data.sources.map(s=>`<article class="source-item"><p class="source-meta">${tr(s.publisher)}${s.date?' · '+s.date:''}</p><h2>${s.url ? external(s.url,esc(tr(s.title)),'') : esc(tr(s.title))}</h2><p>${tr(s.note)}</p></article>`).join('')}</div>${section('统计与任期说明','Statistical scope & appointment dates',`<div class="prose"><p>${t('简历中的论文数、手术量、基金数量与培养人数为材料所载累计值，不代表实时数据库统计。考核表中的项目、论文和获奖属于近期选录，不能与累计数字简单相加。','Publication, surgical, funding and mentoring counts are cumulative figures from the CV, not live database metrics. Recent selections in the assessment should not be added to cumulative totals.')}</p><p>${t('任职有明确起止日期时按考核表保留期限。国家杰出青年科学基金获选年份为2024年，考核表所列项目执行期为2025—2029年，两者分别展示。','Explicit service terms follow the assessment. Selection for the Distinguished Young Scholars award was in 2024, while its project period is 2025–2029; these are shown separately.')}</p><p>${t('论文作者顺序、题名、DOI 和 PubMed 编号按原始记录校正；期刊影响因子和分区会随年份变化，论文列表以文献信息为主。软件著作权与专利按不同成果类型展示。','Author order, titles, DOIs and PubMed identifiers follow original records. Journal metrics change over time, so the bibliography emphasizes publication information. Software copyrights and patents are distinguished.')}</p></div>`)}${section('说明与致谢','Notes & acknowledgements',`<div class="prose"><p>${t('肖像来自徐州医科大学公开讲座介绍。网站于2026年11月根据所提供简历、考核表与公开资料更新。','The portrait comes from Xuzhou Medical University’s public lecture announcement. This site was updated in November 2026 using the supplied CV, assessment and public sources.')}</p></div>`)}`;
  }

  const views = {home,publications,software,talks,teaching,cv,outreach,contact,sources};
  function updatePublications() {
    const container=document.getElementById('publication-results');
    if(!container)return;
    const q=(document.getElementById('publication-search').value||'').trim().toLowerCase();
    const selected=data.publications.filter(p=>(filter==='all'||filter===p.type)&&`${p.title} ${p.authors} ${p.journal} ${p.year} ${tr(p.topic)}`.toLowerCase().includes(q));
    container.innerHTML=selected.length?selected.map(p=>publication(p)).join(''):`<div class="empty-state">${icon('search')}<h3>${t('没有找到匹配的论文','No matching publications')}</h3><p>${t('请尝试其他关键词或分类。','Try another keyword or category.')}</p><button class="button button-secondary" id="reset-search">${t('清除筛选','Clear filters')}</button></div>`;
    document.querySelector('.results-count').textContent=t(`显示 ${selected.length} 篇，共 ${data.publications.length} 篇选录论文`,`Showing ${selected.length} of ${data.publications.length} selected publications`);
    document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===filter)));
  }
  function render() {
    renderShell();
    document.getElementById('content').innerHTML=views[page]();
    updatePublications();
  }
  function navigate(key,push=true) {
    if(!pages.includes(key))return;
    page=key;filter='all';
    if(push)history.pushState({page},'',url(page));
    closeMenu();render();window.scrollTo({top:0,behavior:'instant'});
    document.getElementById('content').focus({preventScroll:true});
  }
  function closeMenu() {
    document.getElementById('mobile-nav').hidden=true;
    document.getElementById('menu-toggle').setAttribute('aria-expanded','false');
  }
  function updateTheme() {
    const dark=document.documentElement.dataset.theme==='dark';
    document.getElementById('theme-toggle').innerHTML=icon(dark?'sun':'moon');
    document.getElementById('theme-toggle').setAttribute('aria-label',dark?t('切换浅色模式','Switch to light theme'):t('切换深色模式','Switch to dark theme'));
    document.querySelector('meta[name="theme-color"]').content=dark?'#101b2d':'#163a63';
  }
  function toast(text) {
    const el=document.querySelector('.toast');el.textContent=text;el.classList.add('is-open');
    clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('is-open'),2800);
  }
  async function copy(text) {
    try {
      if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(text);
      else {const box=document.createElement('textarea');box.value=text;box.style.position='fixed';box.style.opacity='0';document.body.append(box);box.select();const ok=document.execCommand('copy');box.remove();if(!ok)throw Error();}
      toast(t('已复制到剪贴板','Copied to clipboard'));
    } catch {toast(t('复制未成功，请手动选择文本复制。','Unable to copy. Please select and copy the text manually.'));}
  }
  document.addEventListener('click',event=>{
    const language=event.target.closest('[data-language]');
    if(language){lang=language.dataset.language;try{localStorage.setItem('yt-language',lang)}catch{}history.replaceState({page},'',url(page));render();return;}
    const link=event.target.closest('a[data-page]');
    if(link&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey&&event.button===0){event.preventDefault();navigate(link.dataset.page);return;}
    const btn=event.target.closest('button');if(!btn)return;
    if(btn.id==='theme-toggle'){document.documentElement.dataset.theme=document.documentElement.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('yt-theme',document.documentElement.dataset.theme)}catch{}updateTheme();}
    if(btn.id==='menu-toggle'){const nav=document.getElementById('mobile-nav');nav.hidden=!nav.hidden;btn.setAttribute('aria-expanded',String(!nav.hidden));btn.innerHTML=icon(nav.hidden?'menu':'close');}
    if(btn.dataset.filter){filter=btn.dataset.filter;updatePublications();}
    if(btn.id==='reset-search'){filter='all';document.getElementById('publication-search').value='';updatePublications();}
    if(btn.dataset.cite){const p=data.publications.find(p=>p.id===btn.dataset.cite);copy(`${p.authors} ${p.title} ${p.journal}. ${p.year};${p.citation}. doi:${p.doi}`);}
    if(btn.id==='copy-email')copy(data.profile.email);
    if(btn.id==='print-cv')window.print();
    if(btn.classList.contains('back-top'))window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  });
  document.addEventListener('input',event=>{if(event.target.id==='publication-search')updatePublications();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
  window.addEventListener('popstate',()=>{const path=location.pathname.replace(root.pathname,'').split('/')[0];lang=new URLSearchParams(location.search).get('lang')||lang;navigate(pages.includes(path)?path:'home',false);});
  window.addEventListener('scroll',()=>{document.querySelector('.back-top').hidden=window.scrollY<500;},{passive:true});
  render();
})();
