import { Shield, Lock, Eye, Database, User } from "lucide-react";

const securityItems = [
  {
    icon: Lock,
    title: "Role-Based Access",
    description: "Granular permissions ensure the right people see the right data.",
  },
  {
    icon: Shield,
    title: "Secure Hosting",
    description: "Enterprise-grade infrastructure with encryption at rest and in transit.",
  },
  {
    icon: Eye,
    title: "Audit Logs",
    description: "Complete visibility into every action your AI assistant takes.",
  },
  {
    icon: Database,
    title: "No Data Resale",
    description: "Your data is never sold, shared, or used for training models.",
  },
  {
    icon: User,
    title: "You Own Your Workflows",
    description: "Full ownership of all automations, configurations, and data.",
  },
] as const;

function SecuritySection() {
  return (
    <section
      id="security"
      className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col items-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-0"
    >
      <div className="w-full max-w-[800px]">
        <div className="bg-white rounded-2xl border border-[rgba(55,50,47,0.08)] p-8 sm:p-10 lg:p-12">
          <h2 className="text-center text-[#49423D] text-2xl sm:text-3xl font-semibold font-sans mb-2">
            Built Securely
          </h2>
          <p className="text-center text-[#605A57] text-sm font-sans mb-8">
            Your data and workflows are protected at every level.
          </p>

          <div className="space-y-4">
            {securityItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#F0EDEB] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#37322F]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#37322F] font-semibold font-sans">
                      {item.title}
                    </div>
                    <div className="text-sm text-[#605A57] font-sans mt-0.5">
                      {item.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export { SecuritySection };
