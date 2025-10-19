/** @type {import('next').NextConfig} */

import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
	images: {
		remotePatterns: [
			{ hostname: "lh3.googleusercontent.com" },
			{ hostname: "platform-lookaside.fbsbx.com" },
		],
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
