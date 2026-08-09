import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is AI Treasurer?",
    answer:
      "AI Treasurer is an AI-powered bookkeeping platform that helps you record transactions, manage your finances, and understand your business performance.",
  },
  {
    question: "How does AI-powered bookkeeping work?",
    answer:
      'Simply describe a transaction in natural language, such as "Paid shop rent ₹15,000". AI Treasurer understands the transaction, categorizes it, and records it in your business accounts.',
  },
  {
    question: "Do I need accounting knowledge to use AI Treasurer?",
    answer:
      "No. AI Treasurer is designed to make bookkeeping simple for business owners. You can record and understand your finances without needing advanced accounting knowledge.",
  },
  {
    question: "Can I track income and expenses?",
    answer:
      "Yes. You can record income and expenses, organize transactions, and monitor your business cash flow from one place.",
  },
  {
    question: "Can I manage customers and suppliers?",
    answer:
      "Yes. AI Treasurer allows you to manage customer and supplier information along with related transactions and outstanding balances.",
  },
  {
    question: "Can I generate financial reports?",
    answer:
      "Yes. You can view useful reports and insights about your income, expenses, profit, cash flow, and outstanding balances.",
  },
  {
    question: "Is my financial data secure?",
    answer:
      "AI Treasurer is designed with security in mind. Your business data is stored securely and access is protected through authentication.",
  },
  {
    question: "Can I use AI Treasurer on mobile devices?",
    answer:
      "Yes. The interface is responsive and designed to work across desktop, tablet, and mobile devices.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="w-full px-3 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold text-gray-500 sm:text-base">
            FAQ
          </p>

          <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            Frequently asked questions
          </h2>

          <p className="mt-5 text-sm leading-6 text-gray-600 sm:text-base">
            Everything you need to know about AI Treasurer and how it helps
            simplify your bookkeeping.
          </p>
        </div>

        {/* Accordion */}
        <div className="mx-auto mt-12 max-w-4xl space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? "border-gray-900 bg-[#f5ffc2]"
                    : "border-gray-300 bg-white"
                }`}
              >
                {/* Question */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                >
                  <span className="text-sm font-semibold text-gray-900 sm:text-base">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-gray-900 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-7 text-gray-600 sm:px-6">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
