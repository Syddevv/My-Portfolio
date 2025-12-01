import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3,
  FaGit,
  FaGithub,
} from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5"; // Importing from Io5
import { SiExpress } from "react-icons/si"; // Importing from Si
import { RiTailwindCssFill } from "react-icons/ri"; // Importing from Ri
import { Code2 } from "lucide-react";

// 1. Changed to an Array so you can .map() over it
const technologies = [
  { icon: FaReact, name: "React" },
  { icon: IoLogoJavascript, name: "JavaScript" },
  { icon: FaNodeJs, name: "Node.js" },
  { icon: SiExpress, name: "Express" },
  { icon: FaHtml5, name: "HTML5" },
  { icon: FaCss3, name: "CSS3" },
  { icon: RiTailwindCssFill, name: "Tailwind" },
  { icon: FaGit, name: "Git" },
  { icon: FaGithub, name: "GitHub" },
];

const TechStack = () => {
  return (
    <div className="rounded-2xl bg-card shadow-bento p-6 border border-border gradient-card">
      <div className="flex items-center gap-2 mb-5">
        <div className="rounded-lg bg-primary/10 p-2">
          <Code2 className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Tech Stack</h2>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {technologies.map((tech, index) => (
          /* 2. Added key prop and styling container */
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 text-sm hover:bg-secondary transition-colors cursor-default text-white"
          >
            <tech.icon className="w-4 h-4" />
            <span>{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
