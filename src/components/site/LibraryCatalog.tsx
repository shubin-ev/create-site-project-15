import { useMemo, useState } from "react";
import Icon from "@/components/ui/icon";
import { LIBRARY_BLOCKS, LIBRARY_ITEMS, LibraryItem } from "@/data/library";

const BLOCK_IDS: Record<string, string> = {
  "Практики и методики": "practices",
  "Как вести НКО": "how-to",
  "Образцы документов": "samples",
};

const plural = (n: number) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "материал";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20))
    return "материала";
  return "материалов";
};

const formatIcon = (format: string) =>
  format === "DOCX" ? "FileText" : format === "XLSX" ? "Table2" : "FileType2";

const Item = ({ item }: { item: LibraryItem }) => {
  const meta = [
    item.org,
    item.region !== item.org ? item.region : "",
    item.format,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <li className="border-t border-border py-4 first:border-t-0">
      <div className="flex gap-3.5">
        <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-secondary text-primary">
          <Icon name={formatIcon(item.format)} size={18} />
        </span>
        <div className="min-w-0">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading text-[0.98em] leading-snug text-primary hover:underline"
          >
            {item.title}
          </a>
          {meta && (
            <p className="mt-1 text-[0.82em] text-muted-foreground">{meta}</p>
          )}
        </div>
      </div>
    </li>
  );
};

const LibraryCatalog = () => {
  const [query, setQuery] = useState("");
  const [openTopic, setOpenTopic] = useState<string | null>(null);

  const found = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return null;
    return LIBRARY_ITEMS.filter((d) =>
      `${d.title} ${d.org} ${d.region} ${d.topic}`.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <section id="documents" className="scroll-mt-24 bg-surface py-14 sm:py-16">
      <div className="section-shell">
        <p className="eyebrow mb-5">Библиотека</p>
        <h1 className="max-w-[24ch] text-[2.1em] font-medium leading-[1.15] tracking-tight">
          Методики, документы и&nbsp;образцы для&nbsp;НКО
        </h1>
        <p className="mt-4 max-w-[62ch] text-muted-foreground">
          {LIBRARY_ITEMS.length} материалов от&nbsp;организаций, министерств
          и&nbsp;ресурсных центров. Файлы открываются в&nbsp;новой вкладке.
        </p>

        <div className="mt-7 flex h-[52px] max-w-[520px] items-center gap-3 rounded-lg border border-border bg-background px-4">
          <Icon
            name="Search"
            size={20}
            className="flex-none text-muted-foreground"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Название, организация или регион"
            aria-label="Поиск по библиотеке"
            className="h-full w-full border-0 bg-transparent text-[0.95em] outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button
              type="button"
              aria-label="Очистить поиск"
              onClick={() => setQuery("")}
              className="flex-none text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={18} />
            </button>
          )}
        </div>

        {found ? (
          <div className="mt-8">
            {found.length === 0 ? (
              <p className="text-muted-foreground">
                Ничего не&nbsp;найдено. Попробуйте другое слово или очистите
                поиск.
              </p>
            ) : (
              <>
                <p className="text-[0.88em] text-muted-foreground">
                  Найдено: {found.length} {plural(found.length)}
                </p>
                <div className="mt-4 rounded-lg border border-border bg-background px-5">
                  {LIBRARY_BLOCKS.map((block) => {
                    const list = found.filter((d) => d.block === block.title);
                    if (!list.length) return null;
                    return (
                      <div
                        key={block.title}
                        className="border-t border-border pt-5 first:border-t-0"
                      >
                        <p className="eyebrow">{block.title}</p>
                        <ul className="mt-2">
                          {list.map((d) => (
                            <Item key={`${d.title}-${d.url}`} item={d} />
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="mt-10 space-y-12">
            {LIBRARY_BLOCKS.map((block) => {
              const inBlock = LIBRARY_ITEMS.filter(
                (d) => d.block === block.title,
              );
              return (
                <section
                  key={block.title}
                  id={BLOCK_IDS[block.title]}
                  className="scroll-mt-24"
                >
                  <div className="border-l-[3px] border-teal pl-4">
                    <h2 className="font-heading text-[1.35em] leading-tight">
                      {block.title}
                    </h2>
                    <p className="mt-1.5 max-w-[68ch] text-[0.9em] leading-[1.5] text-muted-foreground">
                      {block.text}
                    </p>
                    <p className="mt-1.5 text-[0.85em] text-muted-foreground">
                      {inBlock.length} {plural(inBlock.length)}
                    </p>
                  </div>

                  <div className="mt-4 space-y-2.5">
                    {block.topics.map((topic) => {
                      const list = inBlock.filter((d) => d.topic === topic);
                      if (!list.length) return null;
                      const key = `${block.title}/${topic}`;
                      const isOpen = openTopic === key;
                      return (
                        <div
                          key={key}
                          className="overflow-hidden rounded-lg border border-border bg-background"
                        >
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            onClick={() => setOpenTopic(isOpen ? null : key)}
                            className="flex min-h-[56px] w-full items-center justify-between gap-3 px-5 text-left transition-colors hover:text-primary"
                          >
                            <span className="font-heading text-[1em] leading-snug">
                              {topic}
                            </span>
                            <span className="flex flex-none items-center gap-2.5 text-[0.85em] text-muted-foreground">
                              {list.length}
                              <Icon
                                name="ChevronDown"
                                size={18}
                                className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                              />
                            </span>
                          </button>
                          {isOpen && (
                            <ul className="border-t border-border px-5">
                              {list.map((d) => (
                                <Item key={`${d.title}-${d.url}`} item={d} />
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default LibraryCatalog;
