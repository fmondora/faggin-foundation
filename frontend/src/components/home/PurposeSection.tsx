import { useTranslations } from 'next-intl';

interface PurposeSectionProps {
  data?: { purposeTitle?: string; purposeText?: string };
}

export default function PurposeSection({ data }: PurposeSectionProps) {
  const t = useTranslations('home');
  const title = data?.purposeTitle || t('purposeTitle');
  const text = data?.purposeText || "La Faggin Foundation nasce per promuovere una nuova comprensione della realtà, fondata sul riconoscimento che la coscienza non è un prodotto della materia, ma il fondamento stesso dell'esistenza.\n\nAttraverso i libri, le conferenze e la ricerca scientifica di Federico Faggin, la fondazione esplora il punto in cui scienza e spiritualità si incontrano, offrendo una visione dell'essere umano che va oltre il paradigma materialista.\n\nLa nostra missione: aiutare le persone a riscoprire la propria natura irriducibile — consapevolezza, libero arbitrio e creatività — in un'epoca dominata dall'intelligenza artificiale.";

  return (
    <section className="py-20 px-4 bg-bg">
      <div className="max-w-[800px] mx-auto text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-dark mb-8">{title}</h1>
        <div className="text-lg text-text-light leading-relaxed whitespace-pre-line">{text}</div>
      </div>
    </section>
  );
}
