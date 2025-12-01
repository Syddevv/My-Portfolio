import { Briefcase, Code2 } from "lucide-react";

const StatsCard = () => {
  return (
    <div className="rounded-2xl glass-card p-6 h-full flex flex-col justify-center">
      <div className="space-y-6">
        <div className="flex items-start gap-5">
          <div className="rounded-xl bg-primary/10 p-3 ring-1 ring-primary/5">
            <Briefcase className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-3xl font-heading font-bold text-foreground">3</p>
            <p className="text-sm text-muted-foreground font-medium">
              Projects Completed
            </p>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="flex items-start gap-5">
          {/* FIXED: Changed text-secondary to text-purple-500 so it's visible */}
          <div className="rounded-xl bg-purple-500/10 p-3 ring-1 ring-purple-500/20">
            <Code2 className="w-6 h-6 text-purple-500" />
          </div>

          <div>
            <p className="text-3xl font-heading font-bold text-foreground">
              10
            </p>
            <p className="text-sm text-muted-foreground font-medium">
              Technologies Stack
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
