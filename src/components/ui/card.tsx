const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated";
}> = ({ children, className = "", variant = "default" }) => {
  const baseStyles = "bg-base-100 rounded-md border border-base-200 rounded-md";
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
