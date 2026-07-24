import { useState } from "react";
import SectionCard from "../ui/SectionCard";
import PreferenceItem from "./PreferenceItem";

const EmailPreferencesCard = ({ preferences }) => {
  const [settings, setSettings] = useState(() =>
    preferences.reduce((result, preference) => {
      result[preference.id] = preference.enabled;
      return result;
    }, {}),
  );

  const handleChange = (id, checked) => {
    setSettings((currentSettings) => ({
      ...currentSettings,
      [id]: checked,
    }));
  };

  return (
    <SectionCard className="px-5 py-4 sm:px-6">
      <h2 className="text-base font-semibold text-slate-950">
        Email Preferences
      </h2>

      <div className="mt-1">
        {preferences.map((preference, index) => (
          <PreferenceItem
            key={preference.id}
            title={preference.title}
            description={preference.description}
            checked={settings[preference.id]}
            showDivider={index !== preferences.length - 1}
            onChange={(checked) =>
              handleChange(preference.id, checked)
            }
          />
        ))}
      </div>
    </SectionCard>
  );
};

export default EmailPreferencesCard;