import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getStrapiMediaUrl } from '@/lib/strapi-url';
import type { Book } from '@/types/strapi';

const FALLBACK_BOOKS: Book[] = [
  { documentId: 'fb-1', title: 'Silicio', image: '/images/silicio.jpg', videoUrl: 'https://www.youtube.com/watch?v=Gf7-u6k498Y' },
  { documentId: 'fb-2', title: 'Irriducibile', image: '/images/irriducibile.jpg', videoUrl: 'https://www.youtube.com/watch?v=C5fgYfNQJp0' },
  { documentId: 'fb-3', title: "Oltre l'Invisibile", image: '/images/oltre.jpg', videoUrl: 'https://www.youtube.com/watch?v=IpB8tc50UU4' },
];

export default function BooksGrid({ books }: { books?: Book[] }) {
  const t = useTranslations('home');
  const displayBooks = books?.length ? books : FALLBACK_BOOKS;

  return (
    <section className="py-16 px-4 bg-dark text-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayBooks.map((book, i) => {
            const imageUrl = book.cover?.url ? getStrapiMediaUrl(book.cover.url) : book.image || FALLBACK_BOOKS[i]?.image;
            const videoUrl = book.videoUrl || FALLBACK_BOOKS[i]?.videoUrl;
            return (
              <div key={book.title || i} className="text-center">
                <div className="relative w-48 mx-auto mb-4 aspect-[3/4]">
                  <Image src={imageUrl!} alt={book.title} fill className="object-cover rounded shadow-lg" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-2">{book.title}</h3>
                {book.tagline && <p className="text-white/70 text-sm mb-3">{book.tagline}</p>}
                {videoUrl && (
                  <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-primary hover:bg-accent text-white text-sm font-bold px-6 py-2 rounded transition-colors">
                    {book.buttonLabel || t('watchPresentation')}
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
