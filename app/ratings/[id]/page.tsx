import { RatingDetailClient } from '@/components/RatingDetailClient';

export default async function RatingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <RatingDetailClient id={id} />;
}