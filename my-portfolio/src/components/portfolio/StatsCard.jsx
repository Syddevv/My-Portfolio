import { Briefcase, Code2 } from "lucide-react";

const StatsCard = () => {
  return (
    <div className="rounded-2xl bg-card shadow-bento p-6 border border-border gradient-card">
      <div className="space-y-6">
        <div className="flex items-start gap-5">
          <div className="rounded-sm bg-primary/10 p-3">
            <Briefcase className="w-6 h-6 text-primary"></Briefcase>
          </div>
          <div>
            <p className="text-3xl font-bold">3</p>
            <p className="text-sm text-muted-foreground">Projects Completed</p>
          </div>
        </div>

        <div className="bg-border h-px"></div>

        <div className="flex items-start gap-4">
          <div className="rounded-sm bg-secondary/10 p-3">
            <Code2 className="w-6 h-6 text-secondary"></Code2>
          </div>

          <div>
            <p className="text-3xl font-bold">10</p>
            <p className="text-sm text-muted-foreground">Technologies Stack</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
