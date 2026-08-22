import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import AboutUs from "@/components/AboutUs";
import Sponsors from "@/components/Sponsors";
import HowItWorks from "@/components/HowItWorks";
import ElitePerks from "@/components/ElitePerks";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Hero />
      <Marquee />
      <AboutUs />
      <Sponsors />
      <HowItWorks />
      <ElitePerks />
      <Testimonials />
      <Faq />
      <Cta />
      <Footer />
    </main>
  );
}
