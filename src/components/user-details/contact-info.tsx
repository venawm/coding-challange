const ContactInfoItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  isLink?: boolean;
}> = ({ icon, label, value, isLink = false }) => (
  <div className="group">
    <p className="font-semibold text-base-content mb-1 flex items-center gap-2">
      <span className="text--info">{icon}</span>
      {label}
    </p>
    {isLink ? (
      <a
        href={label === "E-mail" ? `mailto:${value}` : `http://${value}`}
        className="text-info hover:text-info-content hover:underline transition-colors"
      >
        {value}
      </a>
    ) : (
      <p className="text-neutral">{value}</p>
    )}
  </div>
);

export default ContactInfoItem;
