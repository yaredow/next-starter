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
import * as React from "react";

interface VerificationEmailProps {
	firstName: string;
	verificationUrl: string;
}

export default function VerificationEmail({
	firstName,
	verificationUrl,
}: VerificationEmailProps) {
	return (
		<Html>
			<Head />
			<Preview>Verify your email for your app name</Preview>
			<Tailwind>
				<Body className="bg-white font-sans">
					<Container className="items-center rounded-lg border border-gray-300 p-4 shadow-lg">
						<Img
							src="https://res.cloudinary.com/diqgie9yt/image/upload/v1716035067/konjo-habesha/logo_ktkdhl.png"
							width="50"
							height="50"
							alt="Konjo Habesha Fashion Logo"
							className="mx-auto flex items-center justify-center"
						/>
						<Text className="text-lg">Dear {firstName},</Text>
						<Text className="text-normal">
							Thank you for signing up with your app name! To complete your
							registration, please verify your email address by clicking the
							button below. This helps us ensure the security of your account.
						</Text>
						<Section className="text-center">
							<Button
								className="rounded-md bg-blue-500 px-4 py-[10px] text-white"
								href={verificationUrl}
							>
								Verify Email
							</Button>
						</Section>
						<Text className="text-normal">
							If you did not sign up for an account, you can ignore this email.
						</Text>
						<Text className="text-lg">
							Best regards,
							<br />
							The your app name Team
						</Text>
						<Hr className="border-2" />
						<Text className="text-normal bg-background/20">
							Addis Ababa, Shiromeda
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
