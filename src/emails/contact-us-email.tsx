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

interface ContactUsEmailProps {
	firstName: string;
	message: string;
	replyToEmail: string;
}

export default function ContactUsEmail({
	firstName,
	message,
	replyToEmail,
}: ContactUsEmailProps) {
	return (
		<Html>
			<Head />
			<Preview>Thank you for contacting your app name</Preview>
			<Tailwind>
				<Body className="bg-white font-sans">
					<Container className="items-center rounded-lg border border-gray-300 p-4 shadow-lg">
						<Img
							src="https://res.cloudinary.com/diqgie9yt/image/upload/v1716035067/konjo-habesha/logo_ktkdhl.png"
							width="50"
							height="50"
							alt="your app name Logo"
							className="mx-auto flex items-center justify-center"
						/>
						<Text className="text-lg">Dear {firstName},</Text>
						<Text className="text-normal">
							Thank you for reaching out to us at your app name. We have
							received your message and one of our team members will get back to
							you as soon as possible. Below is a copy of your message for your
							reference:
						</Text>
						<Section className="my-4 rounded-lg bg-gray-100 p-4">
							<Text className="text-normal italic">{message}</Text>
						</Section>
						<Text className="text-normal">
							If you have any additional information to provide or if you need
							further assistance, please feel free to reply to this email or
							contact us directly at{" "}
							<a href={`mailto:${replyToEmail}`}>{replyToEmail}</a>.
						</Text>
						<Text className="text-lg">
							Best regards,
							<br />
							The your app name Team
						</Text>
						<Hr className="border-2" />
						<Text className="text-normal bg-background/20">your location</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
