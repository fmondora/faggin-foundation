import { getTranslations } from 'next-intl/server';
import EventList from '@/components/events/EventList';
import { getEventsPage, getEvents } from '@/lib/strapi';

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  const tEvents = await getTranslations({ locale, namespace: 'events' });
  let eventsPageData: any = null, events: any = null;
  try { [eventsPageData, events] = await Promise.all([getEventsPage(locale), getEvents(locale)]); } catch {}

  return (
    <>
      <section className="py-16 px-4 bg-bg">
        <div className="max-w-[800px] mx-auto text-center">
          <h1 className="font-heading text-4xl font-bold text-dark mb-6">{eventsPageData?.data?.pageTitle || t('events')}</h1>
          <p className="text-lg text-text-light">{tEvents('subtitle')}</p>
        </div>
      </section>
      <EventList events={events?.data} />
    </>
  );
}
