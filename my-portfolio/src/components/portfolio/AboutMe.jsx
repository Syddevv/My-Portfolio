import { Sparkle } from "lucide-react";

const AboutMe = () => {
  return (
    <div className="rounded-2xl glass-card p-6 h-full flex flex-col relative overflow-hidden">
      <div className="flex items-center gap-3 mb-4">
        <div className="rounded-lg bg-primary/5 p-2 ring-1 ring-primary/10">
          <Sparkle className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-heading font-bold text-foreground">
          About Me
        </h2>
      </div>

      <p className="text-muted-foreground leading-relaxed text-[15px] flex-grow">
        Passionate 3rd-year BSIS student specializing in building scalable web
        applications. Focused on React expertise and modern web development.
      </p>

      <div className="flex flex-wrap gap-2 mt-4">
        <span className="inline-flex items-center px-5 py-3 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-600 border border-cyan-200/20">
          Web Development
        </span>
        <span className="inline-flex items-center px-5 py-3 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600 border border-blue-200/20">
          React Expertise
        </span>
      </div>
    </div>
  );
};

export default AboutMe;
