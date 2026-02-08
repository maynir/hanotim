"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "972501234567";
  const message = encodeURIComponent("שלום, אני מעוניין בפרטים נוספים על שירותי אדריכלות נוף");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 start-6 z-50 group"
      aria-label="פתח WhatsApp"
    >
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-leaf animate-ping opacity-75" />
      
      {/* Button */}
      <div className="relative bg-leaf hover:bg-leaf-dark rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110">
        <MessageCircle className="h-7 w-7 text-cream" />
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full start-0 mb-2 px-3 py-2 bg-forest text-cream text-sm font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        שלח הודעה ב-WhatsApp
        <div className="absolute top-full start-6 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-forest" />
      </div>
    </a>
  );
}
