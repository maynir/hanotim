import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Link,
  Tailwind,
} from "@react-email/components";

interface AdminNotifyProps {
  name: string;
  phone: string;
  email?: string;
  message: string;
  projectType: string;
  studioUrl?: string;
}

export default function AdminNotify({
  name,
  phone,
  email,
  message,
  projectType,
  studioUrl,
}: AdminNotifyProps) {
  const timestamp = new Date().toLocaleString("he-IL", {
    dateStyle: "full",
    timeStyle: "short",
  });

  return (
    <Html dir="rtl" lang="he">
      <Tailwind>
        <Head />
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto my-8 max-w-[600px] rounded-lg bg-white px-8 py-8 shadow-lg">
            {/* High Priority Header */}
            <Section className="mb-6 rounded-md bg-[#1b4332] px-4 py-3 text-center">
              <Text className="m-0 text-lg font-bold tracking-wide text-white">
                🌿 ליד חדש מהאתר
              </Text>
            </Section>

            {/* Timestamp */}
            <Section className="mb-6 text-center">
              <Text className="m-0 text-sm text-gray-500">{timestamp}</Text>
            </Section>

            <Hr className="my-6 border-gray-200" />

            {/* Lead Details Grid */}
            <Section className="mb-6">
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-semibold text-gray-700">
                      שם:
                    </td>
                    <td className="py-3 text-gray-900">{name}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-semibold text-gray-700">
                      טלפון:
                    </td>
                    <td className="py-3">
                      <Link
                        href={`tel:${phone}`}
                        className="font-medium text-blue-600 underline"
                      >
                        {phone}
                      </Link>
                    </td>
                  </tr>
                  {email && (
                    <tr className="border-b border-gray-200">
                      <td className="py-3 pr-4 font-semibold text-gray-700">
                        אימייל:
                      </td>
                      <td className="py-3">
                        <Link
                          href={`mailto:${email}`}
                          className="text-blue-600 underline"
                        >
                          {email}
                        </Link>
                      </td>
                    </tr>
                  )}
                  <tr className="border-b border-gray-200">
                    <td className="py-3 pr-4 font-semibold text-gray-700">
                      סוג פרויקט:
                    </td>
                    <td className="py-3">
                      <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                        {projectType}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Section>

            {/* Message */}
            <Section className="mb-6">
              <Text className="mb-2 font-semibold text-gray-700">הודעה:</Text>
              <div className="rounded-md bg-gray-50 px-4 py-4">
                <Text className="m-0 whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
                  {message}
                </Text>
              </div>
            </Section>

            <Hr className="my-6 border-gray-200" />

            {/* Call to Action */}
            <Section className="text-center">
              <Link
                href={`tel:${phone}`}
                className="inline-block rounded-lg bg-green-600 px-8 py-4 text-center font-semibold text-white no-underline"
              >
                📞 התקשר ל{name} עכשיו
              </Link>
            </Section>

            {/* Studio Link */}
            {studioUrl && (
              <Section className="mt-6 text-center">
                <Link
                  href={studioUrl}
                  className="inline-block rounded-md bg-[#f5f0e8] px-6 py-3 text-sm font-medium text-[#1b4332] no-underline"
                >
                  📋 צפה בליד ב-Studio
                </Link>
              </Section>
            )}

            {/* Footer */}
            <Section className="mt-8 border-t border-gray-200 pt-6 text-center">
              <Text className="m-0 text-xs text-gray-500">
                נשלח מטופס יצירת קשר באתר הנוטעים
              </Text>
              <Text className="m-0 mt-2 text-xs text-gray-400">
                אימייל זה נשלח אל greenspacetlv@gmail.com
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
