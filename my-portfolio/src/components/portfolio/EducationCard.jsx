import { useState } from "react";
import {
  GraduationCap,
  Award,
  BriefcaseBusiness,
  X,
  ExternalLink,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import CerticodeIcon from "../../assets/CerticodeProfile.png";
import OjtCertificate from "../../assets/Certificate of Completion - Sydney Santos .pdf";

// --- ASSETS ---
import MiniHackathonCert from "../../assets/Mini Hackathon Cert.png";
import WebDevCert from "../../assets/Web Dev Cert.png";
import OOPCert from "../../assets/OOP Cert.jpg";

const EducationCard = () => {
  const [selectedPreview, setSelectedPreview] = useState(null);
  const [hoveredEdu, setHoveredEdu] = useState(0); // Default to index 0 (Present)

  const educationList = [
    {
      id: 1,
      degree: "BS Information Systems",
      school: "Bulacan Polytechnic College",
      year: "2023 - Present (3rd Year)",
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
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">
          Background
        </p>

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

        {/* --- EXPERIENCE SECTION --- */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-amber-500/10 p-2 ring-1 ring-amber-500/20">
              <BriefcaseBusiness className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-xl font-heading font-bold text-foreground">
              Experience
            </h2>
          </div>

          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl"
          >
            <div className="flex items-start gap-3">
              <img
                src={CerticodeIcon}
                alt="Certicode"
                className="h-7 w-7 shrink-0"
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-heading font-semibold leading-none text-foreground">
                    Certicode
                  </h3>
                  <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-300">
                    OJT
                  </span>
                </div>
                <p className="mt-1 text-[13px] leading-snug text-muted-foreground">
                  Full-stack Web Developer
                </p>

                <div className="mt-3 flex w-full items-center justify-start gap-3">
                  <span className="text-[11px] font-medium text-muted-foreground">
                    Feb 2026 &ndash; May 2026
                  </span>

                  <button
                    type="button"
                    title="View Certificate"
                    aria-label="View Certificate"
                    onClick={() =>
                      setSelectedPreview({
                        type: "pdf",
                        src: OjtCertificate,
                        title: "Certificate of Completion",
                      })
                    }
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/30 text-foreground/80 transition-all duration-200 hover:scale-105 hover:bg-white/10 hover:text-foreground"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
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
                onClick={() =>
                  setSelectedPreview({
                    type: "image",
                    src: cert.image,
                    title: cert.name,
                  })
                }
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
        {selectedPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPreview(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm p-3 sm:p-6 md:p-8"
          >
            <button
              onClick={() => setSelectedPreview(null)}
              className="absolute top-3 right-3 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-white/10 bg-neutral-950 shadow-2xl sm:rounded-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                    Certificate Preview
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-white">
                    {selectedPreview.title}
                  </h3>
                </div>
              </div>

              <div className="flex-1 min-h-0 bg-white">
                {selectedPreview.type === "pdf" ? (
                  <iframe
                    src={selectedPreview.src}
                    title={selectedPreview.title}
                    className="h-[70vh] w-full sm:h-[78vh]"
                  />
                ) : (
                  <img
                    src={selectedPreview.src}
                    alt={selectedPreview.title}
                    className="max-h-[70vh] w-full object-contain sm:max-h-[78vh]"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EducationCard;
