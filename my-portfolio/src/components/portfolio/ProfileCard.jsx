import { useState } from "react";
import ProfilePic from "../../assets/syd.jpg";
import {
  MapPin,
  Mail,
  FileText,
  X,
  Download,
  Send,
  Copy,
  Check,
  Loader2,
} from "lucide-react";
import { FaGithub, FaFacebook, FaLinkedin, FaTiktok } from "react-icons/fa";
import { Button } from "../ui/button";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast"; // IMPORT TOAST

// IMPORT YOUR RESUME HERE
import ResumePDF from "../../assets/resume.pdf";

const ProfileCard = () => {
  const [showResume, setShowResume] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [copied, setCopied] = useState(false);

  const [isSending, setIsSending] = useState(false);
  // Removed emailStatus state since we use toast now

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("sydnesantos176@gmail.com");
    setCopied(true);
    toast.success("Email copied to clipboard!"); // Added Toast here too
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    const serviceID = "service_yt3loay";
    const publicKey = "6HshNo8dXGMGorhX0";
    const notificationTemplateID = "template_wubmldb";
    const autoReplyTemplateID = "template_mm5oi89";

    const templateParams = {
      name: formData.name,
      title: formData.subject,
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: "sydnesantos176@gmail.com",
    };

    emailjs
      .send(serviceID, notificationTemplateID, templateParams, publicKey)
      .then(() => {
        return emailjs.send(
          serviceID,
          autoReplyTemplateID,
          templateParams,
          publicKey
        );
      })
      .then(() => {
        // SUCCESS: Show Toast & Close Modal Immediately
        toast.success("Email sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setShowContact(false);
      })
      .catch((err) => {
        console.log("FAILED...", err);
        // ERROR: Show Error Toast
        toast.error("Failed to send. Please try again.");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const socials = [
    {
      icon: FaFacebook,
      link: "https://www.facebook.com/sydney.santos.7773",
      color:
        "hover:text-blue-600 hover:bg-blue-600/10 hover:border-blue-600/20",
    },
    {
      icon: FaLinkedin,
      link: "https://www.linkedin.com/in/sydney-santos-471a0b301/",
      color:
        "hover:text-blue-700 hover:bg-blue-700/10 hover:border-blue-700/20",
    },
    {
      icon: FaTiktok,
      link: "https://www.tiktok.com/@sydd_dev",
      color:
        "hover:text-pink-500 hover:bg-pink-500/10 hover:border-pink-500/20",
    },
  ];

  return (
    <>
      <div className="group h-full p-6 md:p-8 rounded-2xl glass-card flex flex-col items-center justify-center text-center relative overflow-hidden mx-auto w-full">
        {/* ... (Keep existing Profile Card structure unchanaged) ... */}

        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent"></div>

        <div className="flex flex-col items-center w-full max-w-sm z-10">
          {/* Profile Image */}
          <div className="relative mb-6">
            <div className="w-36 h-36 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl ring-1 ring-black/5">
              <img
                src={ProfilePic}
                alt="Sydney Santos"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-card py-1.5 px-3 rounded-full flex items-center gap-2 shadow-lg border border-border/60 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-bold tracking-wider uppercase text-foreground/80">
                Available
              </span>
            </div>
          </div>

          <div className="space-y-3 w-full">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground tracking-tight">
              Sydney Santos
            </h1>
            <div className="inline-flex items-center px-3 py-1 rounded-lg bg-primary/5 text-primary text-sm font-medium border border-primary/10">
              Full Stack Web Developer
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
              <MapPin className="w-3.5 h-3.5" />
              <span>Bulacan, Philippines</span>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 gap-3 pt-8">
            <Button
              className="w-full rounded-xl h-12 text-base shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all hover:-translate-y-0.5 cursor-pointer"
              onClick={() => setShowContact(true)}
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="rounded-xl h-11 border-border/60 hover:bg-secondary/50 hover:border-border transition-all cursor-pointer"
                onClick={() => setShowResume(true)}
              >
                <FileText className="w-4 h-4 mr-2 text-foreground" />
                Resume
              </Button>
              <Button
                variant="outline"
                className="rounded-xl h-11 border-border/60 hover:bg-secondary/50 hover:border-border transition-all cursor-pointer"
              >
                <FaGithub className="w-4 h-4 mr-2 text-foreground" />
                <a
                  href="https://github.com/Syddevv"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </Button>
            </div>
          </div>

          <div className="mt-8 w-full">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4 opacity-70">
              Socials
            </p>
            <div className="flex justify-center gap-3">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl border border-transparent bg-secondary/30 text-muted-foreground transition-all duration-300 hover:scale-110 ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- RESUME MODAL --- */}
      {showResume && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl h-full max-h-[85vh] bg-card rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-white/10 ring-1 ring-black/20">
            <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/10 backdrop-blur">
              <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Resume Preview
              </h3>
              <div className="flex gap-2">
                <a href={ResumePDF} download="Sydney_Santos_Resume.pdf">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 gap-2 bg-background/50 hover:bg-background cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                </a>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowResume(false)}
                  className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="flex-1 bg-gray-100 dark:bg-gray-900 w-full h-full relative">
              <iframe
                src={ResumePDF}
                className="w-full h-full border-none"
                title="Resume PDF"
              />
            </div>
          </div>
        </div>
      )}

      {/* --- CONTACT MODAL --- */}
      {showContact && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl p-6 border border-white/10 ring-1 ring-black/20 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-heading font-bold flex items-center gap-2">
                <Send className="w-5 h-5 text-primary" />
                Get in Touch
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowContact(false)}
                className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/20 mb-6 border border-border/50">
              <span className="text-sm font-medium text-muted-foreground truncate">
                sydnesantos176@gmail.com
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCopyEmail}
                className="h-8 w-8 p-0 hover:bg-background hover:text-primary rounded-lg"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>

            <form onSubmit={handleSendEmail} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Your Name
                </label>
                <input
                  required
                  type="text"
                  name="user_name"
                  className="w-full px-3 py-2 rounded-xl bg-secondary/10 border border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Your Email
                </label>
                <input
                  required
                  type="email"
                  name="user_email"
                  className="w-full px-3 py-2 rounded-xl bg-secondary/10 border border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Subject
                </label>
                <input
                  required
                  type="text"
                  name="subject"
                  className="w-full px-3 py-2 rounded-xl bg-secondary/10 border border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
                  placeholder="Project Inquiry"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  required
                  name="message"
                  rows="4"
                  className="w-full px-3 py-2 rounded-xl bg-secondary/10 border border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all resize-none"
                  placeholder="Let's build something awesome..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              {/* Removed old status messages, as we are using toast now */}

              <Button
                type="submit"
                disabled={isSending}
                className="w-full rounded-xl h-11 mt-2 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCard;
