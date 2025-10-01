import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import PracticeAreas from "@/components/sections/practice-areas";
import CaseResults from "@/components/sections/case-results";
import Testimonials from "@/components/sections/testimonials";
import Attorneys from "@/components/sections/attorneys";
import BlogFeed from "@/components/sections/blog-feed";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <PracticeAreas />
        <CaseResults />
        <Testimonials />
        <Attorneys />
        <BlogFeed />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
