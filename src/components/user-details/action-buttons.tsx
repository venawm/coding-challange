import { AlertTriangle, Check, Send } from "lucide-react";
import Button from "../ui/button";

const ActionButtons: React.FC = () => (
  <div className="flex flex-wrap gap-3 pb-6 mb-6 border-b border-base-300">
    <Button variant="primary" size="md" icon={<Send className="w-4 h-4" />}>
      Send Message
    </Button>
    <Button variant="secondary" size="md" icon={<Check className="w-4 h-4" />}>
      Add to Contacts
    </Button>
    <Button
      variant="ghost"
      size="md"
      icon={<AlertTriangle className="w-4 h-4" />}
    >
      Report User
    </Button>
  </div>
);

export default ActionButtons;
