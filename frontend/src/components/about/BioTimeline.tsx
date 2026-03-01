import type { BioSection } from '@/types/strapi';

const FALLBACK_SECTIONS: BioSection[] = [
  { period: '1941-1967', title: 'La Formazione', content: "Nato il 1 dicembre 1941 a Vicenza, durante il regime fascista. Figlio di Giuseppe, insegnante di filosofia e storia, fin da bambino Federico è attratto dalle macchine e dalla tecnologia.\n\nA 19 anni progetta il suo primo computer sperimentale all'Olivetti — \"Era alto 2 metri e largo come una porta.\" Si laurea in fisica con lode all'Università di Padova nel 1965, completando in 4 anni un percorso che normalmente ne richiede 7." },
  { period: '1968-1974', title: 'La Rivoluzione del Silicio', content: "Nel 1968 si trasferisce nella Silicon Valley. Alla Fairchild Semiconductor sviluppa la rivoluzionaria tecnologia MOS a porta di silicio (SGT).\n\nAlla Intel progetta l'Intel 4004 — il primo microprocessore commerciale al mondo (1971) — firmando le sue iniziali \"FF\" sulla maschera del chip. Seguono l'Intel 8008 e l'Intel 8080.\n\nNel 1974 co-fonda Zilog e concepisce lo Z80, uno dei microprocessori più diffusi della storia." },
  { period: '1986-2009', title: "L'Imprenditore", content: "Nel 1986 co-fonda Synaptics con il professor Carver Mead del Caltech. Partendo dalla ricerca sulle reti neurali, l'azienda sviluppa il primo touchpad per laptop (1992) e la tecnologia touchscreen (1999), diventando leader mondiale nelle interfacce uomo-macchina." },
  { period: '2009-oggi', title: 'La Coscienza', content: "La notte di Natale del 1990, a Lake Tahoe, Federico vive un'esperienza che cambierà per sempre la sua visione della realtà.\n\nQuesta esperienza avvia un percorso di oltre trent'anni dedicato allo studio scientifico della coscienza. Nel 2011, con la moglie Elvia, fonda la Federico and Elvia Faggin Foundation." },
];

export default function BioTimeline({ sections }: { sections?: BioSection[] }) {
  const displaySections = sections?.length ? sections : FALLBACK_SECTIONS;

  return (
    <section className="py-16 px-4 bg-bg-alt">
      <div className="max-w-[800px] mx-auto">
        {displaySections.map((section, i) => (
          <div key={section.period || i} className="relative pl-8 pb-12 border-l-2 border-primary last:pb-0">
            <div className="absolute -left-3 top-0 w-6 h-6 bg-primary rounded-full" />
            <div className="mb-2">
              <span className="text-sm font-bold text-primary">{section.period}</span>
              <h3 className="font-heading text-2xl font-bold text-dark">{section.title}</h3>
            </div>
            <div className="text-text-light leading-relaxed whitespace-pre-line">{section.content}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
