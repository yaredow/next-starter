import { Metadata } from "next";

// Users can customize these metadata values
export const metadata: Metadata = {
  title: "About Us - NextSaaS",
  description: "Learn more about our company, mission and team.",
};

// Main extensible About page component
export default function AboutPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-3xl">
        {/* Section: Main About */}
        <section className="mb-16">
          <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            About Us
          </h1>

          <p className="mb-6 text-lg text-muted-foreground">
            {/* Users can replace this with their own company introduction */}
            Replace this with your company introduction. Describe who you are,
            your mission, and what makes your product or service unique.
          </p>

          <p className="text-lg text-muted-foreground">
            Founded in [YEAR], [COMPANY NAME] is dedicated to [MISSION
            STATEMENT].
          </p>
        </section>

        {/* Section: Values - Users can modify these or add more */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Our Values</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Value 1 */}
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 text-lg font-medium">Customer Focus</h3>
              <p className="text-muted-foreground">
                We build solutions with our customers needs at the center of
                everything we do.
              </p>
            </div>

            {/* Value 2 */}
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 text-lg font-medium">Innovation</h3>
              <p className="text-muted-foreground">
                We constantly explore new ideas and technologies to solve
                challenging problems.
              </p>
            </div>

            {/* Value 3 */}
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 text-lg font-medium">Transparency</h3>
              <p className="text-muted-foreground">
                We believe in open and honest communication with our customers
                and team.
              </p>
            </div>

            {/* Value 4 */}
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 text-lg font-medium">Quality</h3>
              <p className="text-muted-foreground">
                We&apos;re committed to excellence in everything we create and
                deliver.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Team - Easily extensible */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Our Team</h2>
          <p className="mb-6 text-muted-foreground">
            Replace this section with information about your team members.
          </p>

          {/* Example of how users can structure team members */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Template for team member cards that users can duplicate */}
            <div className="text-center">
              <div className="mb-4 aspect-square overflow-hidden rounded-full bg-muted">
                {/* User can add: <Image src="/team/person1.jpg" alt="Team Member Name" width={300} height={300} /> */}
              </div>
              <h3 className="text-lg font-medium">Team Member Name</h3>
              <p className="text-sm text-muted-foreground">Position</p>
            </div>
          </div>
        </section>

        {/* Section: Contact - Users can customize this with their own contact info */}
        <section>
          <h2 className="mb-6 text-2xl font-bold">Get in Touch</h2>
          <p className="text-muted-foreground">
            Have questions? Contact us at{" "}
            <a
              href="mailto:example@yourcompany.com"
              className="text-primary hover:underline"
            >
              example@yourcompany.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
