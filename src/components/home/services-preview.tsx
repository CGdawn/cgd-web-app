import { Gamepad2, Box, Code, Glasses, Bot, GraduationCap, Zap } from "lucide-react";

const services = [
  {
    icon: Gamepad2,
    title: "Game Development",
    desc: "Unity & Unreal Engine experts crafting AAA-grade mobile, PC, and educational games.",
    color: "text-primary",
  },
  {
    icon: Box,
    title: "3D Animation",
    desc: "Breathtaking 2D/3D motion graphics and cinematic visualizations for global brands.",
    color: "text-secondary",
  },
  {
    icon: Bot,
    title: "AI & Robotics",
    desc: "Intelligent automation, AI chatbots, and robotics simulations for the next industrial era.",
    color: "text-primary",
  },
  {
    icon: Code,
    title: "Fullstack Web",
    desc: "Scalable cloud-based architectures, high-performance APIs, and interactive frontends.",
    color: "text-secondary",
  },
  {
    icon: Glasses,
    title: "VR/AR Solutions",
    desc: "Immersive metaverse environments and Oculus Quest training systems.",
    color: "text-primary",
  },
  {
    icon: GraduationCap,
    title: "Mentorship",
    desc: "Elite tutoring in programming, design, and game development for aspiring creators.",
    color: "text-secondary",
  },
];

export function ServicesPreview() {
  return (
    <section className="py-24 px-6 relative bg-background">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Core Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-bold font-headline text-white leading-tight">
            Infinite Possibilities, <br />
            <span className="text-muted-foreground">Powered by Innovation.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx}
              className="group glass p-8 rounded-3xl border border-white/5 hover:border-primary/20 transition-all hover:-translate-y-2 duration-500"
            >
              <div className={`p-4 rounded-2xl bg-white/5 w-fit mb-6 transition-colors group-hover:bg-primary/10`}>
                <service.icon className={`w-8 h-8 ${service.color}`} />
              </div>
              <h4 className="text-xl font-bold font-headline text-white mb-4">{service.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.desc}
              </p>
              <div className="mt-8 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Learn More <Zap className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
