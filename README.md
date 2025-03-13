# nextjs-starter-template

A robust and flexible Next.js starter template with TypeScript, tRPC, Jest, Cypress, Better-auth.js, Drizzle ORM, and more. This template provides everything you need to kickstart your modern web development projects with best practices and industry-standard tools.

## Features

This template is built using the following technologies:

- **Core Technologies:**

  - **Next.js**: Powerful React framework with server-side rendering and more.
  - **TypeScript**: Strongly-typed language for enhanced code quality and maintainability.

- **UI & Styling:**

  - **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
  - **Shadcn UI**: Beautifully designed and accessible UI components.

- **Backend & Data:**

  - **tRPC**: End-to-end typesafe APIs made easy with React and TypeScript.
  - **Drizzle**: TypeScript ORM that's lightweight, performant, and type-safe.
  - **Stripe**: Powerful and flexible tools for internet commerce and online payments.

- **Authentication & Security:**

  - **Better-auth**: Modern authentication solution for Next.js applications with enhanced security.

- **Testing:**

  - **Jest**: Comprehensive unit and integration testing setup.
  - **Cypress**: End-to-end testing for simulating real user interactions.

- **Other Features:**
  - **ESLint and Prettier**: Ensuring code quality and consistency.
  - **Husky and Lint-Staged**: Pre-commit hooks to automate tests and linting.
  - **dotenv**: Easy management of environment variables.
  - **next-seo** and **next-sitemap**: SEO and sitemap management for better search engine visibility.

## Getting Started

### Obtaining API Keys

- **Auth Google keys**: [Generate your Google auth API key here](console.cloud.google.com).
- **Auth Facebook keys**: [Get your Facebook auth API key here](developers.facebook.com).
- **Stripe**: Follow [this guide](https://stripe.com/docs/keys) to obtain your Stripe API keys and configure your Stripe account.
- **Better-auth**: Follow [this guide](https://better-auth.com/docs/get-started) to set up Better-auth and obtain your necessary credentials.
- **Resend key**: [Get your Stripe Resend key here](resend.com).
- **Upstash Redis (for rate limiting)**: Follow [this guide](https://upstash.com/docs/getting-started) to create an Upstash Redis database and obtain your connection details.

Clone the repository and start building your application with confidence!

git clone https://github.com/yaredow/next-starter.git
cd next-starter
npm install

```

```

## Usage

1. Clone the repository:

   ```
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file by copying the `.env.example` file:

   ```
   cp .env.example .env
   ```

4. Create a `.env.local` file by copying the `.env.local.example` file:

   ```
   cp .env.local.example .env.local
   ```

5. Open the `.env` and `.env.local` files and replace the placeholder values with your actual environment variable values.

6. Run the development server:

   ```
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running Tests

- **End-to-End Tests (Cypress)**:

  To run Cypress end-to-end tests, use the following command:

  ```
  npm run cypress
  ```

- **Unit Tests (Jest)**:

  To run Jest unit tests, use the following command:

  ```
  npm run test
  ```

## Running React Email in Development

To start the React Email development server, use the following command:

```
npm run email:dev
```

## Pre-commit Hook

This project uses [Husky](https://github.com/typicode/husky) to manage Git hooks. When you commit a change, Husky runs the following commands automatically:

```
npm run format:fix && npm run lint && npm test
```

- `npm run format:fix`: This command formats your code using a formatter (e.g., Prettier).
- `npm run lint`: This command runs the linter to check for code quality issues.
- `npm test`: This command runs the test suite to ensure that your changes do not break existing functionality.

These commands help maintain code quality and consistency across the project.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

```

```
