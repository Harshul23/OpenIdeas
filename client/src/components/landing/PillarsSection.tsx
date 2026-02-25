import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Maximize2, Play, Layers } from "lucide-react";

const pillars = [
  {
    icon: Camera,
    title: "Idea Capture",
    description: "Catch ideas the moment they appear — text, sketches, voice, memory cues — before they disappear into the void.",
  },
  {
    icon: Maximize2,
    title: "Idea Expansion",
    description: "Convert rough sparks into structured concepts using breakdowns, user stories, diagrams, and first principles reasoning.",
  },
  {
    icon: Play,
    title: "Idea Execution",
    description: "Turn concepts into action through prototypes, UI sketches, workflow drafts, technical outlines, and minimal builds.",
  },
  {
    icon: Layers,
    title: "Idea Ecosystem",
    description: "Develop tools, habits, and workflows that support continuous long-term creativity and sustainable innovation.",
  },
];

export default function PillarsSection() {
  return (
    <section id="pillars" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Core Pillars
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four foundational elements that power the OpenIdeas system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <Card key={pillar.title} className="hover-elevate">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <pillar.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
