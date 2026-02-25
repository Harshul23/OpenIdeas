import { Quote } from "lucide-react";

export default function PhilosophySection() {
  return (
    <section id="philosophy" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="text-center space-y-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <Quote className="w-8 h-8 text-primary" />
          </div>

          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
            "Ideas deserve execution-level respect."
          </blockquote>

          <div className="h-px w-24 bg-border mx-auto" />

          <div className="grid md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Builder-First Mindset</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every idea is treated as a potential product. The system focuses on speed, 
                clarity, usefulness, and disciplined creativity. No fluff. No motivational talk.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Structured Innovation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Most great ideas die because they are forgotten, underdeveloped, or never executed. 
                OpenIdeas provides a clear system to move any idea through meaningful stages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
