import { motion } from "framer-motion";
import ProfileCard from "../components/portfolio/ProfileCard";
import StatsCard from "../components/portfolio/StatsCard";
import AboutMe from "../components/portfolio/AboutMe";
import TechStack from "../components/portfolio/TechStack";
import ProjectsCard from "../components/portfolio/ProjectsCard";
import EducationCard from "../components/portfolio/EducationCard";
import ChatBot from "../components/portfolio/ChatBot";
import { ThemeToggle } from "../components/ui/ThemeToggle";

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

const Index = () => {
  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-x-hidden">
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <motion.div
        className="container max-w-7xl mx-auto pb-20 "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-auto">
          {/* PROFILE */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-2 h-full"
          >
            <ProfileCard />
          </motion.div>

          {/* STATS */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-1 lg:col-span-1"
          >
            <StatsCard />
          </motion.div>

          {/* ABOUT */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-1 lg:col-span-2"
          >
            <AboutMe />
          </motion.div>

          {/* PROJECTS */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 lg:col-span-2"
          >
            <ProjectsCard />
          </motion.div>

          {/* EDUCATION */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 lg:col-span-1 lg:row-span-2"
          >
            <EducationCard />
          </motion.div>

          {/* TECH STACK */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-1 lg:col-span-3"
          >
            <TechStack />
          </motion.div>
        </div>

        <ChatBot />
      </motion.div>

      <footer className="text-center text-sm text-muted-foreground pb-8">
        <p>© 2025 Sydney Santos. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
};

export default Index;
