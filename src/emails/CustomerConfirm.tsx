import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Tailwind,
} from "@react-email/components";

interface CustomerConfirmProps {
  name: string;
  projectType: string;
  phone: string;
  message: string;
}

export default function CustomerConfirm({
  name,
  projectType,
  phone,
  message,
}: CustomerConfirmProps) {
  return (
    <Html dir="rtl" lang="he">
      <Tailwind>
        <Head />
        <Body className="bg-[#f5f0e8] font-sans">
          <Container className="mx-auto my-8 max-w-[600px] rounded-lg bg-white px-8 py-10 shadow-md">
            {/* Header with botanical accent */}
            <Section className="mb-6 text-center">
              <div className="mb-4 inline-block rounded-full bg-[#2d6a4f] px-6 py-2">
                <Text className="m-0 text-xl font-bold text-[#f5f0e8]">
                  הנוטעים
                </Text>
              </div>
            </Section>

            {/* Greeting */}
            <Section className="mb-6">
              <Text className="mb-4 text-2xl font-bold text-[#1b4332]">
                שלום {name},
              </Text>
              <Text className="mb-4 text-base leading-relaxed text-[#52796f]">
                תודה שפנית אלינו! קיבלנו את בקשתך לפרויקט{" "}
                <span className="font-semibold text-[#1b4332]">
                  {projectType}
                </span>{" "}
                ונחזור אליך תוך 24 שעות.
              </Text>
              <Text className="mb-4 text-base leading-relaxed text-[#52796f]">
                אנחנו מתרגשים להיות חלק מהמסע שלך ליצירת מרחב ירוק ומיוחד. הצוות
                שלנו כבר עובד על הפרטים ומתכונן ליצור איתך קשר בהקדם.
              </Text>
            </Section>

            {/* Divider */}
            <Hr className="my-6 border-t-2 border-[#2d6a4f]/20" />

            {/* Request Summary */}
            <Section className="mb-6">
              <Text className="mb-3 text-lg font-semibold text-[#1b4332]">
                פרטי הפנייה שלך:
              </Text>
              <div className="rounded-lg bg-[#f5f0e8] px-6 py-4">
                <div className="mb-3">
                  <Text className="m-0 mb-1 text-sm font-semibold text-[#2d6a4f]">
                    שם:
                  </Text>
                  <Text className="m-0 text-base text-[#52796f]">{name}</Text>
                </div>
                <div className="mb-3">
                  <Text className="m-0 mb-1 text-sm font-semibold text-[#2d6a4f]">
                    טלפון:
                  </Text>
                  <Text className="m-0 text-base text-[#52796f]">{phone}</Text>
                </div>
                <div className="mb-3">
                  <Text className="m-0 mb-1 text-sm font-semibold text-[#2d6a4f]">
                    סוג פרויקט:
                  </Text>
                  <Text className="m-0 text-base text-[#52796f]">
                    {projectType}
                  </Text>
                </div>
                <div>
                  <Text className="m-0 mb-1 text-sm font-semibold text-[#2d6a4f]">
                    ההודעה שלך:
                  </Text>
                  <Text className="m-0 whitespace-pre-wrap text-sm leading-relaxed text-[#52796f]">
                    {message}
                  </Text>
                </div>
              </div>
            </Section>

            {/* Divider */}
            <Hr className="my-6 border-t-2 border-[#2d6a4f]/20" />

            {/* Signature */}
            <Section className="mb-6">
              <Text className="mb-2 text-base font-semibold text-[#1b4332]">
                בברכה,
              </Text>
              <div className="rounded-lg bg-[#f5f0e8] px-6 py-4">
                <Text className="m-0 mb-1 text-lg font-bold text-[#2d6a4f]">
                  ירין
                </Text>
                <Text className="m-0 text-sm text-[#52796f]">Green Space</Text>
                <Text className="m-0 mt-3 text-xs italic text-[#74c69d]">
                  &ldquo;צומח, נושם, חי - יחד ניצור את הגן שלך&rdquo;
                </Text>
              </div>
            </Section>

            {/* Footer */}
            <Section className="mt-8 border-t border-[#2d6a4f]/10 pt-6 text-center">
              <Text className="m-0 text-xs text-[#95a79f]">
                אימייל זה נשלח אוטומטית ממערכת הנוטעים
              </Text>
              <Text className="m-0 mt-2 text-xs text-[#95a79f]">
                greenspacetlv@gmail.com | green-space.net
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
