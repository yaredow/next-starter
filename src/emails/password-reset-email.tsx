import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type PasswordResetEmailProps = {
  firstName: string;
  resetUrl: string;
};

export default function PasswordResetEmail({
  firstName,
  resetUrl,
}: PasswordResetEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your password for your app name</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="items-center rounded-lg border border-gray-300 p-4 shadow-lg">
            <Img
              alt="Konjo Habesha Fashion Logo"
              className="mx-auto flex items-center justify-center"
              height="50"
              src="https://res.cloudinary.com/diqgie9yt/image/upload/v1716035067/konjo-habesha/logo_ktkdhl.png"
              width="50"
            />
            <Text className="text-lg">Dear {firstName},</Text>
            <Text className="text-normal">
              We received a request to reset the password for your account. To
              reset your password, click the button below. If you did not
              request a password reset, please ignore this email or contact our
              support team if you have any concerns.
            </Text>
            <Section className="text-center">
              <Button
                className="rounded-md bg-blue-500 px-4 py-[10px] text-white"
                href={resetUrl}
              >
                Reset Password
              </Button>
            </Section>
            <Text className="text-normal">
              This link will expire in 24 hours for your security. If you need
              further assistance, please do not hesitate to contact our support
              team.
            </Text>
            <Text className="text-lg">
              Best regards,
              <br />
              The Konjo Habesha Team
            </Text>
            <Hr className="border-2" />
            <Text className="bg-background/20 text-normal">your location</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
