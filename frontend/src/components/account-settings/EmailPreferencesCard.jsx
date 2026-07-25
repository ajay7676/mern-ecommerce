import EmailPreferenceItem from "./EmailPreferenceItem";

const EmailPreferencesCard = ({
  preferences,
  onChange,
}) => {
  return (
    <section
      className="
        rounded-xl border border-slate-200
        bg-white p-5
        shadow-[0_4px_18px_rgba(15,23,42,0.035)]
        sm:p-6
      "
    >
      <h2 className="text-base font-semibold text-slate-950">
        Email Preferences
      </h2>

      <p className="mt-1 text-xs text-slate-500">
        Choose what types of emails you want to receive from us.
      </p>

      <div className="mt-4">
        {preferences.map((preference) => (
          <EmailPreferenceItem
            key={preference.id}
            {...preference}
            checked={preference.enabled}
            onChange={(checked) =>
              onChange(preference.id, checked)
            }
          />
        ))}
      </div>
    </section>
  );
};

export default EmailPreferencesCard;