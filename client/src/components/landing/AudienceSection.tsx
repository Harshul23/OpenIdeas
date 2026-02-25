import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Hammer, Rocket } from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    title: "Students",
    description: "Transform class projects into portfolio-worthy products. Build skills while building real things.",
  },
  {
    icon: Hammer,
    title: "Makers",
    description: "Stop losing ideas in scattered notes. Capture, organize, and execute with a system built for creators.",
  },
  {
    icon: Rocket,
    title: "Founders",
    description: "Move fast from concept to MVP. Validate ideas quickly and iterate based on real feedback.",
  },
];

export default function AudienceSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Built For Builders
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're learning, creating, or launching — OpenIdeas adapts to your journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {audiences.map((audience) => (
            <Card key={audience.title} className="hover-elevate">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                  <audience.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{audience.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {audience.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
