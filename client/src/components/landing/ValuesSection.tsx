import { Card, CardContent } from "@/components/ui/card";
import { 
  Zap, 
  GitBranch, 
  Shield, 
  Timer, 
  MessageSquare, 
  Compass 
} from "lucide-react";

const values = [
  {
    icon: Zap,
    title: "Practical Innovation",
    description: "Focus on what works, not what sounds impressive",
  },
  {
    icon: Timer,
    title: "Fast Execution",
    description: "Quick loops from idea to prototype to iteration",
  },
  {
    icon: GitBranch,
    title: "Open-Source Culture",
    description: "Built in the open, shared with the community",
  },
  {
    icon: Shield,
    title: "Privacy-First",
    description: "Your ideas stay yours, always encrypted and secure",
  },
  {
    icon: MessageSquare,
    title: "Direct Communication",
    description: "No fluff, no jargon — just clear, honest talk",
  },
  {
    icon: Compass,
    title: "Grounded Thinking",
    description: "Creative but practical, visionary yet realistic",
  },
];

export default function ValuesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            What We Stand For
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            OpenIdeas is not a motivational brand. It's a builder movement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value) => (
            <Card key={value.title} className="hover-elevate">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <value.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
