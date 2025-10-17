import { Loader2 } from "lucide-react";

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="text-center">
      <span className="loading loading-lg loading-spinner text-primary"></span>
      <p className="text-gray-500 font-medium">Loading...</p>
    </div>
  </div>
);

export default LoadingSpinner;
