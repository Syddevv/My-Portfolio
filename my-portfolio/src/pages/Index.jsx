import ProfileCard from "../components/portfolio/ProfileCard";
import StatsCard from "../components/portfolio/StatsCard";
import AboutMe from "../components/portfolio/AboutMe";
import TechStack from "../components/portfolio/TechStack";

const Index = () => {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-10 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
        <div className="md:col-span-2 lg:col-span-1 md:row-span-2">
          <ProfileCard />
        </div>

        <div className="md:col-span-1 lg:col-span-1">
          <StatsCard />
        </div>

        <div className="md:col-span-1 lg:col-span-1">
          <AboutMe />
        </div>

        <div className="md:col-span-1 lg:col-span-1">
          <TechStack />
        </div>
      </div>
    </div>
  );
};

export default Index;
