(() => {
  'use strict';
  const data = window.SITE_DATA;
  const root = new URL(document.body.dataset.base, location.href);
  const pages = ['home','publications','software','talks','teaching','cv','outreach','contact','sources'];
  const names = {
    home:['关于我','About'], publications:['论文','Publications'], software:['软件','Software'],
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
        <li>${external(p.github,`<span class="profile-icon">${icon('code')}</span>${t('本站源码','Site source')}`,'profile-link')}</li>
      </ul>${local('sources',`${icon('info')} ${t('公开资料与来源','Profile sources')}`,'profile-source')}</div>`;
    document.querySelector('.footer-inner').innerHTML = `<div class="footer-top"><div><strong>${t('杨田','Tian Yang')}</strong><span class="footer-tagline">${t('临床 · 研究 · 分享','Practice · Research · Sharing')}</span></div><nav class="footer-nav" aria-label="${t('页脚导航','Footer navigation')}">${local('contact',t('联系','Contact'))}${local('sources',t('资料来源','Sources'))}${external(p.github,'GitHub','')}</nav></div><div class="footer-bottom"><span>© 2026 ${t('杨田 · 学术主页','Tian Yang · Academic Homepage')}</span><span>${t('最后整理：2026年11月 · 中英双语','Updated November 2026 · 中文 / English')}</span></div>`;
  }
  function researchCards() {
    const cards = [
      ['liver',t('肝癌外科与综合治疗','Liver cancer surgery'),t('聚焦手术决策与个体化治疗，研究影响肝癌患者长期结局的临床问题。','Investigating surgical decisions, individualized treatment and long-term outcomes in hepatocellular carcinoma.')],
      ['chart',t('临床研究与预后评估','Clinical outcomes research'),t('依托临床队列与多中心研究，探索术后复发规律及预后评估。','Using clinical cohorts and multicenter studies to understand recurrence and prognosis after liver resection.')],
      ['flask',t('早期诊断与转化研究','Early diagnosis & translation'),t('围绕肝癌早诊模型、肿瘤生物学与创新治疗开展研究。','Exploring early detection models, cancer biology and translational therapeutic approaches.')]
    ];
    return `<div class="research-grid">${cards.map(([i,title,copy])=>`<article class="research-card"><span class="research-icon">${icon(i)}</span><h3>${title}</h3><p>${copy}</p></article>`).join('')}</div>`;
  }
  function publication(p,compact=false) {
    return `<article class="publication"><div class="publication-meta"><span class="publication-year">${p.year}</span><span class="publication-journal">${esc(p.journal)}</span></div><h3 class="publication-title">${external(`https://pubmed.ncbi.nlm.nih.gov/${p.pmid}/`,esc(p.title),'')}</h3><p class="publication-authors">${esc(p.authors).replace('Yang T,','<strong>Yang T</strong>,')} ${esc(p.citation)}.</p>${compact?'':`<p class="publication-topic">${tr(p.topic)}</p>`}<div class="publication-links">${external(`https://pubmed.ncbi.nlm.nih.gov/${p.pmid}/`,'PubMed')}${external(`https://doi.org/${p.doi}`,'DOI')}${compact?'':`<button type="button" class="text-link" data-cite="${p.id}">${icon('copy')} ${t('复制引用','Copy citation')}</button>`}</div></article>`;
  }
  function news() {
    return `<div class="news-list"><article class="news-item"><time class="news-date" datetime="2026-01-27">2026.01</time><div class="news-body"><h3 class="news-title">${external(data.sources[1].url,t('新华网人物报道：肝胆外科专家杨田的医者之路','Xinhua profile: Tian Yang’s career in medicine'),'')}</h3><p>${t('临床研究、肝癌早诊与医学科普的实践。','A profile of clinical research, early detection and public engagement.')}</p></div></article><article class="news-item"><time class="news-date" datetime="2025-03-25">2025.03</time><div class="news-body"><h3 class="news-title">${external(data.sources[0].url,t('徐州医科大学 · 大学发展论坛第246讲','Xuzhou Medical University · Development Forum 246'),'')}</h3><p>${t('报告：青年医务人员如何挖掘科研第一桶金。','Lecture on getting started with clinical research as a young physician.')}</p></div></article></div>`;
  }
  function home() {
    return heading('CLINICAL PRACTICE & RESEARCH',t('关于我','About me')) + `<div class="intro-copy"><p class="lead">${t('从临床问题出发，<br>探索更好的肝癌诊疗。','Clinical questions.<br>Evidence for better liver cancer care.')}</p><p>${t('杨田，海军军医大学第三附属医院（上海东方肝胆外科医院）肝胆外科主任医师、教授、博士生导师。师从吴孟超院士、刘允怡院士，曾赴纽约西奈山医学院进行临床访问。','Tian Yang is a professor, surgeon and PhD supervisor at the Eastern Hepatobiliary Surgery Hospital, Naval Medical University, Shanghai. His training includes mentorship by Mengchao Wu and Wan Yee Lau, and a clinical visit to Mount Sinai in New York.')}</p><p>${t('研究围绕肝细胞癌的外科治疗、术后复发及早期诊断展开，关注如何将临床观察转化为可验证的科学问题，再将研究证据带回诊疗实践。','His work focuses on surgical treatment, postoperative recurrence and early detection of hepatocellular carcinoma, translating questions from clinical practice into research and evidence-informed care.')}</p><div class="intro-actions">${local('publications',icon('book')+' '+t('代表论文','Selected publications'),'button button-primary')}${local('cv',t('学术简历','Academic CV'),'button button-secondary')}${local('contact',t('联系与合作','Get in touch'),'text-link')}</div></div><section><h2 class="section-heading">${t('研究方向','Research interests')}</h2>${researchCards()}</section><section><div class="section-header"><h2 class="section-heading">${t('近期动态','Recent updates')}</h2>${local('outreach',t('更多动态','More updates'),'section-link')}</div>${news()}</section><section><div class="section-header"><h2 class="section-heading">${t('代表论文','Selected publications')}</h2>${local('publications',t('查看论文','Browse publications'),'section-link')}</div><div class="publication-list">${[data.publications[0],data.publications[3]].map(p=>publication(p,true)).join('')}</div></section><p class="note source-note">${t('简介依据公开学术资料整理。','Biography compiled from public academic sources.')} ${local('sources',t('查看来源','View sources'))}</p>`;
  }
  function publications() {
    return heading('PUBLICATIONS',t('代表论文','Selected publications'),t('肝癌临床与转化研究、临床研究方法及公共健康相关论文选录。','Selected work on liver cancer, clinical research and public health.')) + `<div class="toolbar"><label class="search-field">${icon('search')}<input type="search" id="publication-search" placeholder="${t('搜索标题、期刊或年份…','Search title, journal or year…')}" aria-label="${t('搜索论文','Search publications')}"></label><div class="filter-group" role="group" aria-label="${t('论文分类','Publication category')}">${[['all',t('全部','All')],['research',t('原创研究','Original research')],['review',t('综述','Reviews')],['perspective',t('述评与观点','Perspectives')]].map(([key,label])=>`<button class="filter-button" type="button" data-filter="${key}" aria-pressed="${filter===key}">${label}</button>`).join('')}</div></div><p class="results-count" aria-live="polite"></p><div class="publication-list" id="publication-results"></div><p class="note">${t('这里展示已核对的部分论文，并非完整发表列表。作者与单位请以原始记录为准。','This is a verified selection, not a complete publication list. Consult the original records for authors and affiliations.')} ${external(data.profile.pubmed,t('在 PubMed 中检索','Search PubMed'))}</p>`;
  }
  function software() {
    return heading('SOFTWARE & OPEN SOURCE',t('软件与开源','Software & open source'),t('整理可公开访问的项目与资源，让知识和工具更容易被使用。','Public projects and resources, designed to make knowledge easier to access.')) + `<article class="software-card"><div class="software-logo"><span>YT</span><small>WEB</small></div><div class="software-body"><h2 class="software-title">yangtiancr <span class="badge">${t('本站项目','This website')}</span></h2><p class="software-description">${t('杨田个人学术主页。集中展示个人简介、研究方向、代表论文与学术交流，提供中英双语、明暗主题和论文检索。使用原生 HTML、CSS 与 JavaScript 构建，便于维护与持续更新。','Tian Yang’s academic homepage, bringing together a biography, research interests, publications and academic activities. Includes Chinese / English views, light / dark themes and publication search. Built with HTML, CSS and JavaScript for straightforward maintenance.')}</p><div class="software-links">${external(data.profile.github,icon('code')+' '+t('GitHub 源码','GitHub repository'))}${local('sources',icon('book')+' '+t('内容资料来源','Content sources'),'text-link')}</div>${tags(['HTML','CSS','JavaScript',t('中英双语','Bilingual'),t('响应式布局','Responsive'), 'GitHub Pages'])}</div></article><section><h2 class="section-heading">${t('开放与共享','Open knowledge')}</h2><div class="prose"><p>${t('这个网站将学术信息集中在一个清晰、可访问的位置。论文条目链接到原始文献，方便读者查阅完整研究；个人简介与动态也保留来源。','This website makes academic information accessible in one place. Publication entries link to original records, and profile details and news retain their sources.')}</p><p>${t('其他研究软件及数据资源将在确认公开地址后补充。','Additional research software and datasets will be added when their public links have been verified.')}</p></div></section>`;
  }
  function talks() {
    return heading('TALKS & PRESENTATIONS',t('学术报告','Talks & presentations'),t('从临床观察到科研实践，分享问题、方法与经验。','Sharing questions, methods and experience from clinical research.')) + `<div class="timeline"><article class="timeline-item"><div class="timeline-date">2025.03.25</div><div class="timeline-content"><span class="badge">${t('特邀报告','Invited lecture')}</span><h2>${t('青年医务人员如何挖掘科研第一桶金','Getting started with clinical research as a young physician')}</h2><p>${t('徐州医科大学 · 大学发展论坛第246讲','Xuzhou Medical University · Development Forum 246')}</p><p class="note">${t('主校区行政楼101会议室 · 09:00','Main campus, Administration Building Room 101 · 09:00')}</p>${external(data.sources[0].url,t('查看官方通知','Official announcement'))}</div></article></div><div class="content-card"><h3>${t('报告邀请','Speaking invitations')}</h3><p>${t('学术交流与报告事宜，请通过学术邮箱联系。','For academic exchange and speaking invitations, please get in touch by email.')}</p>${local('contact',t('联系杨田','Contact Tian Yang'),'text-link')}</div>`;
  }
  function teaching() {
    return heading('TEACHING & MENTORSHIP',t('教学与指导','Teaching & mentorship'),t('在临床实践中发现问题，在研究中培养思考。','Learning to ask research questions through clinical practice.')) + `<div class="prose"><p>${t('作为博士生导师，杨田关注临床问题的提炼与外科临床研究的开展。公开学术报告与方法学文章可作为了解其研究思路的起点。','As a PhD supervisor, Tian Yang works at the intersection of clinical practice and research. His public lectures and methodological writing offer an introduction to his approach.')}</p></div><section><h2 class="section-heading">${t('公开学习资源','Public learning resources')}</h2><article class="content-card"><span class="badge">${t('学术讲座','Academic lecture')}</span><h3>${t('青年医务人员如何挖掘科研第一桶金','Getting started with clinical research as a young physician')}</h3><p>${t('2025年3月25日 · 徐州医科大学','25 March 2025 · Xuzhou Medical University')}</p>${external(data.sources[0].url,t('报告信息','Lecture details'))}</article><div class="publication-list">${publication(data.publications[2])}</div></section><p class="note">${t('课程讲义、教学视频与招生信息将在取得公开资料后更新。','Course materials, teaching videos and admissions information will be updated as public resources become available.')}</p>`;
  }
  function cv() {
    return heading('CURRICULUM VITAE',t('学术简历','Academic CV'),t('杨田 · Tian Yang, MD','Tian Yang, MD · 杨田')) + `<div class="intro-actions"><button class="button button-secondary" id="print-cv" type="button">${icon('download')} ${t('打印 / 保存为 PDF','Print / Save as PDF')}</button></div><section><h2 class="section-heading">${t('现任职务','Current appointments')}</h2><div class="prose"><p><strong>${t('主任医师、教授、博士生导师','Surgeon, Professor and PhD Supervisor')}</strong><br>${t('海军军医大学第三附属医院（上海东方肝胆外科医院）','Eastern Hepatobiliary Surgery Hospital, Naval Medical University')}</p><p>${t('iLIVER 执行主编','Executive Editor, iLIVER')}</p></div></section><section><h2 class="section-heading">${t('学术训练','Academic training')}</h2><div class="prose"><p>${t('医学博士，师从吴孟超院士、刘允怡院士。','Medical doctorate; mentored by Mengchao Wu and Wan Yee Lau.')}</p><p>${t('纽约西奈山医学院临床访问学者。','Clinical visiting scholar, Mount Sinai School of Medicine, New York.')}</p></div></section><section><h2 class="section-heading">${t('研究方向','Research interests')}</h2>${researchCards()}</section><section><h2 class="section-heading">${t('荣誉与支持','Recognition & funding')}</h2><div class="prose"><p>${t('国家杰出青年科学基金获得者（首届临床杰青）。','Recipient of the National Science Fund for Distinguished Young Scholars, inaugural clinical medicine cohort.')}</p></div></section><section><h2 class="section-heading">${t('部分代表论文','Selected publications')}</h2><div class="publication-list">${[data.publications[0],data.publications[3],data.publications[1]].map(p=>publication(p,true)).join('')}</div></section><p class="note">${t('职称与任职依据2025年大学官网公开简介整理。完整履历待补充。','Appointments are based on a university biography published in 2025. A complete CV can be added later.')} ${local('sources',t('资料来源','Sources'))}</p>`;
  }
  function outreach() {
    return heading('SCIENCE & PUBLIC ENGAGEMENT',t('科普与分享','Public engagement'),t('把医学知识带到更广阔的日常生活中。','Bringing medical knowledge to everyday life.')) + `<article class="content-card outreach-feature"><span class="badge">${t('医学科普','Science communication')}</span><h2>${t('田哥话肝胆','Liver health, explained')}</h2><p>${t('据公开报道，杨田以“田哥话肝胆”开展肝胆疾病科普，围绕乙肝、肝癌及胆囊疾病等主题分享医学知识。','Public reporting describes Tian Yang’s “田哥话肝胆” educational series, discussing hepatitis B, liver cancer and gallbladder disease.')}</p>${external(data.sources[1].url,t('阅读报道','Read the profile'))}</article><section><h2 class="section-heading">${t('公共健康与医学人文','Public health & medical humanities')}</h2><div class="prose"><p>${t('医学的交流不止于专业期刊。关于乙肝歧视与患者处境的讨论，也是其公共健康写作的一部分。','Medical communication extends beyond specialist journals. His public health writing also addresses hepatitis B stigma and the experience of patients.')}</p></div><div class="publication-list">${publication(data.publications[4])}</div></section><section><h2 class="section-heading">${t('相关报道与动态','Related reporting & updates')}</h2>${news()}</section>`;
  }
  function contact() {
    return heading('CONTACT & COLLABORATION',t('联系与合作','Get in touch'),t('欢迎围绕肝胆外科、肝癌临床研究与学术交流建立联系。','For academic exchange in hepatobiliary surgery and liver cancer research.')) + `<div class="contact-grid"><article class="contact-card"><span class="research-icon">${icon('mail')}</span><h2>${t('学术邮箱','Academic email')}</h2><a class="contact-email" href="mailto:${data.profile.email}">${data.profile.email}</a><p>${t('用于学术交流、研究合作与报告邀请。','For research collaboration, academic exchange and speaking invitations.')}</p><button type="button" class="button button-secondary" id="copy-email">${icon('copy')} ${t('复制邮箱','Copy email')}</button></article><article class="contact-card"><span class="research-icon">${icon('building')}</span><h2>${t('工作单位','Affiliation')}</h2><p><strong>${t('上海东方肝胆外科医院','Eastern Hepatobiliary Surgery Hospital')}</strong><br>${t('海军军医大学第三附属医院','Naval Medical University')}<br>${t('中国 · 上海','Shanghai, China')}</p></article></div><section><h2 class="section-heading">${t('学术与项目链接','Academic & project links')}</h2><div class="intro-actions">${external(data.profile.pubmed,icon('book')+' PubMed','button button-secondary')}${external(data.profile.github,icon('code')+' GitHub','button button-secondary')}</div></section><p class="note">${t('邮箱取自公开学术资料。门诊与就医安排请以医院官方发布为准。','Email is taken from public academic information. For clinical appointments, please refer to the hospital’s official channels.')}</p>`;
  }
  function sources() {
    return heading('SOURCES & ACKNOWLEDGEMENTS',t('资料来源','Sources & acknowledgements'),t('公开信息有出处，尚未确认的内容保留待补。','Public information is linked to its source; unverified details are left open.')) + `<div class="source-list">${data.sources.map(s=>`<article class="source-item"><p class="source-meta">${tr(s.publisher)}${s.date?' · '+s.date:''}</p><h2>${external(s.url,tr(s.title),'')}</h2><p>${tr(s.note)}</p></article>`).join('')}</div><section><h2 class="section-heading">${t('说明与致谢','Notes & acknowledgements')}</h2><div class="prose"><p>${t('肖像使用徐州医科大学公开讲座介绍中的杨田教授照片。网站内容按2026年11月可访问的公开信息整理；涉及职务、联系方式或论文信息的更正，请联系维护者。','The portrait comes from Xuzhou Medical University’s public lecture announcement. Content was compiled from information accessible in November 2026. Corrections to appointments, contact details or publications are welcome.')}</p><p>${t('页面布局参考张凯的学术主页，使用独立的 HTML、CSS 与 JavaScript 重新实现；没有沿用其个人履历、软件成果或社交账号。','The layout takes inspiration from Kai Zhang’s academic homepage and is independently implemented in HTML, CSS and JavaScript. His biography, software and social accounts are not reused.')} ${external('https://zhangkaicr.github.io/software/?lang=zh',t('参考页面','Reference website'))}</p><p>${t('维护仓库：','Maintenance repository: ')}${external(data.profile.github,'Drealllll/yangtiancr')}</p></div></section>`;
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
    document.querySelector('meta[name="theme-color"]').content=dark?'#151b20':'#146b74';
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
