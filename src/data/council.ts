export const LOGO_URL = '/logo-council.svg';

export const CONTACT_EMAIL = 'nko@mental-health-russia.ru';
export const CONTACT_TELEGRAM = 'https://t.me/Yuriy_Osadshiy';
export const CONTACT_TELEGRAM_LABEL = '@Yuriy_Osadshiy';
export const SOURCE_SITE = 'https://mental-health-russia.ru';

export const NAV_LINKS = [
  { id: 'about', label: 'О Совете' },
  { id: 'members', label: 'Состав' },
  { id: 'documents', label: 'Документы' },
  { id: 'meetings', label: 'Заседания' },
  { id: 'materials', label: 'Материалы' },
  { id: 'contacts', label: 'Контакты' },
];

export const HERO_TAGS = [
  'Волонтёрство в психиатрии',
  'Инклюзивное образование',
  'Общественный контроль',
  'Нормативно-правовые акты',
];

export const STATS = [
  { value: '85', label: 'регионов РФ в составе' },
  { value: '51', label: 'документ в каталоге' },
  { value: '2', label: 'рабочие группы' },
  { value: '7', label: 'тематических направлений' },
];

export const ABOUT_TABS = [
  {
    id: 'council',
    title: 'О нас',
    text: [
      'Совет некоммерческих организаций в сфере охраны психического здоровья при Российском обществе психиатров — структура, призванная наладить тесное взаимодействие между НКО и профессиональным психиатрическим сообществом.',
      'Инициатором создания Совета, в состав которого вошли руководители некоммерческих организаций из 85 регионов Российской Федерации, выступил Союз охраны психического здоровья.',
    ],
  },
  {
    id: 'goal',
    title: 'Наша цель',
    text: [
      'Развитие общественно-ориентированной системы медико-социальной реабилитации детей и взрослых людей с психическими особенностями.',
      'Обеспечение скоординированных действий некоммерческих организаций, психиатрического сообщества, органов власти и средств массовой информации.',
    ],
  },
  {
    id: 'work',
    title: 'Как устроена работа',
    text: [
      'Заседания Совета проводятся в онлайн-режиме на платформе ZOOM в 9:00 по московскому времени по утверждённому графику.',
      'Между заседаниями работу ведут рабочие группы. Документы, положения, отчёты и методические материалы регионов публикуются в открытом каталоге.',
    ],
  },
];

export const QUOTES = [
  {
    text: 'Значимость создания Совета — в формировании единой модели психосоциальной реабилитации во всех регионах РФ и укреплении роли некоммерческих организаций в системе охраны психического здоровья.',
    author:
      'Н. Г. Незнанов, д.м.н., профессор, президент Российского общества психиатров, директор НМИЦ психиатрии и неврологии им. В. М. Бехтерева',
  },
  {
    text: 'Необходим продуктивный диалог между участниками Совета и профессиональным психиатрическим сообществом, важно развивать систему психосоциальной реабилитации, несмотря на экономические, территориальные и иные различия регионов России.',
    author: 'Н. В. Треушникова, президент Союза охраны психического здоровья',
  },
];

export type Meeting = {
  date: string;
  iso: string;
  title: string;
  format: string;
  note: string;
};

export const MEETINGS: Meeting[] = [
  {
    date: '19 марта 2026',
    iso: '2026-03-19',
    title: 'Заседание Совета НКО при РОП',
    format: 'Онлайн, ZOOM',
    note: 'Заседание по графику Совета на 2026 год. Ссылка на подключение предоставляется отдельно.',
  },
];

export type DocItem = {
  title: string;
  org?: string;
  type: string;
  topic: string;
  year: string;
  format: string;
  url: string;
};

const UP = 'https://mental-health-russia.ru/wp-content/uploads';

export const DOC_TYPES = [
  'Все типы',
  'Положение',
  'Отчёт',
  'Состав',
  'Нормативно-правовые акты',
  'Методические материалы',
  'Формы документов',
];

export const DOC_TOPICS = [
  'Все темы',
  'Документы Совета',
  'Рабочие группы',
  'Волонтёрство в психиатрии',
  'Инклюзивное образование',
  'Общественный контроль в психиатрии',
  'Нормативно-правовые акты',
  'Материалы регионов',
];

export const DOC_YEARS = ['Все годы', '2025', '2023', '2022', '2021'];

export const DOCUMENTS: DocItem[] = [
  {
    title: 'Положение о Совете НКО при Российском обществе психиатров',
    type: 'Положение',
    topic: 'Документы Совета',
    year: '2021',
    format: 'PDF',
    url: `${UP}/2021/11/Polozhenie-o-Sovete-NKO-pri-ROP.pdf`,
  },
  {
    title: 'Свод этических принципов для членов Совета НКО',
    type: 'Положение',
    topic: 'Документы Совета',
    year: '2021',
    format: 'PDF',
    url: `${UP}/2021/11/Svod-eticheskih-printsipov-Soveta-NKO.pdf`,
  },
  {
    title: 'Состав Совета НКО',
    type: 'Состав',
    topic: 'Документы Совета',
    year: '2025',
    format: 'PDF',
    url: `${UP}/2025/02/NKO-02.2025.pdf`,
  },
  {
    title: 'Отчёт о работе Совета НКО при РОП за 2022 год',
    type: 'Отчёт',
    topic: 'Документы Совета',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2023/01/Otchet-Sovet-NKO-pri-ROP-za-2022-g.pdf`,
  },
  {
    title: 'Отчёт о работе Совета НКО при РОП за 2023 год',
    type: 'Отчёт',
    topic: 'Документы Совета',
    year: '2023',
    format: 'PDF',
    url: `${UP}/2024/05/Otchet-o-rabote-Soveta-NKO-pri-ROP-za-2023-g.pdf`,
  },

  {
    title: 'НПА РФ в сфере волонтёрства',
    type: 'Нормативно-правовые акты',
    topic: 'Нормативно-правовые акты',
    year: '2022',
    format: 'DOCX',
    url: `${UP}/2022/02/2.-NPA-RF-v-sfere-volonterstva.docx`,
  },
  {
    title: 'НПА РФ в сфере инклюзивного образования (Приложение 1)',
    type: 'Нормативно-правовые акты',
    topic: 'Нормативно-правовые акты',
    year: '2022',
    format: 'DOCX',
    url: `${UP}/2022/02/2.-NPA-RF-v-sfere-inklyuzivnogo-obrazovaniya-Prilozhenie-1.docx`,
  },
  {
    title: 'НПА РФ, составляющие правовую основу Общественного контроля',
    type: 'Нормативно-правовые акты',
    topic: 'Нормативно-правовые акты',
    year: '2022',
    format: 'DOCX',
    url: `${UP}/2022/02/4.-NPA-RFsostavlyayuschie-pravovuyu-osnovu-Obschestvennogo-kontrolya-1.docx`,
  },

  {
    title: 'Волонтёрство в субъектах РФ (сводная таблица)',
    type: 'Методические материалы',
    topic: 'Волонтёрство в психиатрии',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/1.-Volonterstvo-v-subektah-RF-svodnaya-tablitsa.pdf`,
  },
  {
    title: 'НПА РФ в сфере волонтёрства',
    type: 'Нормативно-правовые акты',
    topic: 'Волонтёрство в психиатрии',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/2.-NPA-RF-v-sfere-volonterstva.pdf`,
  },
  {
    title: 'Методические рекомендации в сфере волонтёрства',
    type: 'Методические материалы',
    topic: 'Волонтёрство в психиатрии',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/3.-Metodicheskie-rekomendatsii-v-sfere-volonterstva.pdf`,
  },
  {
    title: 'Информация об организациях, участвующих в развитии волонтёрства в РФ',
    type: 'Методические материалы',
    topic: 'Волонтёрство в психиатрии',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/4.-Informatsiya-ob-organizatsiyah-uchastvuyuschih-v-razvitii-volonterstva.pdf`,
  },
  {
    title: 'Перечень волонтёрских НКО (в отношении лиц с психическими особенностями)',
    type: 'Методические материалы',
    topic: 'Волонтёрство в психиатрии',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/5.-Perechen-volonterskih-NKO-v-otnoshenii-lits-s-psih.osobennostyami.pdf`,
  },
  {
    title: 'Положение о волонтёрской деятельности в НКО',
    org: 'Союз охраны психического здоровья',
    type: 'Формы документов',
    topic: 'Волонтёрство в психиатрии',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/Polozhenie-o-volonterskoj-deyatelnosti-v-NKO-SOPZ.pdf`,
  },
  {
    title: 'Соглашение о взаимодействии между НКО и медицинской организацией',
    org: 'Союз охраны психического здоровья',
    type: 'Формы документов',
    topic: 'Волонтёрство в психиатрии',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/Soglashenie-o-vzaimodejstvii-mezhdu-NKO-i-med.org-SOPZ.pdf`,
  },
  {
    title: 'Договор с добровольцем',
    org: 'СПбБОО «Перспективы»',
    type: 'Формы документов',
    topic: 'Волонтёрство в психиатрии',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/Dogovor-s-dobrovoltsem.pdf`,
  },
  {
    title: 'Договор с добровольцем (Добровольный социальный год, ПНИ)',
    org: 'СПбБОО «Перспективы»',
    type: 'Формы документов',
    topic: 'Волонтёрство в психиатрии',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/Dogovor-s-dobrovoltsem-Dobrovolnyi-sotsialnyi-god-PNI.pdf`,
  },
  {
    title: 'Приложение 1 к Договору (Детский дом)',
    org: 'СПбБОО «Перспективы»',
    type: 'Формы документов',
    topic: 'Волонтёрство в психиатрии',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/Prilozhenie-1-k-Dogovoru-Detskii-dom.pdf`,
  },
  {
    title: 'Приложение 1 к Договору (Кризисная поддержка семей)',
    org: 'СПбБОО «Перспективы»',
    type: 'Формы документов',
    topic: 'Волонтёрство в психиатрии',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/Prilozhenie-1-k-Dogovoru-Krizisnaya-podderzhka-semei.pdf`,
  },
  {
    title: 'Приложение 1 к Договору с добровольцем (Добровольный социальный год, ПНИ)',
    org: 'СПбБОО «Перспективы»',
    type: 'Формы документов',
    topic: 'Волонтёрство в психиатрии',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/Prilozhenie-1-k-Dogovoru-s-dobrovoltsem-Dobrovolnyi-sotsialnyi-god-PNI.pdf`,
  },

  {
    title: 'Информация о финансовом обеспечении образования (инклюзивного образования) в РФ',
    type: 'Методические материалы',
    topic: 'Инклюзивное образование',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/1.-Informatsiya-o-fin.-obespechenii-obrazovaniya-inkl.obrazovaniya-v-RF.pdf`,
  },
  {
    title: 'НПА РФ в сфере инклюзивного образования (Приложение 1)',
    type: 'Нормативно-правовые акты',
    topic: 'Инклюзивное образование',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/2.-NPA-RF-v-sfere-inklyuzivnogo-obrazovaniya-Prilozhenie-1.pdf`,
  },
  {
    title: 'Статьи Федерального закона «Об образовании в РФ» от 29.12.2012 № 273-ФЗ (Приложение 2)',
    type: 'Нормативно-правовые акты',
    topic: 'Инклюзивное образование',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/3.-Stati-FZ-Ob-obrazovanii-v-RF-ot-29.12.2012-N-273-FZ-Prilozhenie-2.pdf`,
  },

  {
    title: 'Основные положения об Общественном контроле в РФ',
    type: 'Методические материалы',
    topic: 'Общественный контроль в психиатрии',
    year: '2022',
    format: 'DOCX',
    url: `${UP}/2022/02/1.-Osnovnye-polozheniya-ob-Obschestvennom-kontrole-v-RF.docx`,
  },
  {
    title: 'Субъекты Общественного контроля (цели, задачи, полномочия)',
    type: 'Методические материалы',
    topic: 'Общественный контроль в психиатрии',
    year: '2022',
    format: 'DOCX',
    url: `${UP}/2022/02/2.-Subekty-Obschestvennogo-kontrolya-tselizadachipolnomochiya.docx`,
  },
  {
    title: 'Формы и порядок осуществления Общественного контроля',
    type: 'Методические материалы',
    topic: 'Общественный контроль в психиатрии',
    year: '2022',
    format: 'DOCX',
    url: `${UP}/2022/02/3.-Formy-i-poryadok-osuschestvleniya-Obschestvennogo-kontrolya.docx`,
  },
  {
    title: 'НПА РФ, составляющие правовую основу Общественного контроля',
    type: 'Нормативно-правовые акты',
    topic: 'Общественный контроль в психиатрии',
    year: '2022',
    format: 'DOCX',
    url: `${UP}/2022/02/4.-NPA-RFsostavlyayuschie-pravovuyu-osnovu-Obschestvennogo-kontrolya.docx`,
  },

  {
    title: 'В помощь начинающему волонтёру',
    org: 'СПбБОО «Перспективы»',
    type: 'Методические материалы',
    topic: 'Материалы регионов',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/V-pomosch-nachinayuschemu-volonteru-SPbBOO-Perspektivy.pdf`,
  },
  {
    title: 'Как привлечь волонтёров и поддержать их мотивацию',
    org: 'СПбБОО «Перспективы»',
    type: 'Методические материалы',
    topic: 'Материалы регионов',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/Kak-privlech-volonterov-i-podderzhat-ih-motivatsiyu-SPbBOO-Perspektivy.pdf`,
  },
  {
    title: 'Комфортное взаимодействие',
    org: 'СПбБОО «Перспективы»',
    type: 'Методические материалы',
    topic: 'Материалы регионов',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/Komfortnoe-vzaimodejstvie-SPbBOO-Perspektivy.pdf`,
  },
  {
    title:
      'Модель командного, межведомственного и межсекторного взаимодействия в заботе о ребёнке в интернате',
    org: 'СПбБОО «Перспективы»',
    type: 'Методические материалы',
    topic: 'Материалы регионов',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/Model-komandnogo-mezhved.-i-mezhsektor.vzaimodejstviya-v-zabote-o-rebenke-v-internate-SPbBOO-Perspektivy.pdf`,
  },
  {
    title: 'Перевод из детских во взрослые ПНИ',
    org: 'СПбБОО «Перспективы»',
    type: 'Методические материалы',
    topic: 'Материалы регионов',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/Perevod-iz-detskih-vo-vzroslye-PNI-SPbBOO-Perspektivy.pdf`,
  },
  {
    title: 'Социальный куратор: предпосылки, настоящее, будущее',
    org: 'СПбБОО «Перспективы»',
    type: 'Методические материалы',
    topic: 'Материалы регионов',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/Sotsialnyj-kurator-predposylki-nastoyaschee-buduschee-SPbBOO-Perspektivy.pdf`,
  },
  {
    title: 'Центр дневного пребывания для детей с ТМНР',
    org: 'СПбБОО «Перспективы»',
    type: 'Методические материалы',
    topic: 'Материалы регионов',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/tsentr-dnevnogo-prebyvaniya-dlya-detej-s-TMNR-SPbBOO-Perspektivy.pdf`,
  },
  {
    title: 'Центр дневной трудовой занятости',
    org: 'СПбБОО «Перспективы» и АНО «Новые перспективы»',
    type: 'Методические материалы',
    topic: 'Материалы регионов',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/tsentr-dnevnoj-trudovoj-zanyatosti-SPbBOO-Perspektivy-i-ANO-Novye-perspektivy.pdf`,
  },
  {
    title: 'Школа правовой грамотности (для занятий со взрослыми людьми в ПНИ)',
    org: 'СПбБОО «Перспективы»',
    type: 'Методические материалы',
    topic: 'Материалы регионов',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/shkola-pravovoj-gramotnosti-dlya-zanyatij-so-vzroslymi-lyudmi-v-PNI-SPbBOO-Perspektivy.pdf`,
  },
  {
    title: 'Быть наставником. Пособие для волонтёра',
    org: 'БФ «Волонтёры в помощь детям-сиротам» и БФ «Дети наши»',
    type: 'Методические материалы',
    topic: 'Материалы регионов',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/Byt-nastavnikom-Posobie-dlya-volontera-BF-Volontery-v-pomosch-detyam-sirotam-i-BF-Deti-nashi.pdf`,
  },
  {
    title: 'Волонтёрский уход за детьми-сиротами в больницах',
    org: 'БФ «Волонтёры в помощь детям-сиротам»',
    type: 'Методические материалы',
    topic: 'Материалы регионов',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/Volonterskij-uhod-za-detmi-sirotami-v-bolnitsah-BF-Volontery-v-pomosch-detyam-sirotam.pdf`,
  },
  {
    title: 'Практики деятельности волонтёрских организаций в сфере профилактики социального сиротства',
    org: 'БФ «Волонтёры в помощь детям-сиротам»',
    type: 'Методические материалы',
    topic: 'Материалы регионов',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/Praktiki-deyatelnosti-volont.org-v-sfere-profilaktiki-sots.sirotstva-BF-Volontery-v-pomosch-detyam-sirotam.pdf`,
  },
  {
    title: 'Особая кисть. Обучение основам ИЗО',
    org: 'Ивановская ООО молодых инвалидов и их родителей «Грани»',
    type: 'Методические материалы',
    topic: 'Материалы регионов',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/02/Osobaya-kist.-Obuchenie-osnovam-IZO.-Grani.pdf`,
  },
  {
    title: 'Памятка при встрече с особенными людьми',
    org: 'Воронежская БРОО родителей «Перспектива»',
    type: 'Методические материалы',
    topic: 'Материалы регионов',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/04/Pamyatka-vstrecha-s-osobennymi-lyudmi.pdf`,
  },
  {
    title: 'Справка об общественном проекте «Ментальное здоровье»',
    org: 'Общественный проект «Ментальное здоровье»',
    type: 'Методические материалы',
    topic: 'Материалы регионов',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/09/OP-Mentalnoe-zdorove-1.pdf`,
  },

  {
    title: 'Состав рабочей группы «Волонтёрство в психиатрии»',
    type: 'Состав',
    topic: 'Рабочие группы',
    year: '2021',
    format: 'PDF',
    url: `${UP}/2021/11/sostav-rabochej-gruppy-Volonterstvo-v-psihiatrii.pdf`,
  },
  {
    title: 'Состав рабочей группы по сопровождаемому проживанию и трудовой занятости',
    type: 'Состав',
    topic: 'Рабочие группы',
    year: '2021',
    format: 'PDF',
    url: `${UP}/2021/12/Sostav-RG-po-soprovozhdaemomu-prozhivaniyu-i-trudovoj-zanyatosti95.pdf`,
  },
  {
    title: 'Работа с волонтёрами',
    org: 'БОО «Перспективы»',
    type: 'Методические материалы',
    topic: 'Рабочие группы',
    year: '2021',
    format: 'PDF',
    url: `${UP}/2021/12/Rabota-s-volonterami-BOO-Perspektivy.pdf`,
  },
  {
    title: 'Задачи для волонтёров № 1',
    org: 'БОО «Перспективы»',
    type: 'Методические материалы',
    topic: 'Рабочие группы',
    year: '2021',
    format: 'PDF',
    url: `${UP}/2021/12/Zadachi-dlya-volonterov-1-BOO-Perspektivy.pdf`,
  },
  {
    title: 'Методичка для волонтёров',
    org: 'БОО «Перспективы»',
    type: 'Методические материалы',
    topic: 'Рабочие группы',
    year: '2021',
    format: 'PDF',
    url: `${UP}/2021/12/Metodichka_dlya-volonterov-BOO-Perspektivy.pdf`,
  },
  {
    title: 'ЯНАО. Презентация «Поставщик социальных услуг»',
    org: 'Ямало-Ненецкий автономный округ',
    type: 'Методические материалы',
    topic: 'Рабочие группы',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/04/yaNAO_Prezentatsiya_Postavschik-sotsialnyh-uslug.pdf`,
  },
  {
    title: 'ЯНАО. Постановление 750-п «О формировании реестра»',
    org: 'Ямало-Ненецкий автономный округ',
    type: 'Нормативно-правовые акты',
    topic: 'Рабочие группы',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/04/yaNAO_750-p_O-formirovanii-reestra.pdf`,
  },
  {
    title: 'ЯНАО. Постановление 1087-П (2022) «О порядке предоставления услуг»',
    org: 'Ямало-Ненецкий автономный округ',
    type: 'Нормативно-правовые акты',
    topic: 'Рабочие группы',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/04/yaNAO_1087-P_2022_O-poryadke-predostavleniya-uslug.pdf`,
  },
  {
    title: 'ЯНАО. Тарифы на социальные услуги',
    org: 'Ямало-Ненецкий автономный округ',
    type: 'Нормативно-правовые акты',
    topic: 'Рабочие группы',
    year: '2022',
    format: 'PDF',
    url: `${UP}/2022/04/yaNAO_Tarify-na-sotsialnye-uslugi.pdf`,
  },
];

export type Member = {
  name: string;
  role: string;
  position: string;
};

export const MEMBERS: Member[] = [
  {
    name: 'Осадший Юрий Юрьевич',
    role: 'Председатель Совета НКО',
    position: 'Врач-психиатр, психотерапевт.',
  },
  {
    name: 'Треушникова Наталья Валериевна',
    role: 'Организационный комитет',
    position:
      'Президент Союза охраны психического здоровья, член Исполнительного комитета Российского общества психиатров, врач-психиатр, нарколог.',
  },
  {
    name: 'Кац Юрий Михайлович',
    role: 'Организационный комитет',
    position:
      'Заместитель председателя Владимирской областной общественной организации «Ассоциация родителей детей-инвалидов «Свет».',
  },
  {
    name: 'Гебель Кира Манфредовна',
    role: 'Организационный комитет',
    position:
      'Председатель СПб РО ОООИ «Новые возможности», к.м.н., врач психиатр-психотерапевт высшей категории, заведующая медико-реабилитационным отделением СПб ГБУЗ «ПБ № 1 им. П. П. Кащенко».',
  },
  {
    name: 'Титкова Ольга Станиславовна',
    role: 'Организационный комитет',
    position:
      'Директор АНО содействия социальной адаптации семьи и детей «Центр развития социального интеллекта», эксперт в области защиты семьи и детства, инклюзии в культурно-просветительской сфере, эксперт и консультант в области социального проектирования и фандрайзинга в малобюджетных НКО.',
  },
  {
    name: 'Толпекина Наталья Викторовна',
    role: 'Организационный комитет',
    position:
      'Президент Благотворительного фонда помощи детям, больным ДЦП и иными тяжёлыми заболеваниями «Божья коровка» (г. Орёл).',
  },
  {
    name: 'Толмачев Владимир Алексеевич',
    role: 'Организационный комитет',
    position:
      'Председатель Нижегородского регионального отделения Общероссийской общественной организации инвалидов «Новые возможности» (г. Нижний Новгород).',
  },
  {
    name: 'Шпицберг Игорь Леонидович',
    role: 'Организационный комитет',
    position:
      'Руководитель Центра реабилитации инвалидов детства «Наш Солнечный Мир», член правления Международной ассоциации Autism Europe, член Совета МГАРДИ, член Экспертного совета Министерства просвещения РФ по вопросам комплексного сопровождения детей с расстройствами аутистического спектра (г. Москва).',
  },
];

export const MATERIALS = [
  {
    icon: 'HeartHandshake',
    title: 'Волонтёрство в психиатрии',
    text: 'Сводные данные по субъектам РФ, методические рекомендации, формы договоров с добровольцами.',
    topic: 'Волонтёрство в психиатрии',
  },
  {
    icon: 'GraduationCap',
    title: 'Инклюзивное образование',
    text: 'Финансовое обеспечение образования, профильные нормативные акты и статьи 273-ФЗ.',
    topic: 'Инклюзивное образование',
  },
  {
    icon: 'ShieldCheck',
    title: 'Общественный контроль в психиатрии',
    text: 'Основные положения, субъекты контроля, формы и порядок его осуществления.',
    topic: 'Общественный контроль в психиатрии',
  },
  {
    icon: 'Scale',
    title: 'Нормативно-правовые акты',
    text: 'Подборки НПА РФ по волонтёрству, инклюзивному образованию и общественному контролю.',
    topic: 'Нормативно-правовые акты',
  },
  {
    icon: 'BookOpen',
    title: 'Материалы регионов',
    text: 'Методические пособия и практики НКО из Санкт-Петербурга, Иванова, Воронежа и других регионов.',
    topic: 'Материалы регионов',
  },
  {
    icon: 'Users',
    title: 'Рабочие группы',
    text: 'Составы рабочих групп, методички для волонтёров, региональные документы ЯНАО.',
    topic: 'Рабочие группы',
  },
];

export const WORK_GROUPS = [
  {
    title: 'По волонтёрству в психиатрии',
    schedule: 'Онлайн, ZOOM, еженедельно по средам в 9:30 МСК',
    text: 'Развитие волонтёрских практик в психиатрии: методички для волонтёров, задачи, работа с добровольцами. Ссылка на подключение предоставляется отдельно.',
    docUrl: `${UP}/2021/11/sostav-rabochej-gruppy-Volonterstvo-v-psihiatrii.pdf`,
  },
  {
    title: 'По сопровождаемому проживанию и трудоустройству',
    schedule: 'Онлайн, ZOOM, по отдельному расписанию',
    text: 'Сопровождаемое проживание и трудовая занятость: региональные модели, реестры поставщиков социальных услуг, тарифы.',
    docUrl: `${UP}/2021/12/Sostav-RG-po-soprovozhdaemomu-prozhivaniyu-i-trudovoj-zanyatosti95.pdf`,
  },
];