import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OurServices from "@/components/home/OurServices";
import FAQ from "@/components/home/FAQ";
import ConciergeInquiryForm from "./ConciergeInquiryForm";

export const metadata = {
  title: "Our Services | TRISH Luxury Gifting",
  description: "Explore the bespoke gifting services and levels of curation offered by TRISH.",
};

export default function ConciergePage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col font-sans">
      <Header />
      
      <main className="flex-1">
        <OurServices />
        <ConciergeInquiryForm />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
