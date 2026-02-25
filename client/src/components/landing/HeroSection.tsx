import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, BrainCircuit, Rocket, Zap, Target, Code, RefreshCw, Lightbulb } from "lucide-react";

export default function HeroSection() {
  const floatingIcons = [
    { icon: Lightbulb, top: "10%", left: "5%", size: "w-8 h-8", delay: 0.2 },
    { icon: Code, top: "20%", left: "80%", size: "w-12 h-12", delay: 0.4 },
    { icon: BrainCircuit, top: "60%", left: "15%", size: "w-10 h-10", delay: 0.6 },
    { icon: Rocket, top: "70%", left: "70%", size: "w-8 h-8", delay: 0.8 },
    { icon: Sparkles, top: "40%", left: "90%", size: "w-6 h-6", delay: 1.0 },
    { icon: Zap, top: "85%", left: "30%", size: "w-10 h-10", delay: 1.2 },
  ];
  return (
    <section className="min-h-[85vh] flex items-center pt-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            initial={{ y: 20 }}
            animate={{ y: [20, 0, -20] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: item.delay }}
            className={`absolute ${item.size} text-primary/50`}
            style={{ top: item.top, left: item.left }}
          >
            <item.icon />
          </motion.div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-24 z-10">
        <div className="grid lg:grid-cols-1 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Builder Ecosystem</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
              Turn thoughts into products
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed text-center mx-auto">
              OpenIdeas removes friction from the creative process so ideas can move from{" "}
              <span className="font-mono text-foreground">spark</span> to{" "}
              <span className="font-mono text-foreground">structure</span> to{" "}
              <span className="font-mono text-foreground">execution</span> quickly and cleanly.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-wrap items-center gap-4 justify-center">
              <Button size="lg" className="gap-2" data-testid="button-hero-get-started">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" data-testid="button-hero-learn-more">
                Learn More
              </Button>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="text-sm text-muted-foreground text-center">
              <span className="font-mono text-foreground">10,000+</span> ideas captured by builders worldwide
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
