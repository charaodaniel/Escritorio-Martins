import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gavel, Users, Briefcase, Landmark, Shield, Scale } from "lucide-react";

const practiceAreas = [
  {
    icon: Gavel,
    title: "Corporate Law",
    description: "Expert guidance on business formation, mergers, acquisitions, and corporate governance.",
  },
  {
    icon: Shield,
    title: "Criminal Defense",
    description: "Vigorous defense for individuals facing criminal charges, protecting your rights at every step.",
  },
  {
    icon: Users,
    title: "Family Law",
    description: "Compassionate handling of divorce, child custody, and other sensitive family matters.",
  },
  {
    icon: Landmark,
    title: "Real Estate Law",
    description: "Comprehensive legal services for residential and commercial real estate transactions.",
  },
  {
    icon: Briefcase,
    title: "Intellectual Property",
    description: "Protecting your innovations with patent, trademark, and copyright expertise.",
  },
  {
    icon: Scale,
    title: "Civil Litigation",
    description: "Strategic representation in civil disputes to achieve the best possible outcomes.",
  },
];

export default function PracticeAreas() {
  return (
    <section id="practice-areas" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Our Areas of Expertise
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We offer specialized legal services across a wide range of practice areas to meet your unique needs.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area, index) => (
            <Card key={index} className="flex flex-col text-center items-center p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <CardHeader className="p-0">
                <div className="bg-primary/10 rounded-full p-4 mb-4 inline-flex">
                   <area.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-xl">{area.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-2">
                <p className="text-muted-foreground">{area.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
