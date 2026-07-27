import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DiscoverClient from "./DiscoverClient";
import { getAllProducts } from "@/app/actions/store";

interface DiscoverPageProps {
  searchParams: { intent?: string; category?: string; recipient?: string };
}

export default async function DiscoverPage({ searchParams }: DiscoverPageProps) {
  const intentQuery = searchParams.intent?.toUpperCase() || "";
  
  // Fetch real products from the database
  const products = await getAllProducts();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 pt-8 pb-20">
        <DiscoverClient initialIntent={intentQuery} initialProducts={products} />
      </main>
      <Footer />
    </div>
  );
}
