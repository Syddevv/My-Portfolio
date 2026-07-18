import { useEffect, useState } from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";
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

const mobileItemVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const useMobileLayout = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(max-width: 767px)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = (event) => setIsMobile(event.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
};

const Index = () => {
  const isMobile = useMobileLayout();
  const shouldReduceMotion = useReducedMotion();
  const revealOnScroll = isMobile && !shouldReduceMotion;
  const itemMotionProps = revealOnScroll
    ? {
        variants: mobileItemVariants,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.12, margin: "0px 0px -40px 0px" },
      }
    : { variants: itemVariants };

  return (
    <div className="min-h-screen p-4 md:p-8 relative overflow-x-hidden">
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <Motion.div
        className="container max-w-7xl mx-auto pb-20 "
        variants={containerVariants}
        initial={isMobile || shouldReduceMotion ? undefined : "hidden"}
        animate={isMobile || shouldReduceMotion ? undefined : "visible"}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-auto">
          {/* PROFILE */}
          <Motion.div
            {...itemMotionProps}
            className="md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-2 h-full"
          >
            <ProfileCard />
          </Motion.div>

          {/* STATS */}
          <Motion.div
            {...itemMotionProps}
            className="md:col-span-1 lg:col-span-1"
          >
            <StatsCard />
          </Motion.div>

          {/* ABOUT */}
          <Motion.div
            {...itemMotionProps}
            className="md:col-span-1 lg:col-span-2"
          >
            <AboutMe />
          </Motion.div>

          {/* PROJECTS */}
          <Motion.div
            {...itemMotionProps}
            className="md:col-span-2 lg:col-span-2"
          >
            <ProjectsCard />
          </Motion.div>

          {/* EDUCATION */}
          <Motion.div
            {...itemMotionProps}
            className="md:col-span-2 lg:col-span-1 lg:row-span-2"
          >
            <EducationCard />
          </Motion.div>

          {/* TECH STACK */}
          <Motion.div
            {...itemMotionProps}
            className="md:col-span-1 lg:col-span-3"
          >
            <TechStack />
          </Motion.div>
        </div>

        <ChatBot />
      </Motion.div>

      <footer className="text-center text-sm text-muted-foreground pb-8">
        <p>© 2025 Sydney Santos. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
};

export default Index;
