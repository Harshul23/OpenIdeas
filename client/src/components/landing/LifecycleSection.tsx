import { Card, CardContent } from "@/components/ui/card";
import { 
  Lightbulb, 
  Expand, 
  CheckCircle, 
  Layers, 
  Wrench, 
  RefreshCw,
  ArrowRight
} from "lucide-react";

const stages = [
  {
    icon: Lightbulb,
    name: "Capture",
    description: "Collect ideas instantly before they disappear",
  },
  {
    icon: Expand,
    name: "Expand",
    description: "Break down and explore the concept deeply",
  },
  {
    icon: CheckCircle,
    name: "Validate",
    description: "Test if the idea makes sense in reality",
  },
  {
    icon: Layers,
    name: "Prototype",
    description: "Form a structure or early design",
  },
  {
    icon: Wrench,
    name: "Build",
    description: "Create a working version of the idea",
  },
  {
    icon: RefreshCw,
    name: "Iterate",
    description: "Refine and improve continuously",
  },
];

export default function LifecycleSection() {
  return (
    <section id="lifecycle" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            The Idea Lifecycle
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every idea flows through the same clean pipeline, ensuring evolution instead of being forgotten.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stages.map((stage, index) => (
            <div key={stage.name} className="relative">
              <Card className="h-full hover-elevate">
                <CardContent className="p-5 text-center space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                    <stage.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{stage.name}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
              {index < stages.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-4 h-4 text-muted-foreground/50" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="font-mono text-sm text-muted-foreground">
            Capture <ArrowRight className="w-3 h-3 inline mx-1" /> 
            Expand <ArrowRight className="w-3 h-3 inline mx-1" /> 
            Validate <ArrowRight className="w-3 h-3 inline mx-1" /> 
            Prototype <ArrowRight className="w-3 h-3 inline mx-1" /> 
            Build <ArrowRight className="w-3 h-3 inline mx-1" /> 
            Iterate
          </p>
        </div>
      </div>
    </section>
  );
}
