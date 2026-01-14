import {
  AccountSettingsCards,
  ChangePasswordCard,
  DeleteAccountCard,
} from "@daveyplate/better-auth-ui";

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Account Settings
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Manage your account preferences and security settings
          </p>
        </div>

        <div className="space-y-6">
          <AccountSettingsCards
            classNames={{
              card: {
                base: "bg-gray-900/50 border border-white/10 backdrop-blur-xl shadow-xl rounded-xl",
                header: "text-white font-semibold text-lg ",
                content: "text-gray-300 ",
                footer: "bg-white/5 border-none",
              },

            }}
          />

          <ChangePasswordCard
            classNames={{
              base: "bg-gray-900/50 border border-white/10 backdrop-blur-xl shadow-xl rounded-xl",
              header: "text-white font-semibold text-lg ",
              content: "text-gray-300 ",
              footer: "bg-white/5 border-none",
            }}
          />

          <DeleteAccountCard
            classNames={{
              base: "bg-gray-900/50 border border-red-500/20 backdrop-blur-xl shadow-xl rounded-xl",
              header: "text-white font-semibold text-lg",
              title: "text-white text-xl font-semibold",
              description: "text-white",
              content: "text-gray-300",
              footer: "bg-red-500/5 border-none",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
