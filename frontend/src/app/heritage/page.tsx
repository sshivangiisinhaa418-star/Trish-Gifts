import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OurStory from "@/components/home/OurStory";

export const metadata = {
  title: "Our Story | TRISH Luxury Gifting",
  description: "Explore the art, history, and philosophy of intentional luxury gifting behind TRISH.",
};

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col font-sans">
      <Header />
      
      <main className="flex-1">
        <OurStory />
      </main>

      <Footer />
    </div>
  );
}
