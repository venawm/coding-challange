const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated";
}> = ({ children, className = "", variant = "default" }) => {
  const baseStyles = "bg-white rounded-md border border-gray-300";
  const variants = {
    default: "",
    elevated: "shadow-md",
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
