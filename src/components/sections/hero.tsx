import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/60 via-forest/50 to-forest-dark/80 z-10" />
      
      {/* Cover image background */}
      <Image
        src="/cover.png"
        alt="נוף ירוק - רקע"
        fill
        priority
        className="object-cover"
      />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-cream font-heading mb-6 leading-tight">
          נוף שמספר סיפור
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-sand mb-8 max-w-3xl mx-auto leading-relaxed">
          אדריכלות נוף מקצועית, עיצוב גינות פרטיות וגגות ירוקים
          <br />
          שיוצרים חוויה ייחודית ומתמשכת
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="#contact"
            className="rounded-full bg-leaf px-8 py-4 text-lg font-semibold text-forest-dark hover:bg-leaf-light transition-all shadow-lg hover:shadow-xl hover:scale-105 inline-block"
          >
            בואו נתכנן ביחד
          </Link>
          <Link
            href="/projects"
            className="rounded-full border-2 border-cream px-8 py-4 text-lg font-semibold text-cream hover:bg-cream hover:text-forest transition-all inline-block"
          >
            צפו בפרויקטים
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown className="h-8 w-8 text-cream" />
      </div>
    </section>
  );
}
