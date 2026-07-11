// import { MessageCircle } from "lucide-react";

// const WhatsAppButton = () => {
//   const number = import.meta.env.VITE_WHATSAPP_NUMBER || "919876543210";
//   const message = encodeURIComponent(
//     "Hi VG PHOTOSTUDIO! I would like to inquire about booking a photography session.",
//   );

//   return (
//     <a
//       href={`https://wa.me/${number}?text=${message}`}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
//       aria-label="Chat on WhatsApp"
//     >
//       <MessageCircle size={28} />
//     </a>
//   );
// };

// export default WhatsAppButton;

import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER || "919876543210";

  const message = encodeURIComponent(
    "Hi VG PHOTOSTUDIO! I would like to inquire about booking a photography session.",
  );

  return (
    <a
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-20 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={30} />
    </a>
  );
};

export default WhatsAppButton;
