import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest text-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold font-heading mb-4">הנוטעים</h3>
            <p className="text-sand text-sm leading-relaxed">
              אדריכלות נוף וגינון מקצועי
              <br />
              עיצוב גינות פרטיות, גגות ירוקים ותכנון נוף
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold font-heading mb-4">קישורים</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-sand hover:text-leaf transition-colors">
                  ראשי
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-sand hover:text-leaf transition-colors">
                  פרויקטים
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-sand hover:text-leaf transition-colors">
                  צור קשר
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold font-heading mb-4">יצירת קשר</h4>
            <div className="space-y-2 text-sm text-sand">
              <p>טלפון: {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "052-XXX-XXXX"}</p>
              <p>אימייל: info@hanotim.co.il</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-forest-light text-center text-sm text-sand">
          <p>© {currentYear} הנוטעים. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
}
