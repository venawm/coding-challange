const Tabs: React.FC<{
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: string[];
}> = ({ activeTab, onTabChange, tabs }) => (
  <div className="flex gap-1 border-b-2 border-base-300 mb-6">
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => onTabChange(tab)}
        className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 -mb-0.5 ${
          activeTab === tab
            ? "border-info text-info"
            : "border-transparent text-neutral hover:text-base-content"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default Tabs;
