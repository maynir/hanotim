import Link from "next/link";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/green.space.tlv?igsh=MWo1cWcyZGkxcWJ2NQ==",
    icon: InstagramIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/green-space-tlv/",
    icon: LinkedinIcon,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1BsVEtc6ub/?mibextid=wwXIfr",
    icon: FacebookIcon,
  },
];

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
              <p>
                טלפון:{" "}
                <a 
                  href={`tel:+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "972501234567"}`}
                  className="hover:text-leaf transition-colors underline-offset-4 hover:underline"
                  dir="ltr"
                >
                  {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER 
                    ? `0${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER.slice(3, 5)}-${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER.slice(5, 8)}-${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER.slice(8)}`
                    : "050-123-4567"
                  }
                </a>
              </p>
              <p>
                אימייל:{" "}
                <a 
                  href="mailto:greenspacetlv@gmail.com"
                  className="hover:text-leaf transition-colors underline-offset-4 hover:underline"
                  dir="ltr"
                >
                  greenspacetlv@gmail.com
                </a>
              </p>
            </div>
            <div className="flex gap-3 mt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-forest-light text-sand hover:bg-leaf hover:text-forest transition-colors"
                >
                  <social.icon className="w-4.5 h-4.5" />
                </a>
              ))}
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
