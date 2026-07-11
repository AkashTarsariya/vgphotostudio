import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FadeIn } from "../ui/Animations";
import FAQ from "../ui/FAQ";
import api from "../../services/api";

const homeFaqs = [
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking 3-6 months in advance for weddings and 1-2 months for other sessions. However, we accommodate last-minute bookings based on availability.",
  },
  {
    question: "Do you travel for shoots?",
    answer:
      "Yes! We travel across India and internationally. Travel fees may apply for locations beyond 100km from Mumbai.",
  },
  {
    question: "When will I receive my photos?",
    answer:
      "Standard delivery is 4-6 weeks for weddings and 2-3 weeks for other sessions. Rush delivery options are available.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Cancellations made 30+ days before the session receive a full refund minus a 10% processing fee. Within 30 days, 50% is refundable.",
  },
];

const Newsletter = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post("/newsletter/subscribe", data);
      toast.success("Welcome to the VG PHOTOSTUDIO family!");
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || "Subscription failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-padding">
      <div className="container-custom max-w-4xl">
        {/* <FadeIn className="text-center mb-16">
          <span className="text-sm tracking-[0.3em] uppercase text-brand-500 mb-4 block">FAQ</span>
          <h2 className="heading-section mb-12">Frequently Asked Questions</h2>
          <FAQ items={homeFaqs} />
        </FadeIn> */}

        <FadeIn className="mt-0 text-center p-12 border border-gray-200 dark:border-gray-800">
          <h3 className="font-display text-2xl mb-3">Stay Inspired</h3>
          <p className="text-muted mb-6">
            Subscribe for photography tips, behind-the-scenes content, and
            exclusive offers.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="input-field flex-1"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary whitespace-nowrap"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
          )}
        </FadeIn>
      </div>
    </section>
  );
};

export default Newsletter;
