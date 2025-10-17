import { AlertTriangle } from "lucide-react";
import Card from "./card";

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex justify-center items-center h-screen bg-gray-100">
    <Card variant="elevated" className="text-center p-8">
      <div className="w-16 h-16 bg-red-500 bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-8 h-8 text-red-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
      <p className="text-red-600">{message}</p>
    </Card>
  </div>
);

export default ErrorDisplay;
