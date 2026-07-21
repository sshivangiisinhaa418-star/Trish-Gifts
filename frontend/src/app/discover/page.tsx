import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DiscoverClient from "./DiscoverClient";

interface DiscoverPageProps {
  searchParams: { intent?: string; category?: string; recipient?: string };
}

export default function DiscoverPage({ searchParams }: DiscoverPageProps) {
  const intentQuery = searchParams.intent?.toUpperCase() || "";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 pt-8 pb-20">
        <DiscoverClient initialIntent={intentQuery} />
      </main>
      <Footer />
    </div>
  );
}
