"use client";

import { useActionState, useRef, useEffect } from "react";
import { processContactForm } from "@/app/actions/contact";
import type { LeadActionState } from "@/app/actions/contact";
import { Loader2, CheckCircle } from "lucide-react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

const initialState: LeadActionState = {};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(processContactForm, initialState);
  const turnstileRef = useRef<TurnstileInstance>(null);

  // Reset Turnstile on error so user can retry
  useEffect(() => {
    if (state.error) {
      turnstileRef.current?.reset();
    }
  }, [state.error]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {state.success ? (
        <div className="bg-leaf-light/20 border border-leaf rounded-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-leaf-dark mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-forest font-heading mb-2">
            תודה שפנית אלינו!
          </h3>
          <p className="text-bark">ניצור איתך קשר בהקדם האפשרי</p>
        </div>
      ) : (
        <form action={formAction} className="space-y-6">
          {state.error && !state.errors && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 text-sm">
              {state.error}
            </div>
          )}

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-bark mb-2">
              שם מלא <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              disabled={isPending}
              defaultValue={state.values?.name}
              className="w-full px-4 py-3 rounded-lg border border-stone/30 focus:border-forest focus:ring-2 focus:ring-forest/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="הכנס את שמך המלא"
            />
            {state.errors?.name && (
              <p className="mt-1 text-sm text-red-600">{state.errors.name[0]}</p>
            )}
          </div>

          {/* Project Type */}
          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-bark mb-2">
              סוג הפרויקט <span className="text-red-500">*</span>
            </label>
            <select
              id="projectType"
              name="projectType"
              required
              disabled={isPending}
              defaultValue={state.values?.projectType || ""}
              className="w-full px-4 py-3 rounded-lg border border-stone/30 focus:border-forest focus:ring-2 focus:ring-forest/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed invalid:text-stone/50"
            >
              <option value="" disabled>בחר סוג פרויקט</option>
              <option value="פרטי">פרטי</option>
              <option value="עסקי">עסקי</option>
            </select>
            {state.errors?.projectType && (
              <p className="mt-1 text-sm text-red-600">{state.errors.projectType[0]}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-bark mb-2">
              טלפון <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              disabled={isPending}
              defaultValue={state.values?.phone}
              className="w-full px-4 py-3 rounded-lg border border-stone/30 focus:border-forest focus:ring-2 focus:ring-forest/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="050-123-4567"
            />
            {state.errors?.phone && (
              <p className="mt-1 text-sm text-red-600">{state.errors.phone[0]}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-bark mb-2">
              אימייל <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              disabled={isPending}
              defaultValue={state.values?.email}
              className="w-full px-4 py-3 rounded-lg border border-stone/30 focus:border-forest focus:ring-2 focus:ring-forest/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="example@email.com"
            />
            {state.errors?.email && (
              <p className="mt-1 text-sm text-red-600">{state.errors.email[0]}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-bark mb-2">
              הודעה <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              disabled={isPending}
              defaultValue={state.values?.message}
              className="w-full px-4 py-3 rounded-lg border border-stone/30 focus:border-forest focus:ring-2 focus:ring-forest/20 transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="ספר לנו על הפרויקט שלך..."
            />
            {state.errors?.message && (
              <p className="mt-1 text-sm text-red-600">{state.errors.message[0]}</p>
            )}
          </div>

          {/* Turnstile Bot Protection (invisible) */}
          <Turnstile
            ref={turnstileRef}
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full bg-leaf px-8 py-4 text-lg font-semibold text-forest-dark hover:bg-leaf-dark hover:text-cream transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-leaf flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>שולח...</span>
              </>
            ) : (
              "שלח פנייה"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
