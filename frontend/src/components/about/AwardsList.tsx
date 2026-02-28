import { useTranslations } from 'next-intl';

const FALLBACK_AWARDS = [
  { year: 2019, title: 'Cavaliere di Gran Croce', description: 'Presidente Mattarella' },
  { year: 2014, title: 'Premio Enrico Fermi', description: 'Società Italiana di Fisica' },
  { year: 2009, title: 'National Medal of Technology and Innovation', description: 'Presidente Obama' },
  { year: 2006, title: 'Lifetime Achievement Award', description: 'European Patent Organization' },
  { year: 1997, title: 'Kyoto Prize per la Tecnologia Avanzata', description: '' },
  { year: 1996, title: 'National Inventors Hall of Fame', description: '' },
  { year: 1994, title: 'IEEE W. Wallace McDowell Award', description: '' },
  { year: 1988, title: 'Marconi International Fellowship Award', description: '' },
  { year: 1988, title: "Medaglia d'Oro per la Scienza e la Tecnologia", description: 'Presidente della Repubblica' },
];

export default function AwardsList({ awards }: { awards?: any[] }) {
  const t = useTranslations('about');
  const displayAwards = awards?.length ? awards : FALLBACK_AWARDS;

  return (
    <section className="py-16 px-4 bg-dark text-white">
      <div className="max-w-[800px] mx-auto">
        <h2 className="font-heading text-3xl font-bold text-center mb-10">{t('awards')}</h2>
        <div className="space-y-4">
          {displayAwards.map((award: any, i: number) => (
            <div key={i} className="flex gap-4 items-baseline border-b border-white/10 pb-4">
              <span className="text-primary font-bold text-lg min-w-[60px]">{award.year}</span>
              <div>
                <span className="font-bold">{award.title}</span>
                {award.description && <span className="text-white/60 ml-2">— {award.description}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
