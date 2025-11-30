import ProfilePic from "../../assets/syd.jpg";
import { MapPin, Mail, FileText } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const ProfileCard = () => {
  return (
    <div className=" p-6 md:p-8 bg-surface rounded-bento border border-border shadow-lg">
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
          <p className="text-lg text-muted font-medium">
            Full Stack Web Developer
          </p>
          <div className="flex items-center justify-center gap-1">
            <MapPin className="w-4 h-4 text-muted" />
            <span className="text-sm text-muted">Bulacan, Philippines</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full grid grid-cols-1 gap-3 pt-4">
          <button className="w-full rounded-button bg-primary text-white flex items-center justify-center font-medium p-3 gap-3 cursor-pointer shadow-md">
            <Mail className="w-4 h-4"></Mail>
            Send Email
          </button>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              className="bg-surface border border-border 
             font-medium rounded-button flex items-center justify-center p-3 gap-3 shadow-md"
            >
              <FileText className="w-5 h-5"></FileText>
              Resume
            </button>
            <button className="bg-surface border font-medium border-border rounded-button flex items-center justify-center p-3 gap-3 shadow-md">
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
