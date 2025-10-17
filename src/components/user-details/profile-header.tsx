import { Bookmark, Map } from "lucide-react";
import type { User } from "../../types";
import StarRating from "../ui/star-rating";
import Button from "../ui/button";

const ProfileHeader: React.FC<{
  user: User;
  rating: number;
}> = ({ user, rating }) => (
  <div className="flex flex-wrap justify-between items-start mb-6 pb-6 border-b border-base-300">
    <div className="flex-grow">
      <h1 className="text-4xl font-bold text-base-content mb-2">
        {`${user.firstName} ${user.lastName}`}
      </h1>
      <p className="text-neutral flex items-center gap-2 mb-3">
        <Map className="w-4 h-4" />
        {user.address.city}, {user.address.state}
      </p>
      <div className="flex items-center gap-3">
        <span className="font-bold text-2xl text-base-content">
          {rating.toFixed(1)}
        </span>
        <StarRating rating={rating} />
        <span className="text-sm text--neutral ml-2">Professional Rating</span>
      </div>
    </div>
    <Button variant="ghost" size="md" icon={<Bookmark className="w-4 h-4" />}>
      Bookmark
    </Button>
  </div>
);

export default ProfileHeader;
