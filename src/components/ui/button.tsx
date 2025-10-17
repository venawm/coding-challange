const Button: React.FC<{
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "error";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  icon?: React.ReactNode;
}> = ({ children, variant = "primary", size = "md", onClick, icon }) => {
  const baseStyles =
    "inline-flex items-center gap-2 font-medium transition-all duration-200 rounded-md";

  const variants = {
    primary:
      "bg-primary text-primary-content hover:opacity-90 shadow-sm hover:shadow-md",
    secondary:
      "bg-secondary text-secondary-content hover:opacity-90 shadow-sm hover:shadow-md",
    ghost:
      "bg-base-100 border border-base-300 text-base-content hover:bg-base-200",
    error:
      "bg-error text-error-content hover:opacity-90 shadow-sm hover:shadow-md",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
