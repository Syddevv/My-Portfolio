import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import {
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { Code2 } from "lucide-react";

const technologies = [
  {
    icon: FaReact,
    name: "React",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-200/20",
  },
  {
    icon: IoLogoJavascript,
    name: "JavaScript",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10 border-yellow-200/20",
  },
  {
    icon: FaNodeJs,
    name: "Node.js",
    color: "text-green-500",
    bg: "bg-green-500/10 border-green-200/20",
  },
  {
    icon: SiExpress,
    name: "Express",
    color: "text-gray-500",
    bg: "bg-gray-500/10 border-gray-200/20 dark:text-gray-300",
  },
  {
    icon: SiMongodb,
    name: "MongoDB",
    color: "text-green-600",
    bg: "bg-green-600/10 border-green-200/20",
  },
  {
    icon: SiTailwindcss,
    name: "Tailwind",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10 border-cyan-200/20",
  },
  {
    icon: FaGitAlt,
    name: "Git",
    color: "text-orange-500",
    bg: "bg-orange-500/10 border-orange-200/20",
  },
  {
    icon: FaGithub,
    name: "GitHub",
    color: "text-foreground",
    bg: "bg-gray-500/10 border-gray-200/20",
  },
  {
    icon: FaHtml5,
    name: "HTML5",
    color: "text-orange-600",
    bg: "bg-orange-600/10 border-orange-200/20",
  },
  {
    icon: FaCss3,
    name: "CSS3",
    color: "text-blue-500",
    bg: "bg-blue-500/10 border-blue-200/20",
  },
];

const TechStack = () => {
  return (
    <div className="rounded-2xl glass-card p-6 h-full flex flex-col justify-center">
      <div className="flex items-center gap-3 mb-5">
        <div className="rounded-lg bg-primary/5 p-2 ring-1 ring-primary/10">
          <Code2 className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-heading font-bold text-foreground">
          Tech Stack
        </h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {technologies.map((tech, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300 hover:scale-105 cursor-default ${tech.bg}`}
          >
            <tech.icon className={`w-5 h-5 ${tech.color}`} />
            <span className="text-sm font-medium text-foreground/80">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
