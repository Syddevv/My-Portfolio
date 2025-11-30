import ProfilePic from "../../assets/syd.jpg";
import { MapPin, Mail, FileText } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";

const ProfileCard = () => {
  return (
    <div className="p-6 md:p-8 bg-card rounded-2xl border border-border shadow-bento">
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Profile Pic */}
        <div className="relative">
          <img
            src={ProfilePic}
            alt="profile.jpg"
            className="w-35 h-35 rounded-2xl object-cover"
          />
        </div>

        {/* Details */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">Sydney Santos</h1>
          <p className="text-lg text-muted-foreground font-medium">
            Full Stack Web Developer
          </p>
          <div className="flex items-center justify-center gap-1 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Bulacan, Philippines</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full grid grid-cols-1 gap-3 pt-4">
          <Button className="w-full rounded-xl shadow-md" size="lg">
            <Mail className="w-4 h-4 mr-2" />
            Send Email
          </Button>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              className="bg-surface border border-border 
             font-medium rounded-sm flex items-center justify-center p-3 gap-3 shadow-md"
            >
              <FileText className="w-5 h-5"></FileText>
              Resume
            </button>
            <button className="bg-surface border font-medium border-border rounded-sm flex items-center justify-center p-3 gap-3 shadow-md">
              <FaGithub size={20} />
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
