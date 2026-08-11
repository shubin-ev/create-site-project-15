import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const SECTIONS = [
  {
    path: '/about',
    icon: 'Users',
    title: 'О Совете',
    text: 'Цель и устройство работы, состав из 114 руководителей НКО, рабочие группы, документы и график заседаний.',
    meta: 'Состав · Группы · Заседания',
  },
  {
    path: '/volunteering',
    icon: 'HeartHandshake',
    title: 'Волонтёрство',
    text: 'Организации с волонтёрскими программами, методички и формы договоров с добровольцами, федеральные операторы.',
    meta: '15 организаций · 19 материалов',
  },
  {
    path: '/inclusive',
    icon: 'GraduationCap',
    title: 'Инклюзивное образование',
    text: 'Право на образование детей с ОВЗ и инвалидностью: нормы, стандарты, госпрограммы и финансирование.',
    meta: 'Справка · 62 акта',
  },
  {
    path: '/legal',
    icon: 'Scale',
    title: 'Правовая база',
    text: 'Каталог нормативно-правовых актов и разбор форм общественного контроля с полномочиями участников.',
    meta: '106 актов · 5 форм контроля',
  },
  {
    path: '/library',
    icon: 'BookOpen',
    title: 'Библиотека НКО',
    text: 'Памятки, образцы документов и методические сборники региональных ресурсных центров для НКО.',
    meta: 'Документы · 100 материалов',
  },
  {
    path: '/authorities',
    icon: 'Landmark',
    title: 'Органы власти',
    text: 'Контакты профильных ведомств по всем регионам страны и готовый шаблон обращения.',
    meta: '621 контакт · 83 региона',
  },
  {
    path: '/contacts',
    icon: 'Mail',
    title: 'Контакты',
    text: 'Написать в Совет, предложить тему заседания или узнать об условиях вступления.',
    meta: 'Форма обращения',
  },
];

const SectionsGrid = () => (
  <section className="border-t border-border py-16 sm:py-20">
    <div className="section-shell">
      <p className="eyebrow mb-6">Разделы сайта</p>
      <h2 className="max-w-[22ch] text-[1.9em] leading-tight">С чего начать</h2>

      <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((s) => (
          <li key={s.path}>
            <Link
              to={s.path}
              className="group flex h-full flex-col rounded-lg border border-border bg-background p-6 transition-colors hover:border-primary"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-primary">
                <Icon name={s.icon} fallback="FileText" size={22} />
              </span>
              <h3 className="mt-4 font-heading text-[1.1em] leading-snug">{s.title}</h3>
              <p className="mt-2 text-[0.9em] leading-[1.5] text-muted-foreground">{s.text}</p>
              <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
                <span className="text-[0.8em] text-muted-foreground">{s.meta}</span>
                <Icon
                  name="ArrowRight"
                  size={17}
                  className="flex-none text-primary transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default SectionsGrid;
