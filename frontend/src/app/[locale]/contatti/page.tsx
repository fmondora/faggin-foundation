import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/contact/ContactForm';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <section className="py-16 px-4">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold text-white mb-6">{t('title')}</h1>
          <p className="text-white/70">{t('subtitle')}</p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
