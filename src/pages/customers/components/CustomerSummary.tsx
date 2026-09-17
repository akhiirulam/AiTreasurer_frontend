import { UserCheck, UserRound, Users } from "lucide-react";

interface CustomerSummaryProps {
  totalCustomers: number;

  activeCustomers: number;

  inactiveCustomers: number;
}

const CustomerSummary = ({
  totalCustomers,
  activeCustomers,
  inactiveCustomers,
}: CustomerSummaryProps) => {
  const cards = [
    {
      label: "Total Customers",
      value: totalCustomers,
      icon: Users,
    },
    {
      label: "Active Customers",
      value: activeCustomers,
      icon: UserCheck,
    },
    {
      label: "Inactive Customers",
      value: inactiveCustomers,
      icon: UserRound,
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="rounded-2xl border border-[#dce5da] bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#68736c]">
                  {card.label}
                </p>

                <p className="mt-2 font-financial text-2xl font-black text-[#173f35]">
                  {card.value}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e4f2de] text-[#173f35]">
                <Icon size={20} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CustomerSummary;
