import { useState } from "react";
import { MessageSquareText, Brain, Database, BarChart3 } from "lucide-react";
import { ChevronDown } from "lucide-react";

const translations = {
  en: {
    label: "How it works",
    title: "Your business bookkeeping, made simple.",
    description:
      "Record your business transactions naturally and let AI handle the accounting work for you.",

    steps: [
      {
        number: "01",
        icon: MessageSquareText,
        title: "Enter a transaction",
        description: 'Simply type something like "Paid shop rent ₹15,000".',
      },
      {
        number: "02",
        icon: Brain,
        title: "AI understands it",
        description:
          "AI identifies the transaction type, amount, category and other details.",
      },
      {
        number: "03",
        icon: Database,
        title: "Automatically recorded",
        description:
          "The transaction is structured and securely stored in your business records.",
      },
      {
        number: "04",
        icon: BarChart3,
        title: "Get useful insights",
        description:
          "View your income, expenses, profit, cash flow and outstanding balances.",
      },
    ],
  },

  ml: {
    label: "ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു",
    title: "നിങ്ങളുടെ ബിസിനസ് അക്കൗണ്ടിംഗ് ഇനി എളുപ്പം.",
    description:
      "നിങ്ങളുടെ ബിസിനസ് ഇടപാടുകൾ സ്വാഭാവികമായി രേഖപ്പെടുത്തൂ. ബാക്കി അക്കൗണ്ടിംഗ് ജോലികൾ AI കൈകാര്യം ചെയ്യും.",

    steps: [
      {
        number: "01",
        icon: MessageSquareText,
        title: "ഇടപാട് രേഖപ്പെടുത്തുക",
        description:
          '"കട വാടക ₹15,000 നൽകി" എന്നതുപോലെ ഒരു സന്ദേശം ടൈപ്പ് ചെയ്യുക.',
      },
      {
        number: "02",
        icon: Brain,
        title: "AI മനസ്സിലാക്കുന്നു",
        description:
          "AI ഇടപാടിന്റെ തരം, തുക, വിഭാഗം തുടങ്ങിയ വിവരങ്ങൾ തിരിച്ചറിയുന്നു.",
      },
      {
        number: "03",
        icon: Database,
        title: "സ്വയമേവ രേഖപ്പെടുത്തുന്നു",
        description:
          "ഇടപാട് ക്രമപ്പെടുത്തി നിങ്ങളുടെ ബിസിനസ് രേഖകളിൽ സുരക്ഷിതമായി സൂക്ഷിക്കുന്നു.",
      },
      {
        number: "04",
        icon: BarChart3,
        title: "പ്രധാന വിവരങ്ങൾ നേടുക",
        description:
          "വരുമാനം, ചെലവ്, ലാഭം, പണമൊഴുക്ക്, കുടിശ്ശിക എന്നിവ കാണുക.",
      },
    ],
  },

  ta: {
    label: "இது எப்படி செயல்படுகிறது",
    title: "உங்கள் வணிக கணக்குப்பதிவு இனி எளிது.",
    description:
      "உங்கள் வணிக பரிவர்த்தனைகளை இயல்பாக பதிவு செய்யுங்கள். மீதமுள்ள கணக்குப்பதிவு பணிகளை AI கவனித்துக்கொள்ளும்.",

    steps: [
      {
        number: "01",
        icon: MessageSquareText,
        title: "பரிவர்த்தனையை உள்ளிடுங்கள்",
        description:
          '"கடை வாடகை ₹15,000 செலுத்தினேன்" என்று எளிமையாக உள்ளிடுங்கள்.',
      },
      {
        number: "02",
        icon: Brain,
        title: "AI புரிந்துகொள்கிறது",
        description:
          "AI பரிவர்த்தனையின் வகை, தொகை, வகை மற்றும் பிற தகவல்களை கண்டறியும்.",
      },
      {
        number: "03",
        icon: Database,
        title: "தானாக பதிவு செய்யப்படுகிறது",
        description:
          "பரிவர்த்தனை ஒழுங்குபடுத்தப்பட்டு உங்கள் வணிக பதிவுகளில் பாதுகாப்பாக சேமிக்கப்படும்.",
      },
      {
        number: "04",
        icon: BarChart3,
        title: "முக்கிய தகவல்களைப் பெறுங்கள்",
        description:
          "வருமானம், செலவுகள், லாபம், பணப்புழக்கம் மற்றும் நிலுவைத் தொகைகளைப் பார்க்கலாம்.",
      },
    ],
  },

  hi: {
    label: "यह कैसे काम करता है",
    title: "आपकी बिज़नेस बुककीपिंग अब आसान है।",
    description:
      "अपने बिज़नेस लेन-देन को स्वाभाविक रूप से दर्ज करें और बाकी अकाउंटिंग का काम AI को करने दें।",

    steps: [
      {
        number: "01",
        icon: MessageSquareText,
        title: "लेन-देन दर्ज करें",
        description:
          '"दुकान का किराया ₹15,000 दिया" जैसे संदेश को आसानी से दर्ज करें।',
      },
      {
        number: "02",
        icon: Brain,
        title: "AI इसे समझता है",
        description:
          "AI लेन-देन का प्रकार, राशि, श्रेणी और अन्य जानकारी पहचानता है।",
      },
      {
        number: "03",
        icon: Database,
        title: "अपने आप रिकॉर्ड होता है",
        description:
          "लेन-देन को व्यवस्थित करके आपके बिज़नेस रिकॉर्ड में सुरक्षित रूप से संग्रहीत किया जाता है।",
      },
      {
        number: "04",
        icon: BarChart3,
        title: "महत्वपूर्ण जानकारी प्राप्त करें",
        description: "आय, खर्च, लाभ, कैश फ्लो और बकाया राशि देखें।",
      },
    ],
  },
};

type Language = keyof typeof translations;

const HowItWorks = () => {
  const [language, setLanguage] = useState<Language>("en");

  const content = translations[language];

  return (
    <section
      id="how-it-works"
      className="w-full px-3 pt-6 font-mono sm:pt-6 md:pt-6 lg:pt-6"
    >
      <div className="w-full rounded-xl bg-[#ECFFE8] px-6 py-12 sm:px-8 md:px-12 lg:px-16">
        {/* Language Selector */}
        <div className="mb-8 flex justify-center sm:mb-10 sm:justify-end">
          <div className="relative w-full max-w-[180px] sm:max-w-[200px]">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="w-full appearance-none rounded-xl border border-gray-300 bg-[#292727] text-white px-4 py-2.5 pr-10 text-sm outline-none sm:px-5 sm:py-3 sm:pr-12 sm:text-base"
            >
              <option value="en">English</option>
              <option value="ml">മലയാളം</option>
              <option value="ta">தமிழ்</option>
              <option value="hi">हिन्दी</option>
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-900 sm:right-4"
            />
          </div>
        </div>

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            {content.label}
          </p>

          <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            {content.title}
          </h2>

          <p className="mt-5 text-sm leading-6 text-gray-600 sm:text-base">
            {content.description}
          </p>
        </div>

        {/* Steps */}
        <div className="mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative rounded-2xl border border-gray-300 bg-[#f5ffc2] p-6 transition duration-300 hover:-translate-y-1 hover:border-gray-900"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-400">
                    {step.number}
                  </span>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#292727] text-white text-gray-900">
                    <Icon size={21} strokeWidth={2} />
                  </div>
                </div>

                <h3 className="mt-8 text-lg font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
        <div className="mx-auto mt-8 max-w-7xl">
          <div className="aspect-video w-full rounded-2xl bg-gray-200"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
