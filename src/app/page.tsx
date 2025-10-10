
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import PracticeAreas from "@/components/sections/practice-areas";
import WhyUs from "@/components/sections/why-us";
import Testimonials from "@/components/sections/testimonials";
import Contact from "@/components/sections/contact";
import Attorneys from "@/components/sections/attorneys";
import OurHistory from "@/components/sections/our-history";
import { loadContent } from "@/lib/content-loader";

export default function Home() {
  const content = loadContent();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero content={content.hero} />
        {content.practiceAreas.enabled && <PracticeAreas content={content.practiceAreas} />}
        {content.whyUs.enabled && <WhyUs content={content.whyUs} />}
        {content.ourHistory.enabled && <OurHistory content={content.ourHistory} />}
        {content.attorneys.enabled && <Attorneys content={content.attorneys} />}
        {content.testimonials.enabled && <Testimonials content={content.testimonials} />}
        {content.contact.enabled && <Contact />}
      </main>
      <Footer />
    </div>
  );
}
