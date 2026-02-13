import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/60 via-forest/50 to-forest-dark/80 z-10" />
      
      {/* Placeholder background - in production this would be replaced with Sanity image */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest via-forest-light to-leaf-dark">
        {/* Pattern overlay for botanical texture */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

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
