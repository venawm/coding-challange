import { Briefcase, MapPin } from "lucide-react";
import Card from "../ui/card";
import Badge from "../ui/badge";

const WorkCard: React.FC<{
  name: string;
  location: string;
  isPrimary?: boolean;
}> = ({ name, location, isPrimary = false }) => (
  <Card className="p-4 hover:shadow-md transition-shadow duration-200">
    <div className="flex justify-between items-start mb-2">
      <h4 className="font-semibold text-base-content flex items-center gap-2">
        <Briefcase className="w-4 h-4 text-neutral" />
        {name}
      </h4>
      <Badge variant={isPrimary ? "primary" : "secondary"}>
        {isPrimary ? "Primary" : "Secondary"}
      </Badge>
    </div>
    <p className="text-sm text-neutral flex items-center gap-1">
      <MapPin className="w-3 h-3" />
      {location}
    </p>
  </Card>
);

export default WorkCard;
