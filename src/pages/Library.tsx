import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Documents from "@/components/site/Documents";
import Recommendations from "@/components/site/Recommendations";
import Volunteers from "@/components/site/Volunteers";
import { METHODICAL_GROUPS } from "@/data/recommendations";
import { usePageMeta } from "@/hooks/use-page-meta";

const LibraryPage = () => {
  usePageMeta(
    "Библиотека НКО: документы и методические материалы",
    "Методические рекомендации, памятки и образцы документов по волонтёрству, инклюзивному образованию и общественному контролю в психиатрии.",
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
      <Volunteers />
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
        description="Методические рекомендации, аналитические обзоры и обучающие материалы региональных ресурсных центров. Разделены по темам: регистрация, отчётность, финансы, добровольчество, продвижение и управление."
        groups={METHODICAL_GROUPS}
        buttonLabel="материалов"
      />
    </>
  );
};

export default LibraryPage;
