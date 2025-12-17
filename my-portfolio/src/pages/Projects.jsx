import React from "react";
import { FaGithub } from "react-icons/fa";
import { Button } from "../components/ui/button";
import { Folder, ArrowLeft, ExternalLink } from "lucide-react";
import { ThemeToggle } from "../components/ui/ThemeToggle";
import { Link } from "react-router-dom";
import { projectsData } from "../data/projectsData";
import { motion } from "framer-motion";
import { useEffect } from "react";

const fadeRight = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

const Projects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header - Navigation Bar */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between mb-8"
        >
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <ThemeToggle />
        </motion.div>

        {/* Title Section */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center gap-4 mb-12"
        >
          <div className="rounded-xl bg-primary/10 p-4 inline-flex">
            <Folder className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              All Projects
            </h1>
            <p className="text-muted-foreground text-lg">
              A collection of my recent work
            </p>
          </div>
        </motion.div>

        {/* Projects Grid (CONTAINER) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projectsData.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="group rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all"
            >
              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Project Info */}
              <div className="p-6 text-center">
                <div className="flex flex-col items-center gap-3 mb-4">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  {/* Buttons */}
                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-60 hover:opacity-100"
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="block p-4 rounded-xl bg-secondary/5 border border-transparent hover:border-border hover:bg-secondary/10 transition-all"
                      >
                        <FaGithub className="w-4 h-4" />
                      </a>
                    </Button>

                    {project.title !== "CraftMySite" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-60 hover:opacity-100"
                      >
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="block p-4 rounded-xl bg-secondary/5 border border-transparent hover:border-border hover:bg-secondary/10 transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                <p className="text-sm font-medium text-primary/80 mb-3">
                  {project.desc}
                </p>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.fulldesc}
                </p>

                <div className="flex gap-2 mt-3 flex-wrap justify-center">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[12px] px-2.5 py-0.5 rounded-full bg-background border border-border text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
