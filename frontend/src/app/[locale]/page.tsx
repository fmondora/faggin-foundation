import PurposeSection from '@/components/home/PurposeSection';
import BooksGrid from '@/components/home/BooksGrid';
import StorySection from '@/components/home/StorySection';
import VideoGridPreview from '@/components/home/VideoGridPreview';
import { getHomePage, getBooks } from '@/lib/strapi';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  let homeData: any = null;
  let books: any = null;
  try { [homeData, books] = await Promise.all([getHomePage(locale), getBooks(locale)]); } catch {}
  return (
    <>
      <PurposeSection data={homeData?.data} />
      <BooksGrid books={books?.data} />
      <StorySection data={homeData?.data} />
      <VideoGridPreview data={homeData?.data} />
    </>
  );
}
