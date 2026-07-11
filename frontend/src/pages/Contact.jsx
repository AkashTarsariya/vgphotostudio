import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import SEO from "../components/ui/SEO";
import { FadeIn } from "../components/ui/Animations";
import api from "../services/api";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post("/contact", data);
      toast.success("Message sent! We'll get back to you soon.");
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message");
    }
  };

  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with VG PHOTOSTUDIO. Visit our Surat studio or send us a message."
      />

      <section className="pt-32 section-padding">
        <div className="container-custom">
          <FadeIn className="text-center mb-16">
            <span className="text-sm tracking-[0.3em] uppercase text-brand-500 mb-4 block">
              Get in Touch
            </span>
            <h1 className="heading-display mb-4">Contact Us</h1>
            <p className="text-muted max-w-2xl mx-auto">
              Have a question or ready to discuss your project? We'd love to
              hear from you.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-16">
            <FadeIn>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <input
                      className="input-field"
                      {...register("name", { required: "Required" })}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      className="input-field"
                      {...register("email", { required: "Required" })}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone
                  </label>
                  <input className="input-field" {...register("phone")} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    className="input-field"
                    {...register("subject", { required: "Required" })}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    className="input-field resize-none"
                    {...register("message", {
                      required: "Required",
                      minLength: { value: 10, message: "Min 10 characters" },
                    })}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </FadeIn>

            <FadeIn delay={2}>
              <div className="space-y-8">
                {[
                  {
                    icon: MapPin,
                    title: "Studio Address",
                    content:
                      "123 VGPHOTOSTUDIO, Shivalik, Nr. Bhumipark Soc, Dabholi Rd, \nDabholi, Surat, Gujarat - 395004",
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    content: "Vivek Ghoghari  \n+91 81404 42508",
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    content: "hello@vgphotostudio.com",
                  },
                  {
                    icon: Clock,
                    title: "Business Hours",
                    content:
                      "Monday – Saturday: 10:00 AM – 7:00 PM\nSunday: By appointment only",
                  },
                ].map(({ icon: Icon, title, content }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-12 h-12 flex items-center justify-center border border-gray-200 dark:border-gray-800 flex-shrink-0">
                      <Icon size={20} className="text-brand-500" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{title}</h3>
                      <p className="text-muted text-sm whitespace-pre-line">
                        {content}
                      </p>
                    </div>
                  </div>
                ))}

                {/* <div className="aspect-video w-full overflow-hidden">
                  <iframe
                    src={import.meta.env.VITE_GOOGLE_MAPS_EMBED}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="VG PHOTOSTUDIO Location"
                  />
                </div> */}
              </div>
            </FadeIn>
          </div>

          {/* Google Map */}
          <div className="mt-20">
            <FadeIn className="text-center mb-10">
              <span className="text-sm tracking-[0.3em] uppercase text-brand-500">
                Visit Us
              </span>

              <h2 className="heading-section mt-3">Find Our Studio</h2>

              <p className="text-muted mt-3">
                Visit our studio for consultations, bookings and photography
                sessions.
              </p>
            </FadeIn>

            <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#D4C4B0]">
              <iframe
                src={import.meta.env.VITE_GOOGLE_MAPS_EMBED}
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="VG PHOTOSTUDIO Location"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
