import {
	Body,
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

interface AdminNotificationEmailProps {
	name: string;
	email: string;
	message: string;
	phone: string;
}

export default function AdminNotificationEmail({
	name,
	email,
	message,
	phone,
}: AdminNotificationEmailProps) {
	return (
		<Html>
			<Head />
			<Preview>New Contact Us Message</Preview>
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
						<Text className="text-lg">New Contact Us Message</Text>
						<Text className="text-normal">
							You have received a new message from the contact form on your
							website.
						</Text>
						<Section className="mt-4">
							<Text className="text-normal">
								<strong>Name:</strong> {name}
							</Text>
							<Text className="text-normal">
								<strong>Email:</strong> {email}
								<strong>Phone number:</strong> {phone}
							</Text>
							<Text className="text-normal">
								<strong>Message:</strong> {message}
							</Text>
						</Section>
						<Text className="text-normal mt-4">
							Please respond to this message as soon as possible.
						</Text>
						<Text className="mt-4 text-lg">
							Best regards,
							<br />
							Your Website Team
						</Text>
						<Hr className="mt-4 border-2" />
						<Text className="text-normal bg-background/20">Your location</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
