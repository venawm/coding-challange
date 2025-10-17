import { Award } from "lucide-react";

const SkillsSection: React.FC<{ skills: string[] }> = ({ skills }) => (
  <div className="w-full mt-8">
    <h3 className="text-xs uppercase text-neutral font-bold mb-6 flex items-center gap-2">
      <Award className="w-4 h-4" />
      Skills & Expertise
    </h3>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="px-3 py-1.5 bg-base-200 text-base-content rounded-field text-sm font-medium border border-base-300 hover:bg-base-300 transition-colors duration-200"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

export default SkillsSection;
