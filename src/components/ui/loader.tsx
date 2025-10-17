const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-500 font-medium">Loading profile...</p>
    </div>
  </div>
);

export default LoadingSpinner;
