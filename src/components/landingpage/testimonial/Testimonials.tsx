import { MotionCarousel } from "../testimonial/animate-ui/components/community/motion-carousel";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "AI Treasurer makes recording daily business transactions incredibly simple. I no longer have to spend hours organizing my accounts.",
    name: "Rajesh Kumar",
    role: "Small Business Owner",
  },
  {
    quote:
      "I can simply describe a transaction and let the AI handle the bookkeeping. It saves me a lot of time every week.",
    name: "Anil Menon",
    role: "Business Owner",
  },
  {
    quote:
      "The reports and insights help me understand where my money is going without needing accounting expertise.",
    name: "Priya Nair",
    role: "Entrepreneur",
  },
  {
    quote:
      "AI Treasurer gives me a much clearer picture of my business finances without complicated accounting software.",
    name: "Suresh Menon",
    role: "Entrepreneur",
  },
  {
    quote:
      "Recording transactions naturally and getting useful financial insights has made managing my business much easier.",
    name: "Meera Nair",
    role: "Business Owner",
  },
];

const Testimonials = () => {
  return (
    <section className="w-full px-3 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold text-gray-500 sm:text-base">
            TESTIMONIALS
          </p>

          <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
            What business owners say
          </h2>

          <p className="mt-5 text-sm leading-6 text-gray-600 sm:text-base">
            See how AI Treasurer helps businesses simplify their everyday
            bookkeeping.
          </p>
        </div>

        {/* Motion Carousel */}
        <div className="mx-auto mt-12 max-w-5xl">
          <MotionCarousel
            slides={testimonials.map((testimonial) => (
              <div className="h-full rounded-2xl border border-gray-300 bg-[#f5ffc2] p-6 sm:p-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#292727] text-white text-gray-900">
                  <Quote size={19} />
                </div>

                <p className="mt-6 text-sm leading-7 text-gray-700 sm:text-base">
                  "{testimonial.quote}"
                </p>

                <div className="mt-7 border-t border-gray-300 pt-5">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>

                  <p className="mt-1 text-sm text-gray-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
            options={{
              loop: true,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
