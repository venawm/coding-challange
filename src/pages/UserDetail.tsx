import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  User,
  Briefcase,
  ArrowLeft,
} from "lucide-react";
import LoadingSpinner from "../components/ui/loader";
import ErrorDisplay from "../components/ui/error-display";
import Card from "../components/ui/card";
import SectionHeader from "../components/user-details/section-header";
import WorkCard from "../components/user-details/work-card";
import SkillsSection from "../components/user-details/skills-section";
import ProfileHeader from "../components/user-details/profile-header";
import ActionButtons from "../components/user-details/action-buttons";
import Tabs from "../components/ui/tabs";
import ContactInfoItem from "../components/user-details/contact-info";
import type { User as UserData } from "../types";
import { Link, useParams } from "react-router-dom";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("About");
  const { userId } = useParams<{ userId: string }>();

  const mockRating = 8.6;
  const mockSkills = [
    "Branding",
    "UI/UX",
    "Web Design",
    "Packaging",
    "Print & Editorial",
  ];
  const tabs = ["Timeline", "About"];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/users/${userId}`);
        if (!response.ok) throw new Error("User not found");
        const data = await response.json();
        setUser(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <LoadingSpinner />;
  if (error || !user)
    return <ErrorDisplay message={error || "User not found"} />;

  return (
    <>
      <Link
        to="/dashboard/users"
        className="inline-flex items-center gap-2 text-sm  mb-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Users
      </Link>

      <div className="min-h-screen bg-base-200 ">
        <div className="max-w-7xl mx-auto">
          <Card className="overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Sidebar */}
              <aside className="lg:w-80 bg-base-200 p-8 border-r border-base-300">
                <div className="flex flex-col items-center lg:items-start">
                  <div className="relative group mb-6">
                    <img
                      src={user.image}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-48 h-48 object-cover rounded-box shadow-lg ring-4 ring-base-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-box opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  </div>

                  <div className="w-full">
                    <SectionHeader
                      icon={<Briefcase className="w-4 h-4" />}
                      title="Work Experience"
                    />
                    <div className="space-y-3">
                      <WorkCard
                        name={user.company.name}
                        location={user.company.address.city}
                        isPrimary
                      />
                      <WorkCard
                        name="Metropolitan Museum"
                        location="New York"
                      />
                    </div>
                  </div>

                  <SkillsSection skills={mockSkills} />
                </div>
              </aside>

              {/* Main Content */}
              <main className="flex-1 p-8 lg:p-12">
                <ProfileHeader user={user} rating={mockRating} />
                <ActionButtons />
                <Tabs
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  tabs={tabs}
                />

                {activeTab === "About" && (
                  <div className="space-y-8">
                    <section>
                      <SectionHeader
                        icon={<Mail className="w-4 h-4" />}
                        title="Contact Information"
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ContactInfoItem
                          icon={<Phone className="w-4 h-4" />}
                          label="Phone"
                          value={user.phone}
                        />
                        <ContactInfoItem
                          icon={<MapPin className="w-4 h-4" />}
                          label="Address"
                          value={`${user.address.address}, ${user.address.city}, ${user.address.state} ${user.address.postalCode}`}
                        />
                        <ContactInfoItem
                          icon={<Mail className="w-4 h-4" />}
                          label="E-mail"
                          value={user.email}
                          isLink
                        />
                        <ContactInfoItem
                          icon={<Globe className="w-4 h-4" />}
                          label="Website"
                          value={user.domain}
                          isLink
                        />
                      </div>
                    </section>

                    <section>
                      <SectionHeader
                        icon={<User className="w-4 h-4" />}
                        title="Basic Information"
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ContactInfoItem
                          icon={<Calendar className="w-4 h-4" />}
                          label="Birthday"
                          value={new Date(user.birthDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        />
                        <ContactInfoItem
                          icon={<User className="w-4 h-4" />}
                          label="Gender"
                          value={
                            user.gender.charAt(0).toUpperCase() +
                            user.gender.slice(1)
                          }
                        />
                      </div>
                    </section>
                  </div>
                )}

                {activeTab === "Timeline" && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-8 h-8 text-neutral" />
                    </div>
                    <p className="text-neutral text-lg">
                      Timeline feature coming soon...
                    </p>
                  </div>
                )}
              </main>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
