import { Folder, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "SpenSyd",
    desc: "Personal Finance Tracker with AI integration",
    tags: ["MERN Stack", "Gemini API", "Tailwind"],
    link: "https://spensyd.vercel.app", // FIXED: Added https://
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Let'em Cook",
    desc: "Community Recipe Sharing Platform",
    tags: ["MERN Stack"],
    link: "https://letem-cook.vercel.app", // FIXED: Added https://
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "CraftMySite",
    desc: "Website Builder",
    tags: ["PHP", "MySQL", "Gemini Api"],
    link: "https://github.com/Syddevv/CraftMySite",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

const ProjectsCard = () => {
  return (
    <div className="rounded-2xl bg-card shadow-bento p-6 border border-border gradient-card h-full">
      <div className="flex items-center gap-2 mb-6">
        <div className="rounded-lg bg-primary/10 p-2">
          <Folder className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Recent Projects</h2>
      </div>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            className="group block p-4 rounded-xl bg-secondary/5  border border-transparent hover:border-border hover:bg-secondary/10 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div
                  className={`mt-1 p-2 rounded-md ${project.bg} ${project.color}`}
                >
                  <Folder size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {project.desc}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-background border border-border text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProjectsCard;
