const SectionHeader: React.FC<{
  icon: React.ReactNode;
  title: string;
}> = ({ icon, title }) => (
  <h3 className="text-xs uppercase text-neutral font-bold mb-6 flex items-center gap-2">
    {icon}
    {title}
  </h3>
);

export default SectionHeader;
