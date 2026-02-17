import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQSection from "@/components/landing/FAQSection";

const FAQ = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
