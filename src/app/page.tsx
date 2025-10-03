import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import PracticeAreas from "@/components/sections/practice-areas";
import WhyUs from "@/components/sections/why-us";
import Testimonials from "@/components/sections/testimonials";
import Contact from "@/components/sections/contact";
import Attorneys from "@/components/sections/attorneys";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <PracticeAreas />
        <WhyUs />
        <Attorneys />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
