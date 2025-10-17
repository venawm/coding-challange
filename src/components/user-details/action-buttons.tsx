import { AlertTriangle, Check, Send } from "lucide-react";

const ActionButtons: React.FC = () => (
  <div className="flex flex-wrap gap-3 pb-6 mb-6 border-b border-base-300">
    <button className="btn btn-primary flex items-center gap-2">
      <Send className="w-4 h-4" />
      Send Message
    </button>

    <button className="btn btn-secondary flex items-center gap-2">
      <Check className="w-4 h-4" />
      Add to Contacts
    </button>

    <button className="btn btn-ghost flex items-center gap-2">
      <AlertTriangle className="w-4 h-4" />
      Report User
    </button>
  </div>
);

export default ActionButtons;
