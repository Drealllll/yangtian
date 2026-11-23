// 履历与成果来自维护者提供的简历、期满考核表；统计口径见网站“资料来源”。
(() => {
  const d = window.SITE_DATA;
  const bi = (zh, en) => ({ zh, en });
  const entry = (period, zh, en, detailZh = '', detailEn = '') => ({ period, title: bi(zh, en), detail: bi(detailZh, detailEn) });
  d.profile.bio = bi('肝癌早期诊断、精准外科与复发防控。', 'Early detection, precision surgery and recurrence prevention in liver cancer.');
  d.profile.appointments = bi('院长助理 · 临床研究院副院长 · 肝外一科主任', 'Assistant to the Hospital President · Deputy Director, Clinical Research Institute · Director, Hepatic Surgery Unit I');
  d.profile.academicRole = bi('主任医师、教授、博士生导师、博士后合作导师', 'Chief Physician, Professor, PhD Supervisor and Postdoctoral Co-supervisor');
  d.profile.intro = bi('你好，我是杨田。医学博士，现任海军军医大学第三附属医院（上海东方肝胆外科医院）院长助理、临床研究院副院长、肝外一科主任，主任医师、教授、博士生导师、博士后合作导师。师从吴孟超院士，曾赴美国纽约西奈山医学院担任临床访问学者。', 'I am Tian Yang, a hepatobiliary surgeon and professor at the Eastern Hepatobiliary Surgery Hospital, Naval Medical University, Shanghai. I serve as Assistant to the Hospital President, Deputy Director of the Clinical Research Institute and Director of Hepatic Surgery Unit I, and supervise doctoral and postdoctoral researchers. I trained under Mengchao Wu and was a clinical fellow at Mount Sinai in New York.');
  d.profile.researchIntro = bi('围绕肝细胞癌（hepatocellular carcinoma，HCC）早筛早诊、精准外科决策及术后复发防控开展临床与转化研究，推进 ASAP、GAMAD 等诊断模型，以及纳米医学和多模态人工智能在肝癌研究中的应用。2024年获国家杰出青年科学基金支持（首届临床杰青），2025年获树兰医学奖青年奖。', 'My clinical and translational research covers early detection, surgical decision-making and recurrence prevention in hepatocellular carcinoma (HCC), including the ASAP and GAMAD models, nanomedicine and multimodal AI. I received the National Science Fund for Distinguished Young Scholars in its inaugural clinical medicine cohort in 2024, and the Shulan Medicine Youth Award in 2025.');
  d.stats = [
    { value: '206', label: bi('第一 / 通讯作者 SCI 论文', 'SCI papers as first or corresponding author') },
    { value: '6,700+', label: bi('累计实施肝胆外科手术', 'Hepatobiliary operations performed') },
    { value: '6', label: bi('主持国家自然科学基金', 'NSFC projects led') },
    { value: '90+', label: bi('指导研究生与本科生', 'Graduate and undergraduate mentees') }
  ];
  d.education = [
    entry('2014–2015', '纽约西奈山医学院 · 临床访问学者', 'Mount Sinai School of Medicine, New York · Clinical Fellow'),
    entry('2011–2013', '第二军医大学 · 外科学博士', 'Second Military Medical University · Doctorate in Surgery', '导师：吴孟超院士', 'Supervisor: Mengchao Wu'),
    entry('2006–2009', '第二军医大学 · 外科学硕士', 'Second Military Medical University · Master’s in Surgery', '导师：吴孟超院士', 'Supervisor: Mengchao Wu'),
    entry('1998–2003', '第二军医大学 · 临床医学学士', 'Second Military Medical University · Bachelor’s in Clinical Medicine')
  ];
  d.career = [
    entry('2024–', '主任医师、教授、博士生导师', 'Chief Physician, Professor and PhD Supervisor', '东方肝胆外科医院', 'Eastern Hepatobiliary Surgery Hospital'),
    entry('2015–2024', '副主任医师、副教授、硕士生导师', 'Associate Chief Physician, Associate Professor and Master’s Supervisor', '东方肝胆外科医院', 'Eastern Hepatobiliary Surgery Hospital'),
    entry('2008–2015', '主治医师、讲师', 'Attending Physician and Lecturer', '东方肝胆外科医院', 'Eastern Hepatobiliary Surgery Hospital'),
    entry('2003–2008', '住院医师、助教', 'Resident Physician and Teaching Assistant', '东方肝胆外科医院', 'Eastern Hepatobiliary Surgery Hospital')
  ];
  d.research = [
    { icon: 'flask', title: bi('肝癌早筛早诊', 'Early detection'), subtitle: 'Early Detection', text: bi('从 ASAP 血清标志物模型到整合 ctDNA 甲基化的 GAMAD 模型，开展肝癌早期诊断与多中心验证研究。', 'Developing and validating blood-based detection models, from serum biomarkers in ASAP to ctDNA methylation in GAMAD.') },
    { icon: 'liver', title: bi('精准外科与复发防控', 'Precision surgery & recurrence'), subtitle: 'Surgery & Recurrence', text: bi('研究手术决策、术后风险分层、标志物动态监测与辅助治疗，连接临床预测和分层干预。', 'Studying surgical decisions, postoperative risk stratification, biomarker monitoring and adjuvant treatment.') },
    { icon: 'chart', title: bi('转化医学与多模态 AI', 'Translation & multimodal AI'), subtitle: 'Translation & Multimodal AI', text: bi('探索纳米材料与肿瘤微环境干预，推进影像、病理、检验和临床文本的融合分析与决策支持研究。', 'Exploring nanomaterials and the tumor microenvironment, alongside integration of imaging, pathology, laboratory and clinical text data.') }
  ];
  d.projects = [
    entry('2025.01–2029.12', '国家杰出青年科学基金（首届临床杰青）', 'National Science Fund for Distinguished Young Scholars, inaugural clinical medicine cohort', '项目负责人；2024年获选，项目期自2025年起', 'Principal investigator; selected in 2024, project period beginning in 2025'),
    entry('2024.12–2028.01', '国家科技重大专项', 'National Science and Technology Major Project', '子课题负责人', 'Subproject principal investigator'),
    entry('2023.01–2026.12', '国家自然科学基金面上项目', 'NSFC General Program', '项目负责人', 'Principal investigator'),
    entry('2024.12–2026.12', '恒杰专项技术扶植计划', 'Hengjie Special Technology Support Program', '项目负责人', 'Principal investigator'),
    entry('2023.05–2026.04', '上海市优秀学术带头人', 'Shanghai Outstanding Academic Leader Program', '项目负责人', 'Principal investigator'),
    entry('2022.01–2025.12', '军队高层次科技创新人才工程基金', 'Military High-level Science and Technology Innovation Talent Program', '项目负责人', 'Principal investigator')
  ];
  d.appointments = [
    entry('2024.01–', 'iLIVER · 执行主编', 'iLIVER · Executive Editor'),
    entry('2025.11–', '中国抗癌协会第九届理事会 · 理事', 'China Anti-Cancer Association, 9th Council · Council Member'),
    entry('2025.11–', '中国抗癌协会第三届整合肿瘤学分会 · 常务委员', 'China Anti-Cancer Association, 3rd Integrative Oncology Committee · Standing Committee Member'),
    entry('2024.10–2028.10', '国际肝胆胰协会中国分会首届青年委员会 · 副主任委员', 'Chinese Chapter of IHPBA, 1st Youth Committee · Vice Chair'),
    entry('2024.10–2028.10', '国际肝胆胰协会中国分会首届转化医学专业委员会 · 副主任委员', 'Chinese Chapter of IHPBA, 1st Translational Medicine Committee · Vice Chair'),
    entry('2024.10–2028.10', '国际肝胆胰协会中国分会首届肝脏肿瘤专业委员会 · 常务委员', 'Chinese Chapter of IHPBA, 1st Liver Tumor Committee · Standing Committee Member'),
    entry('2024.07–2026.07', '中国医师协会外科医师分会肝胆青年专家工作组 · 副组长', 'Chinese Medical Doctor Association, Young Hepatobiliary Surgeons Working Group · Deputy Lead'),
    entry('2023.06–2026.06', '中国医师协会智慧医疗专业委员会数智化临床研究学组 · 副组长', 'Chinese Medical Doctor Association, Digital and Intelligent Clinical Research Group · Deputy Lead'),
    entry('2023.12–2025.12', 'View Medicine · 副主编', 'View Medicine · Associate Editor')
  ];
  d.additionalAppointments = [
    bi('国际肝胆胰协会（IHPBA）、亚太肝胆胰协会（A-PHPBA）学术委员会委员', 'Scientific committee member, IHPBA and A-PHPBA'),
    bi('国际肝胆胰协会中国分会（CC-IHPBA）秘书长', 'Secretary-General, Chinese Chapter of IHPBA'),
    bi('中国临床肿瘤学会（CSCO）青年委员会、肝癌专家委员会常务委员', 'Standing committee member, CSCO Youth Committee and Liver Cancer Expert Committee'),
    bi('Frontiers in Immunology 副主编；HBSN、HPB、Hepatic Oncology 等期刊编委', 'Associate editor, Frontiers in Immunology; editorial board service for HBSN, HPB, Hepatic Oncology and other journals'),
    bi('《中华外科杂志》《中华消化外科杂志》等核心期刊编委', 'Editorial board service for Chinese Journal of Surgery, Chinese Journal of Digestive Surgery and other journals')
  ];
  d.awards = [
    entry('2026', '中国抗癌协会青年科学家奖', 'Young Scientist Award, China Anti-Cancer Association'),
    entry('2026', '全国卫生健康行业青年创新大赛金奖', 'Gold Award, National Health Industry Youth Innovation Competition'),
    entry('2025', '第十二届树兰医学奖青年奖', '12th Shulan Medicine Youth Award'),
    entry('2025', '江苏省医学科技奖三等奖', 'Third Prize, Jiangsu Medical Science and Technology Award', '第2完成人', 'Second contributor'),
    entry('2025', '卫生健康行业青年创新大赛上海赛区金奖', 'Gold Award, Shanghai Division of the Health Industry Youth Innovation Competition'),
    entry('2024', '国家杰出青年科学基金（首届临床杰青）', 'National Science Fund for Distinguished Young Scholars, inaugural clinical medicine cohort'),
    entry('2024', '中国抗癌协会肿瘤标志物创新技术产品一等奖', 'First Prize, Innovative Tumor Biomarker Technology and Products, China Anti-Cancer Association'),
    entry('2024', '全国生命科学创新创业领军人物', 'National Leader in Life Science Innovation and Entrepreneurship'),
    entry('2023', '上海市优秀学术带头人', 'Shanghai Outstanding Academic Leader'),
    entry('2023', '全国首届临床医学研究奖', 'Inaugural National Clinical Medical Research Award'),
    entry('2023', '全国肝癌规范化诊疗 MDT 实践最佳优胜奖', 'Best Award, National MDT Practice for Standardized Liver Cancer Care'),
    entry('2022', '上海市卫生健康学科带头人；军队青年科技英才', 'Shanghai Health Discipline Leader; Military Young Science and Technology Talent'),
    entry('2022', '江苏省医药科技奖二等奖', 'Second Prize, Jiangsu Pharmaceutical and Medical Science and Technology Award', '第2完成人', 'Second contributor'),
    entry('2021', '上海市曙光学者', 'Shanghai Dawn Scholar'),
    entry('2020', '金山茶花杰出贡献奖', 'Golden Camellia Outstanding Contribution Award'),
    entry('2019 / 2013', '上海市科学技术奖一等奖（2项）', 'First Prize, Shanghai Science and Technology Award (two awards)', '2019年第2完成人；2013年第11完成人', 'Second contributor in 2019; eleventh contributor in 2013'),
    entry('2018 / 2017', '上海市杰出医学青年人才 / 杰出青年医学人才', 'Shanghai Outstanding Young Medical Talent Programs'),
    entry('2016', '上海市浦江人才；青年拔尖人才', 'Shanghai Pujiang Talent; Outstanding Young Talent'),
    entry('2015', '上海市青年医师银蛇奖二等奖', 'Second Prize, Shanghai Silver Snake Award for Young Physicians'),
    entry('2012', '吴孟超医学青年基金奖；上海市青年科技启明星', 'Mengchao Wu Young Medical Research Award; Shanghai Rising-Star Program')
  ];
  // Titles, inventor order and application numbers checked against the granted patent publications.
  d.patents = [
    {
      title: bi('基于外泌体红外光谱特征诊断早期肝癌的系统', 'System for early liver cancer diagnosis based on exosomal infrared spectral features'),
      number: 'ZL202310473802.3', publication: 'CN116559107B', granted: '2024-08-20',
      inventors: bi('刘知晓、邢昊、赵云鹏、杨田、王越', 'Zhixiao Liu, Hao Xing, Yunpeng Zhao, Tian Yang, Yue Wang'),
      url: 'https://patents.google.com/patent/CN116559107B/zh'
    },
    {
      title: bi('一种肿瘤靶向治疗缓释制剂及其制备方法', 'A sustained-release formulation for tumor-targeted therapy and its preparation method'),
      number: 'ZL201810139469.1', publication: 'CN108273058B', granted: '2021-09-17',
      inventors: bi('陈雨、李镇利、韩骏、邢昊、王明达、杨田', 'Yu Chen, Zhenli Li, Jun Han, Hao Xing, Mingda Wang, Tian Yang'),
      url: 'https://patents.google.com/patent/CN108273058B/zh'
    },
    {
      title: bi('酸度、光热响应型介孔MXene纳米片药物载体及制法', 'Acidity- and photothermal-responsive mesoporous MXene nanosheet drug carrier and its preparation method'),
      number: 'ZL201810139480.8', publication: 'CN108245682B', granted: '2021-03-12',
      inventors: bi('李镇利、杨悦、邢昊、韩骏、王正、杨田', 'Zhenli Li, Yue Yang, Hao Xing, Jun Han, Zheng Wang, Tian Yang'),
      url: 'https://patents.google.com/patent/CN108245682B/zh'
    },
    {
      title: bi('基于转录组测序技术用于早期肝癌诊断和预后评估的基因群及其应用', 'A transcriptome sequencing-based gene panel for early liver cancer diagnosis and prognostic assessment, and its application'),
      number: 'ZL201710306521.3', publication: 'CN107058550B', granted: '2020-11-10',
      inventors: bi('杨田、李超、梁磊、邢昊、韩骏、张汉', 'Tian Yang, Chao Li, Lei Liang, Hao Xing, Jun Han, Han Zhang'),
      url: 'https://patents.google.com/patent/CN107058550B/zh'
    }
  ];
  d.conferences = [
    { ...entry('2020.11', '第十四届 IHPBA 世界大会', '14th IHPBA World Congress', '线上会议 · 澳大利亚主办；参与“复杂肝囊肿诊疗进展”专题。', 'Virtual congress hosted from Australia; contributor to the symposium on advances in the management of complex liver cysts.'), url: 'https://www.ihpba.org/myHPB/world-congress/videos/?cid=11&start=25' },
    { ...entry('2019.09', '第七届 A-PHPBA 大会', '7th A-PHPBA Congress', '韩国首尔；受邀担任分会场主席。', 'Seoul, South Korea; invited session chair.'), url: 'https://www.ihpba.org/20_Regional-Meetings.html' },
    { ...entry('2018.09', '第十三届 IHPBA 世界大会', '13th IHPBA World Congress', '瑞士日内瓦；分会场主席，并在“Best of the Best”全体大会作口头报告，主题为肝细胞癌切除后晚期复发的危险因素、模式与结局。', 'Geneva, Switzerland; session chair and “Best of the Best” oral plenary presentation on risk factors, patterns and outcomes of late recurrence after HCC resection.'), url: 'https://www.ihpba.org/myHPB/world-congress/videos/?cid=10&start=75' },
    { ...entry('2016.04', '第十二届 IHPBA 世界大会', '12th IHPBA World Congress', '巴西圣保罗；“肝脏原发肿瘤”分会场主席。', 'São Paulo, Brazil; chair of the “Liver: Primary Tumors 1” session.'), url: 'https://www.ahpba.org/wp-content/uploads/2019/05/2016-Final-Program.pdf' }
  ];
  // Recognition listed in the university profile; conference roles also use the supplied presentation slides.
  d.conferenceAwards = [
    entry('2025', 'APASL · 青年科学家奖', 'APASL · Young Scientist Award', '中国亚太肝病学大会', 'APASL meeting in China'),
    entry('2024 / 2018', 'IHPBA · 主会场最佳主旨报告奖', 'IHPBA · Recognition for plenary presentations', '国际肝胆胰协会世界大会', 'IHPBA World Congress'),
    entry('2022', 'HBP Surgery Week · 大会主席特别荣誉奖', 'HBP Surgery Week · Presidential Award', '韩国国际肝胆胰外科周', 'International HBP Surgery Week, South Korea'),
    entry('2021', 'The Liver Week · 国际科学家奖', 'The Liver Week · Foreign Investigator Award', '韩国国际肝病周', 'The Liver Week, South Korea'),
    entry('2018', 'APPLE · 青年科学家奖', 'APPLE · Young Investigator Award', '亚太肝癌专家会议', 'Asia-Pacific Primary Liver Cancer Expert Meeting'),
    entry('2013', 'A-PHPBA · 青年科学家奖', 'A-PHPBA · Young Investigator Award', '亚太肝胆胰协会大会', 'Asian-Pacific Hepato-Pancreato-Biliary Association Congress')
  ];
  d.sources.forEach((s, i) => s.id = ['university', 'xinhua', 'supervisor', 'email', 'pubmed'][i]);
  d.sources.unshift(
    { id: 'resume', title: bi('杨田简历', 'Tian Yang’s curriculum vitae'), publisher: bi('维护者提供的履历资料', 'CV supplied by the site maintainer'), date: '', url: null, note: bi('教育与工作经历、院内职务、累计科研和临床数据、人才培养与科普经历。资料于2026年11月提供；原件未标明统一统计截止日期，网页中的累计数量按该版本引用。', 'Source for education, career, hospital roles, cumulative research and clinical figures, mentoring and outreach. Supplied in November 2026; no common statistical cutoff date is specified in the original. Cumulative figures reflect this version.') },
    { id: 'assessment', title: bi('期满考核评价表', 'End-of-term assessment'), publisher: bi('维护者提供的成果资料', 'Research record supplied by the site maintainer'), date: '', url: null, note: bi('用于补充近期项目、任职期限、荣誉、教学及 GAMAD 研究。代表论文的标题、作者与发表信息按期刊或文献数据库原始记录校正。', 'Source for recent projects, appointment periods, awards, teaching and GAMAD research. Publication metadata has been checked against journal and bibliographic records.') }
  );
})();
