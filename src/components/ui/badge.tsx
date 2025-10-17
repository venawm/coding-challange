const Badge: React.FC<{
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "info" | "success" | "warning";
}> = ({ children, variant = "primary" }) => {
  const variants = {
    primary: "bg-primary text-primary-content",
    secondary: "bg-secondary text-secondary-content",
    info: "bg-info text-info-content",
    success: "bg-success text-success-content",
    warning: "bg-warning text-warning-content",
  };

  return (
    <span
      className={`px-2 py-1 rounded-md text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
};

export default Badge;
