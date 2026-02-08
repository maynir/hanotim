import { ContactForm } from "@/components/ui/contact-form";
import { Phone, Mail, MapPin } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-sand">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-forest font-heading mb-4">
            בואו נתכנן ביחד
          </h2>
          <p className="text-lg text-stone max-w-2xl mx-auto">
            מוזמנים ליצור קשר ולהתחיל את המסע לגן החלומות שלכם
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-cream rounded-lg p-8 shadow-md">
              <h3 className="text-2xl font-bold text-forest font-heading mb-6">
                דרכי התקשרות
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-leaf/20 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-forest" />
                  </div>
                  <div>
                    <p className="font-medium text-bark">טלפון</p>
                    <p className="text-stone">
                      {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "052-XXX-XXXX"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-leaf/20 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-forest" />
                  </div>
                  <div>
                    <p className="font-medium text-bark">אימייל</p>
                    <p className="text-stone">info@hanotim.co.il</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-leaf/20 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-forest" />
                  </div>
                  <div>
                    <p className="font-medium text-bark">שירות</p>
                    <p className="text-stone">באזור המרכז והסביבה</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-forest text-cream rounded-lg p-8">
              <h4 className="text-xl font-bold font-heading mb-3">
                למה לבחור בנו?
              </h4>
              <ul className="space-y-2 text-sand">
                <li className="flex items-start gap-2">
                  <span className="text-leaf">✓</span>
                  <span>ניסיון רב שנים באדריכלות נוף</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-leaf">✓</span>
                  <span>עיצוב מותאם אישית לכל לקוח</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-leaf">✓</span>
                  <span>ליווי מקצועי לאורך כל הדרך</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-leaf">✓</span>
                  <span>שימוש בצמחיה מקומית ובת קיימא</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
