import { Sparkle } from "lucide-react";

const AboutMe = () => {
  return (
    <div className="rounded-2xl bg-card shadow-bento p-6 border border-border gradient-card h-full flex flex-col">
      <div className="flex items-center gap-2 mb-5">
        <div className="rounded-lg bg-primary/10 p-2">
          <Sparkle className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground">About Me</h2>
      </div>

      <p className="text-muted-foreground leading-relaxed mb-5 text-[15px]">
        Passionate 3rd-year BSIS student specializing in building scalable web
        applications. Focused on React expertise and modern web development.
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        <div className="flex items-center bg-secondary text-white pr-5 pl-5 rounded-xl p-2">
          Web Development
        </div>
        <div className="flex items-center bg-primary text-white rounded-xl pr-5 pl-5 p-2">
          React Expertise
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
