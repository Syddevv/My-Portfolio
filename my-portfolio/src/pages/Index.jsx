import ProfileCard from "../components/portfolio/ProfileCard";

const Index = () => {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="gird grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
        <div className="md:col-span-2 lg:col-span-1 md:row-span-2">
          <ProfileCard />
        </div>
      </div>
    </div>
  );
};

export default Index;
