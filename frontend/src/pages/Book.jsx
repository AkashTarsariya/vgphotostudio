import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Calendar, Clock, CreditCard } from "lucide-react";
import SEO from "../components/ui/SEO";
import { FadeIn } from "../components/ui/Animations";
import api from "../services/api";

const eventTypes = [
  "Wedding",
  "Pre-Wedding",
  "Birthday",
  "Engagement",
  "Maternity",
  "Corporate",
  "Product",
  "Portrait",
  "Other",
];

const timeSlots = ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM", "06:00 PM"];

const Book = () => {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [availability, setAvailability] = useState(null);
  const [booking, setBooking] = useState(null);
  const [services, setServices] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      eventType: searchParams.get("type") || "",
      service: searchParams.get("service") || "",
    },
  });

  const selectedDate = watch("preferredDate");

  useEffect(() => {
    api
      .get("/services")
      .then(({ data }) => setServices(data.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (selectedDate) {
      api
        .get(`/bookings/availability?date=${selectedDate}`)
        .then(({ data }) => setAvailability(data.data))
        .catch(() => setAvailability(null));
    }
  }, [selectedDate]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const serviceObj = services.find((s) => s.slug === data.service);
      const payload = {
        ...data,
        service: serviceObj?._id,
        amount: serviceObj?.price || 0,
      };

      const { data: res } = await api.post("/bookings", payload);
      setBooking(res.data);
      setStep(2);
      toast.success("Booking request submitted!");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Booking failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!booking) return;
    setLoading(true);
    try {
      const { data } = await api.post("/payments/create-checkout", {
        bookingId: booking._id,
        amount: booking.amount || 5000,
        currency: "inr",
      });

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(
          "Payment service unavailable. Your booking is saved — we will contact you.",
        );
        setStep(3);
      }
    } catch {
      toast.error(
        "Payment unavailable. Your booking is confirmed — we will reach out for payment.",
      );
      setStep(3);
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

  return (
    <>
      <SEO
        title="Book a Session"
        description="Book your photography session with VG PHOTOSTUDIO. Easy online booking with availability checking."
      />

      <section className="pt-32 section-padding">
        <div className="container-custom max-w-3xl">
          <FadeIn className="text-center mb-12">
            <span className="text-sm tracking-[0.3em] uppercase text-brand-500 mb-4 block">
              Reserve Your Date
            </span>
            <h1 className="heading-display mb-4">Book a Session</h1>
            <p className="text-muted">
              Fill in the details below and we'll get back to you within 24
              hours.
            </p>
          </FadeIn>

          <div className="flex justify-center gap-4 mb-12">
            {["Details", "Summary", "Confirmed"].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step > i + 1
                      ? "bg-brand-500 text-white"
                      : step === i + 1
                        ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                        : "border border-gray-300 text-muted"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`text-sm hidden sm:block ${step === i + 1 ? "font-medium" : "text-muted"}`}
                >
                  {label}
                </span>
                {i < 2 && (
                  <div className="w-8 h-px bg-gray-300 dark:bg-gray-700 hidden sm:block" />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <FadeIn>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      className="input-field"
                      {...register("name", { required: "Name is required" })}
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
                      {...register("email", { required: "Email is required" })}
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
                    Phone *
                  </label>
                  <input
                    className="input-field"
                    {...register("phone", { required: "Phone is required" })}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Event Type *
                    </label>
                    <select
                      className="input-field"
                      {...register("eventType", {
                        required: "Event type is required",
                      })}
                    >
                      <option value="">Select event type</option>
                      {eventTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    {errors.eventType && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.eventType.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Package
                    </label>
                    <select className="input-field" {...register("service")}>
                      <option value="">Select package (optional)</option>
                      {services.map((s) => (
                        <option key={s._id} value={s.slug}>
                          {s.name} — ₹{s.price?.toLocaleString("en-IN")}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <Calendar size={16} /> Preferred Date *
                    </label>
                    <input
                      type="date"
                      min={minDateStr}
                      className="input-field"
                      {...register("preferredDate", {
                        required: "Date is required",
                      })}
                    />
                    {errors.preferredDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.preferredDate.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <Clock size={16} /> Preferred Time *
                    </label>
                    <select
                      className="input-field"
                      {...register("preferredTime", {
                        required: "Time is required",
                      })}
                    >
                      <option value="">Select time</option>
                      {(availability?.availableSlots || timeSlots).map(
                        (slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ),
                      )}
                    </select>
                    {availability && !availability.isAvailable && (
                      <p className="text-amber-600 text-sm mt-1">
                        Limited availability on this date
                      </p>
                    )}
                    {errors.preferredTime && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.preferredTime.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Location *
                  </label>
                  <input
                    className="input-field"
                    placeholder="Event location or studio preference"
                    {...register("location", {
                      required: "Location is required",
                    })}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Budget Range
                  </label>
                  <select className="input-field" {...register("budget")}>
                    <option value="">Select budget range</option>
                    <option value="Under ₹25,000">Under ₹25,000</option>
                    <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                    <option value="₹50,000 - ₹1,00,000">
                      ₹50,000 - ₹1,00,000
                    </option>
                    <option value="₹1,00,000+">₹1,00,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Special Requests
                  </label>
                  <textarea
                    rows={4}
                    className="input-field resize-none"
                    placeholder="Tell us about your vision, style preferences, or any special requirements..."
                    {...register("specialRequests")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full"
                >
                  {loading ? "Submitting..." : "Continue to Summary"}
                </button>
              </form>
            </FadeIn>
          )}

          {step === 2 && booking && (
            <FadeIn>
              <div className="p-8 border border-gray-200 dark:border-gray-800 mb-8">
                <h2 className="font-display text-2xl mb-6">Booking Summary</h2>
                <div className="space-y-3 text-sm">
                  {[
                    ["Confirmation Code", booking.confirmationCode],
                    ["Name", booking.name],
                    ["Email", booking.email],
                    ["Event", booking.eventType],
                    [
                      "Date",
                      new Date(booking.preferredDate).toLocaleDateString(),
                    ],
                    ["Time", booking.preferredTime],
                    ["Location", booking.location],
                    ["Status", booking.status],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800"
                    >
                      <span className="text-muted">{label}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="btn-outline flex-1"
                >
                  Edit Details
                </button>
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <CreditCard size={18} />
                  {loading ? "Processing..." : "Pay & Confirm"}
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="btn-outline flex-1"
                >
                  Skip Payment
                </button>
              </div>
            </FadeIn>
          )}

          {step === 3 && booking && (
            <FadeIn className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">✓</span>
              </div>
              <h2 className="heading-section mb-4">Booking Confirmed!</h2>
              <p className="text-muted mb-2">Your confirmation code:</p>
              <p className="font-display text-2xl text-brand-600 dark:text-brand-400 mb-6">
                {booking.confirmationCode}
              </p>
              <p className="text-muted max-w-md mx-auto">
                We've sent a confirmation email to {booking.email}. Our team
                will reach out within 24 hours to finalize details.
              </p>
            </FadeIn>
          )}
        </div>
      </section>
    </>
  );
};

export default Book;
