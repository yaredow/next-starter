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

interface TwoFactorEmailProps {
	name: string;
	verificationCode: string;
	companyName?: string;
	expiryTime?: string;
	logoUrl?: string;
	supportEmail?: string;
}

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
							src={logoUrl}
							width="50"
							height="50"
							alt={`${companyName} Logo`}
							className="mx-auto mb-6"
						/>

						<Text className="text-center text-xl font-bold text-gray-800">
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
								<Text className="font-mono text-3xl font-bold tracking-widest text-gray-800">
									{verificationCode}
								</Text>
							</Container>
						</Section>

						<Text className="text-sm text-gray-600">
							If you didn&apos;t request this code, you can safely ignore this
							email. Someone may have typed your email address by mistake.
						</Text>

						<Hr className="my-6 border border-gray-200" />

						<Text className="text-base text-gray-700">
							Need help? Contact our support team at{" "}
							<a
								href={`mailto:${supportEmail}`}
								className="text-blue-600 underline"
							>
								{supportEmail}
							</a>
						</Text>

						<Text className="mt-6 text-center text-sm text-gray-500">
							© {new Date().getFullYear()} {companyName}. All rights reserved.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
