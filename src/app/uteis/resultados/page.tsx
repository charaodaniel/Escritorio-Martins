
import { loadContent } from "@/lib/content-loader";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Script from "next/script";

export default function ResultadosPage() {
    const content = loadContent();

    return (
         <>
            <Script async src="https://cse.google.com/cse.js?cx=84751531899169668" />
            <div className="flex min-h-screen flex-col bg-background">
                <Header content={content.contactInfo} />
                 <main className="flex-1 py-12 sm:py-16">
                    <div className="container mx-auto px-4 md:px-6">
                         <div className="gcse-searchresults-only"></div>
                    </div>
                 </main>
                <Footer content={content.contactInfo} />
            </div>
        </>
    )
}

    