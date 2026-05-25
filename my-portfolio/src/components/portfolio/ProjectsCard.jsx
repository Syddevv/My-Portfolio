import { Folder, ExternalLink, Lock } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { projectsData } from "../../data/projectsData";

const ProjectsCard = () => {
  return (
    <div className="rounded-2xl bg-card shadow-bento p-6 border border-border gradient-card h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-primary/10 p-2">
            <Folder className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Recent Projects</h2>
        </div>
        <Link to="/projects">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground hover:text-primary cursor-pointer"
          >
            View All
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {projectsData.slice(0, 3).map((project, index) => {
          const cardContent = (
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 flex-1 items-start gap-3">
                <div
                  className={`mt-1 shrink-0 rounded-md p-2 ${project.bg} ${project.color}`}
                >
                  <Folder size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="truncate text-sm text-muted-foreground">
                    {project.desc}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
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
              {project.link ? (
                <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
              ) : (
                <Lock className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
              )}
            </div>
          );

          return project.link ? (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="group block p-4 rounded-xl bg-secondary/5 border border-transparent hover:border-border hover:bg-secondary/10 transition-all"
            >
              {cardContent}
            </a>
          ) : (
            <div
              key={index}
              className="group block p-4 rounded-xl bg-secondary/5 border border-transparent hover:border-border hover:bg-secondary/10 transition-all"
            >
              {cardContent}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsCard;
