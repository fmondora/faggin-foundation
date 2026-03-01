import { useLocale, useTranslations } from 'next-intl';
import { formatEventDate } from '@/lib/date';
import type { Event } from '@/types/strapi';

const FALLBACK_EVENTS: Event[] = [
  { title: 'Presentazione documentario RAI "L\'uomo che vide il futuro"', date: '2025-03-01', location: 'Camera dei Deputati, Roma', type: 'past' },
  { title: 'The Science of Consciousness Conference', date: '2024-06-01', location: 'Barcellona', type: 'past' },
  { title: 'Presentazione "Oltre l\'Invisibile"', date: '2024-01-01', location: 'Da confermare', type: 'past' },
  { title: 'Wired Next Fest', date: '2019-05-01', location: 'Milano', type: 'past' },
];

export default function EventList({ events }: { events?: Event[] }) {
  const t = useTranslations('events');
  const locale = useLocale();
  const allEvents = events?.length ? events : FALLBACK_EVENTS;
  const upcoming = allEvents.filter((e) => e.type === 'upcoming');
  const past = allEvents.filter((e) => e.type === 'past');

  return (
    <div className="max-w-[800px] mx-auto px-4 py-12">
      {upcoming.length > 0 ? (
        <div className="mb-12">
          <h2 className="font-heading text-2xl font-bold text-dark mb-6">{t('upcoming')}</h2>
          <div className="space-y-4">
            {upcoming.map((event, i) => (
              <div key={i} className="bg-primary/5 border-l-4 border-primary p-4 rounded-r">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-dark">{event.title}</h3>
                    {event.location && <p className="text-text-light text-sm">{event.location}</p>}
                  </div>
                  <span className="text-primary font-bold text-sm">{formatEventDate(event.date, locale)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-12 text-center py-8 bg-bg-alt rounded">
          <p className="text-text-light">{t('noUpcoming')}</p>
        </div>
      )}
      <h2 className="font-heading text-2xl font-bold text-dark mb-6">{t('past')}</h2>
      <div className="space-y-4">
        {past.map((event, i) => (
          <div key={i} className="border-b border-border pb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-dark">{event.title}</h3>
                {event.location && <p className="text-text-light text-sm">{event.location}</p>}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-text-light text-sm">{formatEventDate(event.date, locale)}</span>
                {event.link && <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent text-sm font-bold">{t('watch')}</a>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
