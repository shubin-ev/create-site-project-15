import { FormEvent, useState } from 'react';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF } from '@/data/council';
import func2url from '../../../backend/func2url.json';

type Errors = { name?: string; email?: string; message?: string };

const Contacts = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', org: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (key: keyof typeof form) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = 'Укажите, как к вам обращаться';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = 'Проверьте адрес электронной почты';
    if (form.message.trim().length < 10) next.message = 'Опишите вопрос — не менее 10 символов';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch(func2url['send-message'], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('fail');
      setSent(true);
      setForm({ name: '', org: '', email: '', message: '' });
      toast({
        title: 'Обращение отправлено',
        description: `Письмо ушло на ${CONTACT_EMAIL}. Мы свяжемся с вами.`,
      });
    } catch {
      toast({
        title: 'Не удалось отправить',
        description: `Напишите напрямую на ${CONTACT_EMAIL} или позвоните ${CONTACT_PHONE}.`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const field =
    'h-[52px] w-full rounded-lg border bg-surface px-4 transition-colors placeholder:text-tertiary hover:border-primary focus:border-primary';

  return (
    <section id="contacts" className="scroll-mt-24 py-14 sm:py-16">
      <div className="section-shell grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <div>
          <p className="eyebrow mb-5">Контакты и обратная связь</p>
          <h1 className="max-w-[20ch] text-[2.1em] font-medium leading-[1.15] tracking-tight">
Напишите нам
          </h1>
          <p className="mt-4 max-w-[52ch] text-muted-foreground">
            Ответим на&nbsp;вопросы о&nbsp;документах, порядке вступления в&nbsp;Совет и&nbsp;работе
            рабочих групп.
          </p>

          <div className="mt-8 space-y-3">
            <a
              href={`tel:${CONTACT_PHONE_HREF}`}
              className="flex min-h-[44px] items-center gap-4 rounded-lg border border-border bg-surface p-5 transition-colors hover:border-primary"
            >
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-secondary text-primary">
                <Icon name="Phone" size={22} />
              </span>
              <span>
                <span className="block text-[0.85em] text-muted-foreground">Телефон Совета</span>
                <span className="font-heading text-[1.05em]">{CONTACT_PHONE}</span>
              </span>
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex min-h-[44px] items-center gap-4 rounded-lg border border-border bg-surface p-5 transition-colors hover:border-primary"
            >
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-secondary text-primary">
                <Icon name="Mail" size={22} />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.85em] text-muted-foreground">Электронная почта</span>
                <span className="block truncate font-heading text-[1.05em]">{CONTACT_EMAIL}</span>
              </span>
            </a>
          </div>
        </div>

        <form onSubmit={submit} noValidate className="rounded-lg border border-border bg-surface p-6 sm:p-8">
          <h3 className="font-heading text-[1.25em]">Написать в Совет</h3>
          <p className="mt-2 text-[0.9em] text-muted-foreground">
            Заполните форму — обращение придёт на&nbsp;почту Совета {CONTACT_EMAIL}.
          </p>

          <div className="mt-6 space-y-5">
            <label className="block">
              <span className="mb-2 block text-[0.9em]">Как к вам обращаться</span>
              <input
                value={form.name}
                onChange={(e) => set('name')(e.target.value)}
                placeholder="Фамилия Имя Отчество"
                aria-invalid={Boolean(errors.name)}
                className={`${field} ${errors.name ? 'border-destructive' : 'border-border'}`}
              />
              {errors.name && (
                <span className="mt-2 flex items-center gap-1.5 text-[0.85em] text-destructive">
                  <Icon name="CircleAlert" size={14} />
                  {errors.name}
                </span>
              )}
            </label>

            <label className="block">
              <span className="mb-2 block text-[0.9em]">Организация (необязательно)</span>
              <input
                value={form.org}
                onChange={(e) => set('org')(e.target.value)}
                placeholder="Название НКО и регион"
                className={`${field} border-border`}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[0.9em]">Электронная почта</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set('email')(e.target.value)}
                placeholder="name@example.ru"
                aria-invalid={Boolean(errors.email)}
                className={`${field} ${errors.email ? 'border-destructive' : 'border-border'}`}
              />
              {errors.email && (
                <span className="mt-2 flex items-center gap-1.5 text-[0.85em] text-destructive">
                  <Icon name="CircleAlert" size={14} />
                  {errors.email}
                </span>
              )}
            </label>

            <label className="block">
              <span className="mb-2 block text-[0.9em]">Вопрос или обращение</span>
              <textarea
                value={form.message}
                onChange={(e) => set('message')(e.target.value)}
                rows={5}
                placeholder="Опишите, какая информация или документ вам нужны"
                aria-invalid={Boolean(errors.message)}
                className={`w-full rounded-lg border bg-surface p-4 leading-[1.5] transition-colors placeholder:text-tertiary hover:border-primary focus:border-primary ${
                  errors.message ? 'border-destructive' : 'border-border'
                }`}
              />
              {errors.message && (
                <span className="mt-2 flex items-center gap-1.5 text-[0.85em] text-destructive">
                  <Icon name="CircleAlert" size={14} />
                  {errors.message}
                </span>
              )}
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 font-heading text-[0.95em] font-medium text-primary-foreground transition-opacity hover:opacity-85 disabled:opacity-60 sm:w-auto"
          >
            {loading && <Icon name="LoaderCircle" size={18} className="animate-spin" />}
            {loading ? 'Отправляем' : 'Направить письмо'}
          </button>

          {sent && (
            <p className="mt-4 flex items-start gap-2 text-[0.88em] text-muted-foreground">
              <Icon name="CircleCheck" size={16} className="mt-0.5 flex-none text-teal" />
              Обращение отправлено на&nbsp;{CONTACT_EMAIL}. Ответим на&nbsp;указанный вами адрес.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contacts;
