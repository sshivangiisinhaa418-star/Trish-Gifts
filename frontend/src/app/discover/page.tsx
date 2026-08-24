import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DiscoverClient from "./DiscoverClient";
import { getAllProducts } from "@/app/actions/store";

interface DiscoverPageProps {
  searchParams: Promise<{ intent?: string; category?: string; recipient?: string; q?: string }>;
}

export const dynamic = 'force-dynamic';

export default async function DiscoverPage({ searchParams }: DiscoverPageProps) {
  const resolvedSearchParams = await searchParams;
  const intentQuery = resolvedSearchParams.intent?.toUpperCase() || "";
  const searchQuery = resolvedSearchParams.q || "";
  
  // Fetch real products from the database
  const products = await getAllProducts();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 pt-8 pb-20">
        <DiscoverClient initialIntent={intentQuery} searchQuery={searchQuery} initialProducts={products} />
      </main>
      <Footer />
    </div>
  );
}
