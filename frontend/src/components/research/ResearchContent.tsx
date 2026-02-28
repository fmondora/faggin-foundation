import { useTranslations } from 'next-intl';

const FALLBACK_AREAS = [
  "Panpsichismo dell'Informazione Quantistica (QIP)",
  'Rapporto tra informazione quantistica e qualia',
  'Libero arbitrio e indeterminazione quantistica',
  "Limiti fondamentali dell'intelligenza artificiale",
];
const FALLBACK_COLLABORATIONS = [
  { title: 'Cattedra Faggin Family Presidential in Physics of Information, UC Santa Cruz', description: 'Dotazione di $1M, 2015' },
  { title: "Collaborazione con Prof. Giacomo Mauro D'Ariano", description: 'Paper: "Hard Problem and Free Will: an information-theoretical approach"' },
];

export default function ResearchContent({ data }: { data?: any }) {
  const t = useTranslations('research');
  const title = data?.pageTitle || t('ourResearch');
  const intro = data?.introText || "La Federico and Elvia Faggin Foundation promuove la ricerca teorica e sperimentale sulla natura e l'origine della coscienza presso università e istituti di ricerca.\n\nL'obiettivo è la creazione di una nuova teoria matematica della coscienza in grado di produrre previsioni verificabili sperimentalmente.";
  const areas = data?.areas || FALLBACK_AREAS;
  const collaborations = data?.collaborations || FALLBACK_COLLABORATIONS;

  return (
    <section className="py-16 px-4 bg-bg">
      <div className="max-w-[800px] mx-auto">
        <h1 className="font-heading text-4xl font-bold text-dark mb-6 text-center">{title}</h1>
        <div className="mb-12">
          <h2 className="font-heading text-2xl font-bold text-dark mb-4">{t('ourResearch')}</h2>
          <div className="text-text-light leading-relaxed whitespace-pre-line mb-6">{intro}</div>
          <h3 className="font-bold text-dark mb-3">{data?.areasTitle || t('researchAreas')}</h3>
          <ul className="list-disc list-inside space-y-2 text-text-light mb-8">
            {(Array.isArray(areas) ? areas : []).map((area: any, i: number) => <li key={i}>{typeof area === 'string' ? area : area.name || area.title}</li>)}
          </ul>
          <h3 className="font-bold text-dark mb-3">{data?.collaborationsTitle || t('collaborations')}</h3>
          <div className="space-y-4">
            {(Array.isArray(collaborations) ? collaborations : []).map((collab: any, i: number) => (
              <div key={i} className="bg-bg-alt p-4 rounded">
                <h4 className="font-bold text-dark">{collab.title}</h4>
                <p className="text-text-light text-sm">{collab.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
