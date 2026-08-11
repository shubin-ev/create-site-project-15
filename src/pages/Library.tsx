import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Documents from "@/components/site/Documents";
import Recommendations from "@/components/site/Recommendations";
import { METHODICAL_GROUPS } from "@/data/recommendations";
import { usePageMeta } from "@/hooks/use-page-meta";

const LibraryPage = () => {
  usePageMeta(
    "Библиотека НКО: документы и методические материалы",
    "Методические рекомендации, памятки и образцы документов для некоммерческих организаций: регистрация, отчётность, финансы и управление.",
  );
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [topic, setTopic] = useState<string | null>(params.get("topic"));

  return (
    <>
      <Documents
        query={query}
        onQueryChange={setQuery}
        topic={topic}
        onTopicChange={setTopic}
      />
      <Recommendations
        id="recommendations"
        eyebrow="Рекомендации для НКО"
        title="Образцы документов и инструкции"
        description="Памятки, типовые уставы, протоколы и пошаговые инструкции от ресурсных центров, министерств и управлений Минюста: как вести отчётность, оформить устав, войти в реестр поставщиков услуг и получить поддержку."
        groups={["Памятки и инструкции", "Образцы документов"]}
        buttonLabel="документов"
      />
      <Recommendations
        id="methodical"
        eyebrow="Методические материалы"
        title="Методички, сборники и обзоры регионов"
        description="Методические рекомендации, аналитические обзоры и обучающие материалы региональных ресурсных центров. Разделены по темам: регистрация, отчётность, финансы, продвижение и управление."
        groups={METHODICAL_GROUPS}
        buttonLabel="материалов"
      />

      <section
        id="library-table"
        className="scroll-mt-24 border-t border-border py-14 sm:py-16"
      >
        <div className="section-shell">
          <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
            <h2 className="font-heading text-[1.2em] leading-tight">
              Сводная таблица всех материалов
            </h2>
            <p className="mt-3 max-w-[68ch] text-[0.92em] leading-[1.55] text-muted-foreground">
              Все 97&nbsp;материалов библиотеки одним файлом: раздел, тип, название,
              организация, регион и&nbsp;прямая ссылка на&nbsp;документ. С&nbsp;фильтрами —
              удобно искать и&nbsp;отбирать нужное.
            </p>
            <a
              href="/docs/Biblioteka-NKO-svodnaya-tablitsa.xlsx"
              className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-primary px-5 text-[0.9em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Icon name="Table2" size={16} />
              Скачать таблицу, XLSX
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default LibraryPage;