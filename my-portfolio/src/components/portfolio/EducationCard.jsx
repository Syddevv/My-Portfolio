import { useState } from "react";
import { GraduationCap, Award, X, ExternalLink, Download } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// --- ASSETS ---
import MiniHackathonCert from "../../assets/Mini Hackathon Cert.png";
import WebDevCert from "../../assets/Web Dev Cert.png";
import OOPCert from "../../assets/OOP Cert.jpg";

const EducationCard = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredEdu, setHoveredEdu] = useState(0); // Default to index 0 (Present)

  const educationList = [
    {
      id: 1,
      degree: "BS Information Systems",
      school: "Bulacan Polytechnic College",
      year: "2023 - Present (3rd Year)",
    },
    {
      id: 2,
      degree: "STEM Strand",
      school: "College of Our Lady of Mercy",
      year: "Graduated 2023",
    },
  ];

  const certifications = [
    {
      name: "BPC Mini Hackathon",
      color: "text-blue-500",
      image: MiniHackathonCert,
    },
    {
      name: "OOP Class Rank 1",
      color: "text-orange-500",
      image: OOPCert,
    },
    {
      name: "Web Development Class Rank 6",
      color: "text-purple-500",
      image: WebDevCert,
    },
  ];

  return (
    <>
      <div className="rounded-2xl glass-card p-6 h-full flex flex-col gap-6">
        {/* --- EDUCATION SECTION --- */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-primary/5 p-2 ring-1 ring-primary/10">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-heading font-bold text-foreground">
              Education
            </h2>
          </div>

          <div
            className="relative space-y-0 ml-3 border-l-2 border-border/50"
            onMouseLeave={() => setHoveredEdu(0)} // Return to "Present" when leaving
          >
            {educationList.map((edu, index) => (
              <div
                key={edu.id}
                onMouseEnter={() => setHoveredEdu(index)}
                className="relative pl-6 py-2 cursor-default transition-colors duration-300"
              >
                {/* Timeline Dot Container */}
                <div className="absolute -left-[5px] top-3.5 h-2.5 w-2.5 rounded-full bg-muted-foreground/20 ring-4 ring-card z-10">
                  {/* The Moving White Dot */}
                  {hoveredEdu === index && (
                    <motion.div
                      layoutId="edu-dot"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div
                  className={`transition-opacity duration-300 ${
                    hoveredEdu === index ? "opacity-100" : "opacity-70"
                  }`}
                >
                  <h3 className="font-bold text-sm text-foreground">
                    {edu.degree}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {edu.school}
                  </p>
                  <span
                    className={`text-[10px] inline-block mt-2 px-2 py-0.5 rounded-full font-medium border transition-colors duration-300
                    ${
                      hoveredEdu === index
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-muted/50 text-muted-foreground border-border"
                    }`}
                  >
                    {edu.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* --- CERTIFICATIONS SECTION --- */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-blue-500/10 p-2 ring-1 ring-blue-500/20">
              <Award className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="text-xl font-heading font-bold text-foreground">
              Achievements
            </h2>
          </div>

          <div className="space-y-3">
            {certifications.map((cert, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(cert.image)}
                className="group w-full flex items-center justify-between p-3 rounded-xl bg-secondary/20 hover:bg-secondary/40 border border-transparent hover:border-border transition-all duration-300 text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Award className={`w-4 h-4 ${cert.color}`} />
                  <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground">
                    {cert.name}
                  </span>
                </div>
                <ExternalLink className="w-3 h-3 text-muted-foreground opacity-30 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8 cursor-zoom-out"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative rounded-lg shadow-2xl"
            >
              <img
                src={selectedImage}
                alt="Certificate Preview"
                className="max-w-[90vw] max-h-[85vh] w-auto h-auto rounded-lg object-contain shadow-2xl ring-1 ring-white/10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EducationCard;
