import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Github } from "lucide-react";
import { SiGithub } from "react-icons/si";

export default function CTASection() {
  return (
    <section id="cta" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="relative overflow-visible rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-8 md:p-12 lg:p-16">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl" />
          
          <div className="relative text-center space-y-8 max-w-2xl mx-auto">
            <Badge variant="secondary" className="gap-2">
              <SiGithub className="w-4 h-4" />
              100% Open Source
            </Badge>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Start Building Today
            </h2>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Join thousands of builders who are turning their ideas into reality. 
              Open source, privacy-first, and built for speed.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="gap-2" data-testid="button-cta-get-started">
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2" data-testid="button-cta-github">
                <SiGithub className="w-4 h-4" />
                View on GitHub
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              No credit card required. Start building in minutes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
