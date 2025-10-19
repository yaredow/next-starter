import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type TwoFactorEmailProps = {
  name: string;
  verificationCode: string;
  companyName?: string;
  expiryTime?: string;
  logoUrl?: string;
  supportEmail?: string;
};

export default function TwoFactorEmail({
  name,
  verificationCode,
  companyName = "Your App Name",
  expiryTime = "10 minutes",
  logoUrl = "https://res.cloudinary.com/diqgie9yt/image/upload/v1716035067/konjo-habesha/logo_ktkdhl.png",
  supportEmail = "support@yourapp.com",
}: TwoFactorEmailProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto my-8 max-w-[600px] rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
            <Img
              alt={`${companyName} Logo`}
              className="mx-auto mb-6"
              height="50"
              src={logoUrl}
              width="50"
            />

            <Text className="text-center font-bold text-gray-800 text-xl">
              Verification Code
            </Text>

            <Text className="text-base text-gray-700">
              Hello {name.split(" ")},
            </Text>

            <Text className="text-base text-gray-700">
              Please use the following verification code to complete your
              sign-in. This code will expire in {expiryTime}.
            </Text>

            <Section className="my-8">
              <Container className="mx-auto rounded-md bg-gray-100 p-4 text-center">
                <Text className="font-bold font-mono text-3xl text-gray-800 tracking-widest">
                  {verificationCode}
                </Text>
              </Container>
            </Section>

            <Text className="text-gray-600 text-sm">
              If you didn&apos;t request this code, you can safely ignore this
              email. Someone may have typed your email address by mistake.
            </Text>

            <Hr className="my-6 border border-gray-200" />

            <Text className="text-base text-gray-700">
              Need help? Contact our support team at{" "}
              <a
                className="text-blue-600 underline"
                href={`mailto:${supportEmail}`}
              >
                {supportEmail}
              </a>
            </Text>

            <Text className="mt-6 text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} {companyName}. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
